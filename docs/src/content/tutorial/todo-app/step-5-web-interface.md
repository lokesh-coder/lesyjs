---
title: "#5 · Web interface"
icon: bug-fill
summary: ""
---

So far we have successfully implemented all the essential features to manage the todos. But command line interface is not fun for everyone, right? What if we can bring up a web interface and do all the actions from UI without writing any code?

## Introduction to Pilot Dashboard

Pilot is one of the key plugins, which allows us to run commands from web UI by internally running them. Pilot comes with nice console, so we can see the output in realtime.

<!-- <gif> -->

## Setup

First we need to install the plugin and then add to lesy.

### Install lesy pilot plugin

In the terminal run this command.

```shell
npm install @lesy/lesy-plugin-pilot
```

### Add plugin to lesy

Once installed let's add the plugin to lesy options in `index.js` file

```js
module.exports = {
  features: [...],
  commands: [...],
  middlewares: [...],
  plugins:['@lesy/lesy-plugin-help','@lesy/lesy-plugin-pilot']
};
```

## Run pilot server

That's it. We are ready to start the pilot server. You dont need make any special changes to the code. But before that, we will run the help command and see what are the new commands we have now.

```shell
> todos --help
```

This will output something like this,

```shell
Todo CLI

Usage:
  todos <command> [...options]

Commands:
  todos add [todo]                        - add new todo item
  todos delete [id]                       - delete an todo item
  todos list                              - list all todos
  todos status [id] [status]              - update todo status
  lesy pilot                              - Run commands from GUI
  lesy run [command]                      - Run shell command
  todos help                              - Show command info

Options:
  -h, --help                             - Display Help
```

Here we can see there are two new commands are added, `pilot` and `run`. Pilot command starts the server, and Run command runs the shell.

If we run help for pilot,

```shell
> todos pilot --help
```

We will see all info about the pilot command.

```shell
Run commands from GUI

Usage:
  todos pilot

Aliases:
  pilot, server, web, s, w

Options:
  -h, --host                             - host name
  -p, --port                             - port number
  -sp, --socketPort                      - external port number
  -sh, --socketHost                      - external host name
  -csu, --clientSocketUrl                - external full url
  -h, --help                             - display Help
```

Now its time to start the pilot server. From the terminal, we will run pilot command.

```shell
> todos pilot
```

On running the above command, it displays the local network address to access the web UI dashboard.

```shell
   ┌───────────────────────────────────────────┐
   │                                          │
   │   Pilot is running...                    │
   │                                          │
   │   - Local   http://localhost:8888        │
   │   - Network http://192.168.43.242:8888   │
   │                                          │
   └───────────────────────────────────────────┘

```

Click on the local address or copy paste the url in browser.

## Control todos from web UI

From Pilot we can,

- run commands (root commands and sub commands),
- view middlewares
- view console logs
- view lesy configuration
- run shell commands
- switch projects

### Run commands

View, run, manage commands from main commands main page. We can group the commands, see the args, flags, aliases and other info about the selected command. If we use `@lesy/lesy-plugin-prompt` plugin, in pilot that opens as a popup for a prompt. All without adding any additional line of code.

<!-- <gif> -->

### Console view

Realtime highly configurable console to view the logs with colors and styles.

<!-- <gif> -->

### Run shell

Locally run any shell commands.

<!-- <gif> -->

### View configs

Table view of all lesy configuration values.

<!-- <gif> -->

### Projects

Whats so cool about the Pilot is, when you have installed any lesy apps globally, you can swich to them and access from here, even if that apps dont have pilot plugin dependency!

<!-- <gif> -->

## Pilot config

We can able to change the app name and description via plugin options.

```js
module.exports = {
  features: [...],
  commands: [...],
  middlewares: [...],
  plugins:[
		'@lesy/lesy-plugin-help',
    [ "@lesy/lesy-plugin-pilot", { docTitle: "Todos | Dashboard", appName: "Todos" }]
  ]
};
```

## Recap

- Pilot Dashboard runs all commands programatically without additional code
- Pilot projects allows us to swich between globally installed apps
- Pilot provides a powerful and configurable console panel view

## Learn more

- [Pilot dashboad]() plugin documentation
