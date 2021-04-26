import { HelpConfig } from "./help.model";
import { defaultConfig } from "./help.config";

const TAB = "  ";
const BREAK = "\n";

export default class Help {
  private color;
  private command;
  private commands;
  private isRoot = false;
  private appName;
  private columnify;
  private columnifyOptions;
  private config: HelpConfig;
  name = "help";
  description = "Show command info";

  run({ meta, utils, config }) {
    this.config = {
      ...defaultConfig,
      ...config["@lesy/lesy-plugin-help"],
    };

    const { isRootCommand, rootCommand, mainCommand, appCommandName } = meta;
    this.isRoot = isRootCommand;
    this.commands = rootCommand ? rootCommand.allCommands : [];
    this.appName = appCommandName;
    this.command = meta.isRootCommand ? rootCommand : mainCommand;
    this.color = utils.color();

    this.columnify = require("columnify");
    this.columnifyOptions = {
      showHeaders: false,
      minWidth: this.config.sectionWidth,
      columnSplitter: this.color.gray(this.config.sectionSeperator),
    };

    console.log(this.renderOutput().join(""));
    return;
  }

  get t() {
    return {
      appdesc: this.color.white,
      title: this.color.white.bold,
    };
  }

  renderOutput() {
    if (this.isRoot) return this.renderAppHelp();
    return this.renderCommandHelp();
  }

  private decorateHeading(heading: string) {
    return `${this.t.title(heading)}:`;
  }

  private decorateDescription() {
    return this.color.red(this.command.description);
  }

  private decorateUsage(
    prefix = this.appName,
    firstArg = this.config.commandStr,
    lastArg = this.config.optionsStr,
  ) {
    if (!this.command.args) {
      const name = this.color.blue(prefix);
      const firstPlaceholder = this.color.gray(firstArg);
      const lastPlaceholder = this.color.gray(lastArg);
      return TAB + [name, firstPlaceholder, lastPlaceholder].join(" ");
    }

    return `${TAB}${prefix} ${this.command.args
      .map((a: any) => this.color.gray(`[${a.name}]`))
      .join(" ")}\n`;
  }

  private decorateCommands() {
    const data = [];
    this.commands.forEach(({ name, description, args }) => {
      data.push(this.decorateCommand(name, description, args));
    });
    return this.columnify(data, this.columnifyOptions);
  }

  private decorateCommand(cmdName, description, argSchema) {
    const args = Object.keys(argSchema)
      .map((a: any) => `[${a}]`)
      .join(" ");
    return {
      name:
        this.color.gray(TAB) +
        this.color.yellow(`${this.appName} ${cmdName} ${args}`),
      ...(description ? { desc: this.color.gray(description) } : {}),
    };
  }

  private decorateArguments() {
    const data = this.command.args.map(this.decorateArgument.bind(this));
    return this.columnify(data, this.columnifyOptions);
  }

  private decorateArgument(arg) {
    const info = [];
    if (arg.description) info.push(this.color.gray(`${arg.description}`));
    if (arg.required) info.push(this.color.red(`*`));
    return {
      name: [this.color.gray(TAB), this.color.yellow(`${arg.name}`)].join(""),
      ...(info.length > 0 ? { desc: info.join(" ") } : {}),
    };
  }

  private decorateOptions() {
    if (!this.command.flags) {
      this.command.flags = [];
    }
    this.command.flags.push({
      name: this.name,
      description: this.config.description,
      aliases: this.config.aliases,
    });

    const flags = this.command.flags.map(({ name, aliases }) => {
      const newAliases = aliases.map((n: any) => `-${n}`); // todo: - or --
      newAliases.push(`--${name}`);
      return newAliases;
    });
    const data = [];
    flags.forEach((name: any, i: number) => {
      data.push(this.decorateOption(name, this.command.flags[i]));
    });
    return this.columnify(data, this.columnifyOptions);
  }

  private decorateOption(name, flag) {
    return {
      name: [this.color.gray(TAB), this.color.yellow(name.join(", "))].join(""),
      desc: `${this.color.gray(flag.description || "")}`,
    };
  }

  private decorateAliases() {
    const aliases = this.command.aliases;
    if (aliases.length > 1) return TAB + this.color.yellow(aliases.join(", "));
  }

  private decorateSubCommands() {
    const { yellow, gray } = this.color;
    const { subCommands, name } = this.command;
    const data = subCommands.map((c: any) => ({
      name: `${gray(TAB)}${this.appName} ${name} ${c.name} ${c.args
        .map((c: any) => `${yellow(`[${c.name}]`)}`)
        .join(" ")}`,
      desc: `${gray(c.description)}`,
    }));
    return this.columnify(data, this.columnifyOptions);
  }

  private decorateFooter() {
    if (!this.command.additionalInfo) return;
    return this.color.gray(this.command.additionalInfo);
  }

  private renderAppHelp() {
    const desc = this.decorateDescription();
    const usageTitle = this.decorateHeading(this.config.usageLabel);
    const usage = this.decorateUsage();
    const commandsTitle = this.decorateHeading(this.config.commandsLabel);
    const commands = this.decorateCommands();
    const optionsTitle = this.decorateHeading(this.config.optionsLabel);
    const options = this.decorateOptions();
    const footer = this.decorateFooter();

    return [
      ...(desc ? [desc, BREAK, BREAK] : []),
      usageTitle,
      BREAK,
      usage,
      BREAK,
      BREAK,
      commandsTitle,
      BREAK,
      commands,
      BREAK,
      BREAK,
      optionsTitle,
      BREAK,
      options,
      BREAK,
      ...(footer ? [BREAK, footer] : []),
    ];
  }
  private renderCommandHelp() {
    const desc = this.decorateDescription();
    const usageTitle = this.decorateHeading(this.config.usageLabel);
    const usage = this.decorateUsage(
      `${this.appName} ${this.command.ancestors.join(" ")}`,
      this.config.argumentStr,
    );
    const aliasesTitle = this.decorateHeading(this.config.aliasesLabel);
    const aliases = this.decorateAliases();

    const argsTitle = this.decorateHeading(this.config.argumentsLabel);
    const args = this.decorateArguments();

    const optionsTitle = this.decorateHeading(this.config.optionsLabel);
    const options = this.decorateOptions();

    const subCommandsTitle = this.decorateHeading(
      this.config.subCommandsLabels,
    );
    const subCommands = this.decorateSubCommands();

    const footer = this.decorateFooter();

    return [
      ...(desc ? [BREAK, desc, BREAK, BREAK] : []),
      usageTitle,
      BREAK,
      usage,

      ...(aliases ? [BREAK, aliasesTitle, BREAK, aliases, BREAK] : []),
      ...(args ? [BREAK, argsTitle, BREAK, args, BREAK] : []),
      BREAK,
      optionsTitle,
      BREAK,
      options,
      BREAK,
      ...(subCommands
        ? [BREAK, subCommandsTitle, BREAK, subCommands, BREAK]
        : []),
      ...(footer ? [BREAK, footer, BREAK] : []),
    ];
  }
}

/*

## COMAMND HELP ===

$lesy new --help

lesy new [app-name] [...options]
<desc>

Usage:
    <usage>
Aliases:
    new | init | i
Arguments:
    appName         - project name
    directory       - destination folder
Options:
    -h, --help          - display help
    -f, --force, --yes  - set default values
Sub Commands:
    lesy store set [key] [value] --g   - store set new value
    lesy store get [key] --str         - store set new value
Additional Info:
    <info>

## OPTIONS ===
- custom help with json data
- custom help command
- additional info msg
- activate help command
- help cmd aliases
- help custom flags

*/
