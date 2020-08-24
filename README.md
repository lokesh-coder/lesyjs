# Lesy JS

Lesy js is a super simple CLI framework to build modern node based command line applications, without much boilerplate.

Though there were awesome tools available for building CLI apps, the ultimate and only purpose of Lesy is to bring all cool fuctionalities to UI. Which means write code once and run it in terminal or web UI. There were other nice features in lesy that you might like.

<br/>

### 𝙵𝚎𝚊𝚝𝚞𝚛𝚎𝚜

✓ **Language**: Javascript and Typescript with @types

✓ **Flexibility**: Able to change complete behaviour with middlewares

✓ **Boilerplate**: Write less code. whether its a dead simple project or complex one.

✓ **Extensions**: Add cool functionalities with plugins

✓ **Platform**: Write once and run in CLI or web UI. Desktop interface is coming soon.

✓ **Performance**: It is faster than existing tools. Benchmarks inside.

✓ **Testing**: Dedicated testing setup for unit test and integration test

✓ **Lot more**: Features, sub commands, plugins, boilerplate generator...

<br/>

### 𝙸𝚗𝚜𝚝𝚊𝚕𝚕𝚊𝚝𝚒𝚘𝚗

Scaffold new project directly using npx command

```shell
npx lesy new my-cli
```

Or, you can install lesy cli globally and generate a new project

```shell
npm i -g lesy
lesy new my-cli
```

Also you can create your own project setup and run lesy. [Learn more](/).

<br/>

### 𝚁𝚞𝚗 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜

Once you setup a project, you can create and run your first command.

```js
#!/usr/bin/env node

const lesy = require("@lesy/compiler");
const helloCommand = { name: "hello", run: () => console.log("hello world") };

lesy({ commands: [helloCommand] }).parse();
```

```
./bin/cmd hello
```

It is just a tiny bit of lesy. There are lot of other cool stuffs like, advance commands, middlewares, features, configs, and plugins. [Learn more](/)

<br/>

### 𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚘𝚏𝚏𝚒𝚌𝚒𝚊𝚕 𝙿𝚕𝚞𝚐𝚒𝚗𝚜

**@lesy/lesy-plugin-pilot**
Run comamnds in Web UI. Supports input, console, workspace and more..

**@lesy/lesy-plugin-store**
Key value storage in the system

**@lesy/lesy-plugin-config**
Setup config files like myapp.config.json, myapp.config.yml, myapp.config.js

**@lesy/lesy-plugin-generator**
Scaffold projects with handlebars templating

**@lesy/lesy-plugin-prompt**
Wrapper around inquirer plugin for prompts and questions

**@lesy/lesy-plugin-help**
Automatically generate beautiful help with sub commands support. Highly customizable

**@lesy/lesy-plugin-validator**
Prompt if required args are not supplied

<br/>

### 𝚃𝚛𝚢 𝙻𝚎𝚜𝚢 𝙿𝚒𝚕𝚘𝚝 𝚋𝚎𝚏𝚘𝚛𝚎 𝚒𝚗𝚜𝚝𝚊𝚕𝚕𝚒𝚗𝚐

We have a setup a _playground_ for you to play around with it.

[![Edit lesy-pilot-playground](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/lesy-pilot-playground-hzjgw?fontsize=14&hidenavigation=1&view=preview)
