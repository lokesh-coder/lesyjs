import { LesyValidator } from "@lesy/validator";
import { Command, Validation, ResolvedCommand, State } from "./model";

class LesyCommand {
  private commands: Command[] = [];
  private aliasesDict: Object = {};
  private defaultProps: Command = {
    id: null,
    name: "",
    args: {},
    flags: {},
    aliases: [],
    main: null,
    group: "Commands",
    description: "",
    isVisible: true,
    run: () => {},
  };

  private static lastAddedID = 0;

  constructor() {
    LesyCommand.lastAddedID = 0;
  }

  addCommandFromRawObject(rawCmd: Command | Function, src: string) {
    const cmd = this.transformRawCommand(rawCmd);
    // tslint:disable-next-line: no-increment-decrement
    Object.assign(cmd, { src, id: LesyCommand.lastAddedID++ });
    this.commands.push(cmd);
    cmd.aliases.forEach((alias: any) => {
      this.aliasesDict[`${cmd.main || "root"}.${alias}`] = cmd.name;
    });
  }

  findCommand(
    args: string[] = [],
    ancestor: string = "root",
  ): ReturnType<
    () => (flags: Record<string, string | boolean>) => Partial<State>
  > {
    const parent = this.aliasesDict[`${ancestor}.${args[0]}`];
    const child = this.aliasesDict[`${parent}.${args[1]}`];
    if (!parent) {
      console.log(
        [
          "command",
          "\x1b[31m ",
          args[0] || "<empty>",
          " \x1b[0m",
          "not found!",
        ].join(""),
      );
      process.exit(1);
    }
    if (child) return this.findCommand(args.splice(1), parent);
    return this.mapFlagAliases.bind(
      this,
      this.mapValuesWithArgs(
        this.commands.find((cmd: Command) => cmd.name === parent),
        args.splice(1),
      ),
    );
  }

  private mapFlagAliases(
    resolvedCommand: Partial<State>,
    flags: Record<string, string | boolean>,
  ): Partial<State> {
    const { runningCommand } = resolvedCommand;

    const flattenFlags = Object.keys(runningCommand.flags).map((k: any) => [
      k,
      ...(runningCommand.flags[k].aliases || []),
    ]);
    const resolvedFlags = {};
    for (const key in flags) {
      flattenFlags.forEach((fflags: string[]) => {
        if (fflags.includes(key)) {
          fflags.forEach((f: string) => (resolvedFlags[f] = flags[key]));
        }
      });
    }
    return { ...resolvedCommand, flags: resolvedFlags };
  }

  getCommands(): Command[] {
    return this.commands;
  }

  getCommandById(id: number): Command {
    return this.commands.find((c: Command) => c.id === id);
  }

  getCommandByName(names: string[]): any {
    return this.findCommand(names)({}).runningCommand;
  }

  async validate(
    command: Command,
    args: object,
    validators = [],
  ): Promise<Validation> {
    const schema = new LesyValidator(command.args);
    validators.forEach(({ name, fn }) => {
      schema.register(name, fn);
    });
    const validation = await schema.validate(args);
    const isValidationPassed = validation.every((v: any) => v.passed);
    return { isPassed: isValidationPassed, errors: validation };
  }

  private mapValuesWithArgs(
    runningCommand: Command,
    rawArgs: string[],
  ): Partial<State> {
    const args = {};
    const argSchemas = Object.keys(runningCommand.args);
    argSchemas.forEach((arg, i) => {
      args[arg] = rawArgs[i];
    });
    return {
      runningCommand,
      args,
      unknownArgs: rawArgs.slice(argSchemas.length),
      flags: {},
    };
  }

  private normalizeCmdNames(cmd) {
    if (!cmd.name) cmd.name = "default";
    const names = [cmd.name, ...cmd.aliases].map((n: string) =>
      this.normalizeStr(n),
    );
    cmd.name = names[0];
    cmd.aliases = names;
    return cmd;
  }

  private transformRawCommand(cmd: Command | Function): Command {
    let cmdObj: Command;
    if (typeof cmd === "object") {
      cmdObj = { ...this.defaultProps, ...cmd };
    } else if (this.isClass(cmd)) {
      const obj = new (cmd as any)() as Command;
      Object.keys(this.defaultProps).forEach((p: any) => {
        if (!obj[p]) {
          Object.defineProperty(obj, p, {
            value: this.defaultProps[p],
            configurable: true,
            enumerable: true,
            writable: true,
          });
        }
      });
      return this.normalizeCmdNames(obj);
    } else {
      cmdObj = { ...this.defaultProps, ...cmd };
      cmd(this.normalizeCmdNames(cmdObj));
    }

    return {
      ...cmdObj,
      ...this.normalizeCmdNames(cmdObj),
    };
  }

  private isClass(funcOrClass: Function): boolean {
    return (
      typeof funcOrClass === "function" &&
      /^class\s/.test(Function.prototype.toString.call(funcOrClass))
    );
  }

  private normalizeStr(name: string): string {
    return name.replace(/[^\w]/gi, "-");
  }
}

export { LesyCommand };
