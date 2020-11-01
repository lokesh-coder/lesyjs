<h1 align="center">
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://lesyjs.io"
    ><img
      width="300"
      alt="The Lounge"
      src="https://user-images.githubusercontent.com/1754676/97110133-75926f00-16fd-11eb-9a27-3d52508d51cf.png"
      style="max-width: 100%"
  /></a>
</h1>
<br/>
<h3 align="center">
	> 𝙱𝚞𝚒𝚕𝚍 𝚖𝚘𝚍𝚎𝚛𝚗 𝚌𝚘𝚖𝚖𝚊𝚗𝚍-𝚕𝚒𝚗𝚎 𝚊𝚙𝚙𝚜_
</h3>
<p align="center">
	<span>
		<a href="https://lesyjs.io/">Website</a>
		•
		<a href="https://lesyjs.io/docs/get-started/overview">Documentation</a>
		•
		<a href="https://codesandbox.io/s/lesy-pilot-playground-hzjgw?file=/src/index.js">Playground</a>
	</span>
</p>
<br/>
<h1></h1>

## What is Lesy JS

Lesy is a simplified CLI framework build with NodeJS and Typescript. Main purpose of lesy is to enable web UI so that users can run commands from GUI dashboard without much complex. But lesy also shines in maintainability and flexibility focusing more on developer experience and performance.

## Features

- **Language**&#8192;&#8192;&#8192;&#8192; - _Javascript and Typescript with @types_
- **Flexibility**&#8192;&#8192;&#8192;&#8192; - _Able to change complete flow with middlewares_
- **Boilerplate**&#8192;&#8192;&#8192; - _Write less code. whether it's a dead simple project or complex one_
- **Extensions**&#8192;&#8192;&#8192; - _Add cool functionalities with plugins_
- **Platform**&#8192;&#8192;&#8192;&#8192;&#8192; - _Write once and run in CLI or web UI. Desktop interface is coming soon_
- **Performance**&#8192; - _It is faster than existing tools. Benchmarks inside_
- **Testing**&#8192;&#8192;&#8192;&#8192;&#8192;&#8192; - _Dedicated testing setup for unit test and integration test_
- **Lot more**&#8192;&#8192;&#8192;&#8192;&#8192; - _Features, sub-commands, boilerplate generator..._
  <br/> <br/>

## Installation and setup

Lesy can be installed from Lesy CLI or manually.

- #### Set it up from CLI

  Scaffold new project directly using npx command

  ```shell
  > npx lesy new my-cli
  ```

  Or, you can install lesy cli globally and generate a new project

  ```shell
  > npm i -g lesy
  > lesy new my-cli
  ```

  Once set up is done, follow the instructions that is displayed in the terminal.

<br/>

[![asciicast](https://asciinema.org/a/cByzQns8RTNs5I117XolHSgAt.svg)](https://asciinema.org/a/cByzQns8RTNs5I117XolHSgAt)

Also you can create your own project setup and run lesy. [Learn more]().
<br/> <br/>

- #### Manual setup

  Install `@lesy/compiler` via `npm` or `yarn`

  ```shell
  mkdir my-cli && cd my-cli
  npm install @lesy/compiler
  ```

  Then create a index file and add the below code

  ```js
  #!/usr/bin/env node

  const lesy = require("@lesy/compiler");
  const commands = [{ name: "hello", run: () => console.log("hello world") }];

  lesy({ commands }).parse();
  ```

  ```shell
  ./index hello
  ```

## Lesy core parts

- #### Commands

  Commands can be a simple object, or a function or a class. Also, you can provide a path to file or directory where lesy can discover all commands. There are lot of things you can do with commands like, deep nested sub commands, dynamic command execution, run asyncronous code, validate args and flags, etc.,

  ```js
  const lesy = require("@lesy/compiler");

  const commands = [
    {
      name: "hello",
      run: () => console.log("Hello Buddy!"),
    },

    function hello(cmd) {
      cmd.name = "hello";
      cmd.run = () => console.log("Hello Buddy!");
    },

    class Hello {
      name = "hello";
      run() {
        console.log("Hello Buddy!");
      }
    },

    `${__dirname}/commands/welcome.ts`,

    `${__dirname}/commands`,
  ];

  lesy({ commands }).parse();
  ```

To know more about formats, args, flags, context [check here](https://lesyjs.io/docs/core/commands)

<br/>

- #### Middlewares

  Middlewares are sort of hooks, you can plug a middleware at multiple stages of the flow. This way you can add, change and manipulate the flow.

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

  To know more about hook points, async middlewares, parsing, context [check here](https://lesyjs.io/docs/core/middlewares)

  <br/>

- #### Features

  Features are simple object, which are accesible in both commands and middlewares. It is super useful if you are dealing with third party libraries and want to share with all commands and middlewares.

  ```js
  const lesy = require("@lesy/compiler");

  const commands = [
    { name: "hello", run: ({ feature }) => feature.sayHello() },
  ];
  const features = [
    (feature) => {
      feature.sayHello = () => console.log("hello");
    },
  ];

  lesy({ commands, features }).parse();
  ```

  To know more about features [check here](https://lesyjs.io/docs/core/features)

  <br/>

- #### Plugins

  Plugins are collection of commands, middlewares and features. Can be a local plugin or any lesy plugin that can be installed from npm. [learn more](https://lesyjs.io/docs/core/plugins)

  ```js
  const lesy = require("@lesy/compiler");

  const commands = [{ name: "hello", run: () => console.log("hello world") }];
  const plugins = [`${dirname}/plugins/my-custom-plugin`];

  lesy({ commands, plugins }).parse();
  ```

  <br/>

- #### Even more

  To learn about global configuration, validators, testbed, performance [check the documentation](https://lesyjs.io/docs/get-started/overview)

<br/>

## Available Plugins

- [**UI Pilot**](https://lesyjs.io/docs/plugins/pilot-ui)<br/>
  _Run commands in Web UI. Supports input, console, workspace and more..._
- [**Store**](https://lesyjs.io/docs/plugins/config-store)<br/>
  _Key-value storage in the system_
- [**Config reader**](https://lesyjs.io/docs/plugins/config-files)<br/>
  _Setup config files like myapp.config.json, myapp.config.yml, myapp.config.js_
- [**Scaffold generator**](https://lesyjs.io/docs/plugins/scaffold-generator)<br/>
  _Generate projects with handlebars templating_
- [**Prompt**](https://lesyjs.io/docs/plugins/prompt)<br/>
  _Wrapper around inquirer plugin for prompts and questions_
- [**Help**](https://lesyjs.io/docs/plugins/help)<br/>
  _Automatically generate beautiful help with sub commands support. Highly customizable_
- [**Arg validator**](https://lesyjs.io/docs/plugins/arg-validator)<br/>
  _Prompt if required args are not supplied_
  <br/> <br/>

## Contribution

Any kind of contibutions are welcome. :)

## Development

To run it in local, and to know in depth code login please [https://lesyjs.io/docs/dev/sample2](check here)

## License

MIT
