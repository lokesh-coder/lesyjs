export default {
  on: "POST_PARSE",
  run: (data: any) => {
    const { config, request } = data;

    let cmdNeedsHelp = [];

    if (data.rawFlags.help && data.rawArgs[0] === "help") {
      delete data.rawFlags.help;
      cmdNeedsHelp = data.rawArgs.slice(1);
    } else if (data.rawFlags.help) {
      cmdNeedsHelp =
        data.rawArgs.length === 0 ? [config.defaultCommand] : data.rawArgs;
    } else if (data.rawArgs[0] === "help") {
      cmdNeedsHelp = data.rawArgs.slice(1);
      cmdNeedsHelp =
        cmdNeedsHelp.length === 0 ? [config.defaultCommand] : cmdNeedsHelp;
    } else {
      return data;
    }

    const getCmdAncestors = (cmds, parent = "") => {
      const cmdObj = {};
      cmds.forEach((cmd: any) => {
        cmdObj[cmd.name] = cmd;
      });

      let stop = false;
      const coll = [];
      let key = parent;
      while (!stop) {
        coll.push(cmdObj[key].name);
        if (cmdObj[key] && cmdObj[key].main) {
          key = cmdObj[key].main;
        } else {
          // break;
          stop = true;
        }
      }
      return coll.reverse();
    };

    const getRootCommandProps = cmd => ({
      description: cmd.description || "",
      usage: cmd.usage || "",
      allCommands: request.getCommands().filter(c => !c.main),
      options: [{ name: "help", aliases: ["-h"], description: "display help" }],
      additionalInfo: cmd.additionalInfo || "",
    });

    const getMainCommandProps = cmd => ({
      name: cmd.name,
      description: cmd.description,
      aliases: [],
      usage: cmd.aliases,
      additionalInfo: cmd.additionalInfo,
      ancestors: getCmdAncestors(request.getCommands(), cmd.name),
      args: Object.keys(cmd.args).map(a => ({
        name: a,
        required: !!cmd.args[a]["required"],
        description: cmd.args[a]["description"],
      })),
      flags: Object.keys(cmd.flags).map(a => ({
        name: a,
        aliases: cmd.flags[a]["aliases"] || [],
        description: cmd.flags[a]["description"],
      })),
      subCommands: request
        .getCommands()
        .filter(c => c.main === cmd.name)
        .map(sc => ({
          name: sc.name,
          description: sc.description,
          args: Object.keys(sc.args).map(a => ({
            name: a,
            required: !!sc.args[a]["required"],
            description: sc.args[a]["description"],
          })),
        })),
    });

    const cmd = request.getCommandByName([...cmdNeedsHelp]);
    const isRootCommand = cmdNeedsHelp[0] === config.defaultCommand;

    const meta: any = {
      isRootCommand,
      appCommandName: Object.keys(data.feature.pkg.bin)[0],
      rootCommand: isRootCommand ? getRootCommandProps(cmd) : null,
      mainCommand: !isRootCommand ? getMainCommandProps(cmd) : null,
    };
    data.meta = meta;
    data.rawArgs = ["help", cmdNeedsHelp.join(" ")];
    return data;
  },
};
