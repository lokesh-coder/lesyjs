---
title: Pilot UI
path: /plugins/pilot-ui
icon: apps-2-fill
---

**@lesy/lesy-plugin-pilot** plugin allows us to execute and run commands from GUI. No extra work needed, just add this plugin, and your UI is ready!

### Installation

```shell
$ npm install @lesy/lesy-plugin-pilot
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-pilot']
}
```

### Usage

Once you added the plugin, it will add `pilot` command to your app. To open the GUI, run this command,

```shell
$ ./bin/cmd pilot
```

Then, the local address will be displayed something like this,

```bash
   ┌───────────────────────────────────────────┐
   │                                           │
   │   Pilot is running...                     │
   │                                           │
   │   - Local   http://localhost:8888         │
   │   - Network http://192.168.43.242:8888    │
   │                                           │
   └───────────────────────────────────────────┘

```

Just access these localhost in your system or mobile (it is responsive app!) and start executing the command.

There are few settings you can try,

- **Aliases**: `server`, `web`, `s`, `w`
- **Host**: `--host=localhost` or `--h=localhost`
- **Port**: `--port=4444` or `--p=4444`
- **Socket host**: `--socketHost=localhost` or `--sh=localhost`
- **Socket port**: `--socketPort=2222` or `--sp=2222`
- **Socket url**: `--clientSocketUrl=https://url` or `--csu=https://url`

### User Interface

There are quite a cool features in the UI.

- View and run commands and sub commands
- View command information and config
- Prompts and notifications
- View console log with colors
- Run shell commands
- Easy setup in cloud IDE, like codesandbox

### Config

This plugin uses the `package.json` file by default to get the basic config data. But you can override them.

```typescript
const pilotConfig = {
  appName: "Myapp",
  docTitle: "My app dashboard",
  appVersion: "1.2.0",
  cmdName: "myapp",
};

export default {
    commands:[...],
    plugins:[['@lesy/lesy-plugin-pilot',pilotConfig]]
}
```
