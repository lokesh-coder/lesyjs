const TAB = "    ";
const BREAK = "\n";

export default class Help {
  private color;
  private command;
  private commands;
  private isRoot = false;
  private appName;
  private feature;
  private columnify;
  name = "help";
  args = {
    commandName: {},
  };
  getAllCommands(meta, color) {
    const { appCommandName: appName } = meta;
    let {
      rootCommand: { allCommands: data },
    } = meta;
    const { yellow, gray } = color;
    data = data.map((c: any) => ({
      name: `${gray("    ")}${appName} ${c.name} ${Object.keys(c.args)
        .map((c: string) => `${yellow(`[${c}]`)}`)
        .join(" ")}`,
      desc: `${gray(c.description)}`,
    }));
    return this.columnify(data, {
      showHeaders: false,
      minWidth: 20,
      columnSplitter: ` - `,
    });
  }

  getSubCommands(meta, color) {
    const {
      appCommandName: appName,
      mainCommand: { name },
    } = meta;
    let {
      mainCommand: { subCommands: data },
    } = meta;
    const { yellow, gray } = color;
    data = data.map((c: any) => ({
      name: `${gray("    ")}${appName} ${name} ${c.name} ${c.args
        .map((c: any) => `${yellow(`[${c.name}]`)}`)
        .join(" ")}`,
      desc: `${gray(c.description)}`,
    }));
    return this.columnify(data, {
      showHeaders: false,
      minWidth: 20,
      columnSplitter: ` - `,
    });
  }
  getArguments(meta, color) {
    let {
      mainCommand: { args: data },
    } = meta;
    const { yellow, gray } = color;
    data = data.map((c: any) => ({
      name: `${gray("    ")} ${c.name}`,
      desc: `${gray(c.description || "<no desc>")}`,
    }));
    return this.columnify(data, {
      showHeaders: false,
      minWidth: 20,
      columnSplitter: ` - `,
    });
  }
  run({ args, meta, utils }) {
    // todo: add config for titles
    const color = utils.color();
    const t = color.green.bold.underline;
    this.columnify = require("columnify");
    let msg = "";
    if (meta.isRootCommand) {
      const { rootCommand: cmd, appCommandName: appName } = meta;
      msg += `${cmd.description || "-no-desc-"}\n`;

      msg += `\n${t("Usage")}\n`;
      msg += `${TAB}${appName} ${args.commandName}\n`;

      msg += `\n${t("All Commands")}\n`;
      msg += `${this.getAllCommands(meta, color)}\n`;

      msg += `\n${t("Options")}\n`;
      cmd.options.forEach(({ name: n, aliases: a, description: d }) => {
        msg += `${TAB}${a.join("|")}|--${n} ${d}\n`;
      });

      msg += `\n${t("Info")}\n`;
      msg += `${TAB}${cmd.additionalInfo}\n`;
    } else {
      const { mainCommand: cmd, appCommandName: appName } = meta;
      msg += `${cmd.description || "-no-desc-"}\n`;

      msg += `\n${t("Usage")}\n`;
      msg += `${TAB}${appName} ${cmd.ancestors.join(" ")} ${cmd.args
        .map((a: any) => `[${a.name}]`)
        .join(" ")}\n`;

      msg += `\n${t("Aguments")}\n`;
      msg += `${this.getArguments(meta, color)}\n`;

      msg += `\n${t("Flags")}\n`;
      cmd.flags.forEach(({ name: n, aliases: a, description: d }) => {
        msg += `${TAB}${a.map((a: any) => `-${a}`).join(", ")}, --${n} ${d}\n`;
      });

      msg += `\n${t("Sub Commands")}\n`;
      msg += `${this.getSubCommands(meta, color)}\n`;

      msg += `\n${t("Info")}\n`;
      msg += `${TAB}${cmd.additionalInfo || ""}\n`;

      msg += "";
    }
    console.log(msg);
    return;
  }

  render() {
    if (this.isRoot) {
      return this.renderAppHelp();
    }
    return this.renderCommandHelp();
  }

  private decorateHeading(heading: string) {
    return `${this.color.gray(heading)}:`;
  }

  private decorateDescription() {
    return this.color.red(this.command.description);
  }
  private decorateUsage(
    prefix = this.appName,
    firstArg = "<command>",
    lastArg = "[...options]",
  ) {
    const name = this.color.blue(prefix);
    const firstPlaceholder = this.color.gray(firstArg);
    const lastPlaceholder = this.color.gray(lastArg);
    return TAB + [name, firstPlaceholder, lastPlaceholder].join(" ");
  }

  private decorateCommands() {
    const commands = this.commands.map(({ name, args }) => ({
      name,
      args,
    }));
    const list = [];
    commands.forEach(({ name, args }) => {
      list.push(TAB + this.decorateCommand(name, args));
    });
    return list.join(BREAK);
  }
  private decorateCommand(cmdName, argSchema) {
    const args = Object.keys(argSchema)
      .map((a: any) => `[${a}]`)
      .join(" ");
    return this.color.yellow(`${this.appName} ${cmdName} ${args}`);
  }
  private decorateArguments() {
    const args = Object.keys(this.command.args).map((name: any) => {
      const arg = this.command.args[name];
      return { ...arg, name, required: arg.required };
    });
    const list = [];
    args.forEach((arg: any) => {
      list.push(TAB + this.decorateArgument(arg));
    });
    return list;
  }
  private decorateArgument(arg) {
    console.log("arg", arg);
    const args = [this.color.yellow(`${arg.name}`)];
    if (arg.description) args.push(this.color.white(`${arg.description}`));
    if (arg.required) args.push(this.color.red("*"));
    return args.join(TAB);
  }
  private decorateOptions() {
    this.command.flags.help = {
      description: "display help",
      aliases: ["h"],
    };
    const flags = Object.keys(this.command.flags).map((name: any) => {
      let aliases = this.command.flags[name].aliases;
      aliases = aliases.map((n: any) => `-${n}`); // todo: - or --
      aliases.push(`--${name}`);
      return aliases.sort();
    });
    const list = [];
    flags.forEach((flagGroup: any, i) => {
      list.push(
        TAB +
          this.decorateOption(
            flagGroup,
            this.command.flags[flags[i][0].replace("--", "")],
          ),
      );
    });
    return list.join(BREAK);
  }
  private decorateOption(flagGroup, flag) {
    return `${this.color.yellow(flagGroup.join(", "))} ${this.color.white(
      flag.description || "",
    )}`;
  }
  private decorateAliases() {
    const aliases = this.command.aliases;
    return TAB + this.color.yellow(aliases.join(" , "));
  }
  private decorateFooter() {
    if (!this.command.info) return;
    return BREAK + this.color.gray(this.command.info);
  }
  private renderAppHelp() {
    const desc = this.decorateDescription();
    const usageTitle = this.decorateHeading("Usage");
    const usage = this.decorateUsage();
    const commandsTitle = this.decorateHeading("Commands");
    const commands = this.decorateCommands();
    const optionsTitle = this.decorateHeading("Options");
    const options = this.decorateOptions();
    const footer = this.decorateFooter();

    return [
      desc,
      BREAK,
      usageTitle,
      BREAK,
      usage,
      BREAK,
      commandsTitle,
      BREAK,
      commands,
      BREAK,
      optionsTitle,
      BREAK,
      options,
      BREAK,
      footer,
    ];
  }
  private renderCommandHelp() {
    const desc = this.decorateDescription();
    const usageTitle = this.decorateHeading("Usage");
    const usage = this.decorateUsage(
      this.appName + TAB + this.command.name,
      "<argument>",
    );
    const aliasesTitle = this.decorateHeading("Aliases");
    const aliases = this.decorateAliases();
    const argsTitle = this.decorateHeading("Arguments");
    const args = this.decorateArguments();
    const optionsTitle = this.decorateHeading("Options");
    const options = this.decorateOptions();
    const footer = this.decorateFooter();

    return [
      desc,
      BREAK,
      usageTitle,
      BREAK,
      usage,
      BREAK,
      aliasesTitle,
      BREAK,
      aliases,
      BREAK,
      argsTitle,
      BREAK,
      args,
      BREAK,
      optionsTitle,
      BREAK,
      options,
      BREAK,
      footer,
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
