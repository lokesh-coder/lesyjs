import { Command, Validation, State } from "./model";

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

  private static lastAddedID: number;

  constructor() {
    LesyCommand.lastAddedID = 0;
  }

  add(rawCmd: Command | Function, src: string) {
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
    flags = {},
    ancestor: string = "root",
  ): Partial<State> {
    let cmd: Command;
    const parent = this.aliasesDict[`${ancestor}.${args[0]}`];
    cmd = this.commands.find((cmd: Command) => cmd.name === parent);
    if (!parent) {
      console.log(
        `command \x1b[31m ${args[0] || "<empty>"} \x1b[0m not found!`,
      );
      process.exit(1);
    }

    const child = this.aliasesDict[`${parent}.${args[1]}`];

    if (child) return this.findCommand(args.splice(1), flags, parent);
    const resolvedArgs = this.resolveArgs(cmd, args.splice(1));
    const resolvedFlags = this.resolveFlags(cmd, flags);

    return {
      runningCommand: cmd,
      ...resolvedArgs,
      ...resolvedFlags,
    };
  }

  private resolveArgs(cmd: Command, rawArgs: string[]): Partial<State> {
    const args = {};
    const argSchemas = Object.keys(cmd.args);
    argSchemas.forEach((arg, i) => {
      args[arg] = rawArgs[i];
    });
    return {
      args,
      unknownArgs: rawArgs.slice(argSchemas.length),
    };
  }

  private resolveFlags(
    cmd: Command,
    flags: Record<string, string | boolean>,
  ): Partial<State> {
    const flattenFlags = Object.keys(cmd.flags).map((k: any) => [
      k,
      ...(cmd.flags[k].aliases || []),
    ]);
    const resolvedFlags = {};
    for (const key in flags) {
      flattenFlags.forEach((fflags: string[]) => {
        if (fflags.includes(key)) {
          fflags.forEach((f: string) => (resolvedFlags[f] = flags[key]));
        }
      });
    }
    return { flags: resolvedFlags };
  }

  getCommands(): Command[] {
    return this.commands;
  }

  getCommandById(id: number): Command {
    return this.commands.find((c: Command) => c.id === id);
  }

  getCommandByName(names: string[]): any {
    return this.findCommand(names).runningCommand;
  }

  async validate(
    command: Command,
    args: object,
    validators = [],
  ): Promise<Validation> {
    const { LesyValidator } = require("@lesy/validator");
    const schema = new LesyValidator(command.args);
    validators.forEach(({ name, fn }) => schema.register(name, fn));
    const validation = await schema.validate(args);
    const isPassed = validation.every((v: any) => v.passed);
    return { isPassed, errors: validation };
  }

  private formatNames(cmd: Command) {
    cmd.name = cmd.name || "default";
    cmd.aliases = [cmd.name, ...cmd.aliases].map(this.normalizeStr);
    cmd.name = cmd.aliases[0];
    return cmd;
  }

  private transformRawCommand(cmd: Command | Function): Command {
    let cmdObj: Command;
    if (typeof cmd === "object") {
      cmdObj = { ...this.defaultProps, ...cmd };
    } else if (this.isClass(cmd)) {
      cmdObj = new (cmd as any)() as Command;
      Object.keys(this.defaultProps).forEach((p: any) => {
        if (cmdObj[p] != null) return;
        Object.defineProperty(cmdObj, p, {
          value: this.defaultProps[p],
          configurable: true,
          enumerable: true,
          writable: true,
        });
      });
    } else {
      cmdObj = { ...this.defaultProps, ...cmd };
      cmd(cmdObj);
    }

    return this.formatNames(cmdObj);
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
