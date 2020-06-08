---
title: Help
path: /plugins/help
icon: question-fill
---

**@lesy/lesy-plugin-help** plugin automatically creates help command and displays necessary info when `--help` flag or `help` command is executed.

### Installation

```shell
$ npm install @lesy/lesy-plugin-help
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-help']
}
```

### Usage

Lets say we have a command like this,

```javascript
export default {
  name: "hello",
  description: "Greet the user",
  additionalInfo: "This is a bottom message",
  aliases: ["ola", "hi"],
  args: {
    name: {
      description: "name of the user",
      required: true,
    },
  },
  flags: {
    admin: {
      description: "is admin",
      aliases: ["a"],
    },
  },
  run: ({ args, flags }) => {
    console.log(`Welcome ${args.name}!`, flags.admin ? "You are owner" : "");
  },
};
```

```shell
$ ./bin/cmd hello --help
$ ./bin/cmd help hello
```

When we run any of the comamnd above, we will get the below message,

```shell
Greet the user

Usage:
  myapp hello [name]

Arguments:
  name            - name of the user

Options:
  -a, --admin     - is admin

This is a bottom message
```

The help shows sub commands if the comamnd has any. For app help,

```shell
$ ./bin/cmd --help
```

```
Myapp is cool!

Usage:
  myapp <command> [...options]

Commands:
  myapp hello [name]              - Greet the user
  myapp help                      - Show command info
  myapp pilot                     - Run commands from GUI
  myapp run [command]             - run shell command

Options:
  -h, --help                      - show help
```

### Config

We can supply custom config to help plugin to change the labels and other settings.

```typescript
const helpConfig = {
  customHelpCommand:"help",
  description: "Display Help",
  aliases: ["h"],
  usageLabel: "Usage",
  argumentsLabel: "Arguments",
  flagsLabels: "Options",
  subCommandsLabels: "Sub commands",
  commandsLabel: "Commands",
  infoLabel: "Info",
  aliasesLabel: "Aliases",
  optionsLabel: "Options",
  emptyDescription: "-",
  sectionSeperator: " - ",
  sectionWidth: 40,
  argumentStr: "<argument>",
  commandStr: "<command>",
  optionsStr: "[...options]",
};

export default {
  commands:[...],
  plugins:[['@lesy/lesy-plugin-help',helpConfig]]
}
```

### Custom help

We can also completely customise the help, by providing custom help command.

```typescript
export default {
  name: "myhelp",
  description: "my supercool help",
  aliases: ["h"],
  run: ({ meta: commandData }) => {
    console.log(commandData); // will show all details about the command that is executed
  },
};
```

Then we can set that command to help config.

```typescript
export default {
  commands:[...],
  plugins:[['@lesy/lesy-plugin-help',{customHelpCommand:"myhelp"}]]
}
```
