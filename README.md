<h3 align="center">
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://lesyjs.io"
    ><img
      width="50"
      alt="The Lounge"
      src="https://user-images.githubusercontent.com/1754676/116806447-a808a300-ab4a-11eb-9805-e774c9c36931.png"
      style="max-width: 100%"
  /></a> <br/>
<a>Lesy js</a>
</h3>
<h3 align="center">
	> 𝙱𝚞𝚒𝚕𝚍 𝚖𝚘𝚍𝚎𝚛𝚗 𝚌𝚘𝚖𝚖𝚊𝚗𝚍-𝚕𝚒𝚗𝚎 𝚊𝚙𝚙𝚜 _
</h3>

<p align="center">
	<span>
		<a href="https://lesyjs.io/">website</a>
		•
		<a href="https://lesyjs.io/docs/getting-started/introduction">documentation</a>
		•
		<a href="https://codesandbox.io/s/lesy-pilot-playground-hzjgw?file=/src/index.js">playground</a>
		•
		<a href="https://twitter.com/lesyjs">@lesyjs</a>
	</span>
</p>

<h1></h1>
<br/>
<p align="center">

<img src="https://img.shields.io/coveralls/github/lokesh-coder/lesyjs?color=4a5874&labelColor=bc5251&style=flat-square"/>
<img src="https://img.shields.io/github/workflow/status/lokesh-coder/lesyjs/Release?color=4a5874&labelColor=bc5251&style=flat-square"/>
<img src="https://img.shields.io/npm/v/@lesy/core?color=4a5874&labelColor=bc5251&style=flat-square"/>
<img src="https://img.shields.io/bundlephobia/minzip/@lesy/core?color=4a5874&labelColor=bc5251&label=core%20size%20&style=flat-square"/>
<img src="https://img.shields.io/npm/dt/lesy?color=4a5874&labelColor=bc5251&style=flat-square"/>

</p>

<h1></h1>
 <br/>

A developer friendly **Node js based CLI framework** to build modern command line applications.

Whether you are building a tiny teeny app or large complex one, Lesy provides you all the necessary tools out of box. That means, write less and get more with no additional cost to you and your users.

 <br/>

## Why Lesy

- **Typescript support** <br/>
  First class typescript support with types and compiler <br/><br/>
- **Middleware architecture** <br/> Change the flow at any stage or competely alter the behaviour without touching your core code <br/><br/>
- **Plugins system** <br/> Bring in more features on demand with official/community plugins. <br/><br/>
- **Powerful commands** <br/> Smart args/flags parsing, multi level sub commands, validators, multiple types, programatically running commands <br/><br/>
- **Reusable features** <br/> Global data that can be accessed everywhere, whether it is a simple piece of code or 3rd part module <br/><br/>
- **Configuration** <br/> App level configuration object to customize the settings <br/><br/>
- **Full-fledged Test suite** <br/> write simple unit level testing or complete app level integration testing with simple API <br/><br/>
- **Lesy CLI** <br/> Scaffold new project with just one simple command <br/><br/>
- **Performance** <br/> Lesy core is lightweight and smart enough to run just what it needs. Benchmark inside <br/><br/>
- **Dynamic interface** <br/> Rewrite terminal screen content on data change with bunch of inbuilt elements <br/><br/>
- **Web UI** <br/> Lesy's Pilot server brings all your commands to web ui, so your users can happily run commands from web UI <br/><br/>
- **Desktop UI** <br/> installable desktop app, that runs all globally installed lesy projects, and users can run apps from their app <br/><br/>
- **Utilities** <br/> Built-in lazy utilities to work with colors and spinner <br/><br/>
- **Serverless mode** <br/> With Lesy's simple API, write a bot like app and run it in server

 <br/>

## Installation

To ease the setup process, Lesy comes with own CLI which scaffolds the project with all necessary tools included.

In your terminal run this command:

```bash
npx lesy new my-cli
```

For detailed installation guide and manual set up refer this [installation docs](https://lesyjs.io/docs/getting-started/installation).

 <br/>

## Basic example

```js
const lesy = require("@lesy/compiler");

const commands = [{ name: "greet", run: () => console.log("hello") }];
lesy({ commands }).parse();
```

```sh
$ ./my-cli greet
"hello"
```

 <br/>

## Lesy core

### Commands

Command is a simple object with a `run` function which will be executed on running the command.

```js
const lesy = require("@lesy/compiler");

const commands = [
  {
    name: "hello",
    args: {
      name: {
        required: true,
      },
    },
    run: ({ args }) => console.log(`Hello ${args.name}`),
  },
];

lesy({ commands }).parse();
```

- Command can also be a `function` or `class`
- You can also provide the command `file path` or the `directory path`
- Run multi-level sub commands
- Parse and validate args and flags
- Run command programmatically
- In-built lazy utilities that can be accessed from command context
- Execute synchronous and asynchronous code

Check out [commands API guide](https://lesyjs.io/docs/components/commands) to know more about it.

 <br/>

### Middlewares

Middlewares are simple functions which will be executed during the lifecyle of command flow. With this, you will be able to add new functionallity, tweak and change the entire behaviour of the command at any point of the flow without changing the command logic.

```js
const lesy = require("@lesy/compiler");

const commands = [{ name: "hello", run: () => console.log("hello world") }];
const middlewares = [
  {
    on: "END",
    run: (ctx) => {
      console.log("this will be printed after hello world");
      return ctx;
    },
  },
];

lesy({ commands, middlewares }).parse();
```

With middleware you can do:

- Async calls
- Programatically change running command
- Modify args and flags
- Terminate the flow
- Intercept and change the output
- Print additional info at any stages
- Capture and send logs to other services
- Include data in command context data
- And much more..

To know more about hook points, async operations, parsing, context check [middleware docs](https://lesyjs.io/docs/components/middlewares)

 <br/>

### Features

Features are simple global object, which are accesible in both commands and middlewares. It is super useful if you are dealing with third party libraries and want to share with all commands and middlewares.

```js
const lesy = require("@lesy/compiler");

const commands = [{ name: "hello", run: ({ feature }) => feature.sayHello() }];
const features = [
  (feature) => {
    feature.sayHello = () => console.log("hello");
  },
];

lesy({ commands, features }).parse();
```

To know more about features [check here](https://lesyjs.io/docs/components/features)

 <br/>

### Plugins

Plugin is a collection of commands, middlewares, features and validators. Can be a local plugin or any lesy plugin that can be installed from npm. [learn more](https://lesyjs.io/docs/components/features)

```js
const lesy = require("@lesy/compiler");

const commands = [{ name: "hello", run: () => console.log("hello world") }];
const plugins = [
  `${dirname}/plugins/my-custom-plugin`,
  "@lesy/lesy-plugin-generator",
];

lesy({ commands, plugins }).parse();
```

- Pass config object to a plugin
- Support for plugins for a plugin

 <br/>

### More

- [Configuration](https://lesyjs.io/docs/components/configuration) - App level config object that can be accessed globally even with in plugins
- [Validators](https://lesyjs.io/docs/components/validators) - Args and flag validations

 <br/>

## Testing

Generally commands, middlewares, features can be tested independently with Jest. But however, to test them with the app or to test a plugin **testbed** can be used

```js
import { resolve } from "path";
import { LesyTestBed } from "@lesy/testbed";
const HelloCommand from "../src/commands/hello";

describe("CLI", () => {
  let app;

  beforeEach(() => {
    app = new LesyTestBed({
      root: resolve(__dirname, "./"),
      commands: [HelloCommand],
    });
  });

  it("should log proper output", async () => {
    let response = await app.run(["greet"]);
    expect(response).toContain("hello yoyo!");
  });
});
```

Check out [Testbed docs](https://lesyjs.io/docs/testing/testbed) for more info.

 <br/>

## Arist UI

Artist UI is an another cool plugin which helps you to render dynamic elements by updating the screen content on data change.

Artist can also be used independently without lesy, and it comes with commonly used interface elements like, spinner, progress bar, log, colors, layout, and much more. Also, Artist can be extended with plugins! [View docs](https://lesyjs.io/plugins/official/artist)

![image](https://lesyjs.io/images/render1612453288681.gif)

 <br/>

## Pilot web dashboard

Pilot Dashboard is one of the lesy plugins which allows you to view and run commands of any lesy projects from web UI. Pilot comes with inbuild customizable console panel, config viewer, prompt modal support, responsive layout and more. [View docs](https://lesyjs.io/plugins/official/pilot-dashboard)

![image](https://user-images.githubusercontent.com/1754676/116905452-9f07f680-ac5c-11eb-882f-1ae35e84244a.png)

 <br/>

## Plugins

- [**Pilot dashboard**](https://lesyjs.io/plugins/official/pilot-dashboard)
  Run commands in Web UI. Supports input, console, workspace and more...
- [**Artist UI**](https://lesyjs.io/plugins/official/artist)
  Update console screen on data change with in build elements
- [**Store**](https://lesyjs.io/plugins/official/local-store)
  Key-value storage in the system
- [**Config reader**](https://lesyjs.io/plugins/official/config-files)
  Setup config files like myapp.config.json, myapp.config.yml, myapp.config.js
- [**Scaffold generator**](https://lesyjs.io/plugins/official/scaffold-generator)
  Generate projects with handlebars templating
- [**Prompt**](https://lesyjs.io/plugins/official/prompt)
  Wrapper around inquirer plugin for prompts and questions
- [**Help**](https://lesyjs.io/plugins/official/auto-help)
  Automatically generate beautiful help with sub commands support. Highly customizable
- [**Arg validator**](https://lesyjs.io/plugins/official/arg-validator)
  Prompt if required args are not supplied

   <br/>

## Standalone libraries

There are few components which can be used without Lesy.

- [**Artist**](https://lesyjs.io/libraries/standalone/artist-UI)
  Artist is an independent library which helps you to update console screen on data change. And not just that, Artist also comes bundled with all necessary elements like spinner, colums, tables, progress bar and more to spice up the visuals.
- [**Object Validator**](https://lesyjs.io/libraries/standalone/object-validator)
  A lightweight bare minimum core library to validate simple objects with your own custom rules and conditions. This also lets you to use async rules, custom response messages.

   <br/>

## Contribution

Any Contributions are welcome!

 <br/>

## Developement

Refer this [local setup](https://lesyjs.io/docs/development/local-setup) guide for installing lesy in your local machine. And to know more indepth concepts check [project overiew](https://lesyjs.io/docs/development/project-overview) and [concepts](https://lesyjs.io/docs/development/indepth-concepts) page.

 <br/>

## License

This project is licensed under the **MIT License**
