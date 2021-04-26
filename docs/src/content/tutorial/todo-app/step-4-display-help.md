---
title: "#4 · Display help"
icon: bug-fill
summary: Lesy ships own testing tool `@lesy/testbed` for unit and integration test.
---

So far we have covered most essentials features and now lets move on to basic requirement of any CLI app. Yes, the missing piece is help command. Lesy already has a powerful help library to automatically process and display help.

## Introduction to plugins

Lesy has a poerful plugin mechanism, to add new functionality without touching the main code. A plugin is a group if commands, middlewares, feature s and validators. Some of the charactestistic of plugin includes:

- works with local and external npm lesy module
- able to set options
- able to provide plugins to a plugin

## Setup

### Install lesy help plugin

Lets go ahead and install lesy's help plugin. From the terminal in root directory run this command,

```shell
npm install @lesy/lesy-plugin-help
```

Help plugin comes with a `help` command and a middleware to provide a way to set custom own command to override the behaviour.

### Add plugin to lesy

Now we will add the plugin to lesy options in `index.js` file,

```js
module.exports = {
  middlewares: [`${__dirname}/footer.middleware.ts`],
  commands: [`${__dirname}/commands`],
  features: [`${__dirname}/db.feature.js`],
  plugins: ["@lesy/lesy-plugin-help"],
  validators: [
    {
      name: "enum",
      fn: (value, rule) => rule.includes(value),
    },
  ],
};
```

## Run help

There are 2 types of help. One is app level help, where it displays all commands and sub commands. And another is command level help, where it displays help for a specific command.

### App level help

In the terminal, if you try this command, it display the full command list with all the details.

```shell
todos --help
```

```shell
Lesy CLI Framework

Usage:
  todos <command> [...options]

Commands:
  todos add [todo]                        -
  todos delete [id]                       -
  todos list                              -
  todos status [id] [status]              -
  todos help                              - Show command info

Options:
  -h, --help                             - Display Help
```

You can change the app description **Lesy CLI Framework** to custom text by changing description property in `./src/commands/default.commands.js`.

You might have noticed there were no description shown in the help for the todo commands. Lets fix that.

In the commands file, we will add description property.

```js
// ./src/commands/add.js
module.exports = {
  name: "add",
  aliases: ["new", "a"],
  description: "add new todo item",
  args: {
    todo: {
      required: true,
      requiredError: "todo is mandatory!",
    },
  },
  run: ctx => {
    // code
  },
};
```

Likewise you can update for rest of the commands. Once you added and run the help again, you will see,

```shell
Todo CLI

Usage:
  todos <command> [...options]

Commands:
  todos add [todo]                        - add new todo item
  todos delete [id]                       - delete an todo item
  todos list                              - list all todos
  todos status [id] [status]              - update todo status
  todos help                              - Show command info

Options:
  -h, --help                             - Display Help
```

You can also add `additionalInfo` and `usage` props to show more info.

### Command level help

Lets update the command to have `description` and `additionalInfo` props. For delete command it looks like this,

```js
module.exports = {
  name: "delete",
  aliases: ["del", "remove"],
  description: "Delete all todos",
  additionalInfo: "Once deleted,cant retrive back.Use with caution!",
  args: {
    id: {
      description: "id to be deleted",
    },
  },
  flags: {
    all: {
      description: "delete all",
    },
  },
  run: ctx => {
    // code
  },
};
```

Then in the terminal if you we either of these commands,

```shell
> todos delete --help # as a flag
> todos help delete # as a help argument
```

we will see a help output like this.

```shell
Delete all todos

Usage:
  lesy delete [id]

Aliases:
  delete, del

Arguments:
  id                                     - id to be deleted

Options:
  --all                                  - delete all
  -h, --help                             - display help

Once deleted,cant retrive back.Use with caution!
```

If any of the arguments are mandatory, `*` symbol is added next to description.

Help plugin also, accepts a config to set a custom help command. Learn more about [Help plugin](/).

## Recap

- App level help and command level help based on the argument.
- Highly configurable.
- Shows sub commands if there is any.
- Uses `description` and `additionalInfo` props in main object and in args/flags object.

## Learn more

- Lesy [`@lesy/lesy-plugin-help`]() documentation
- Official [plugins]() list
- Create and [publish]() lesy plugin
