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

### Features

- **Language**&#8192;&#8192;&#8192;&#8192; - _Javascript and Typescript with @types_
- **Flexibility**&#8192;&#8192;&#8192;&#8192; - _Able to change complete flow with middlewares_
- **Boilerplate**&#8192;&#8192;&#8192; - _Write less code. whether it's a dead simple project or complex one_
- **Extensions**&#8192;&#8192;&#8192; - _Add cool functionalities with plugins_
- **Platform**&#8192;&#8192;&#8192;&#8192;&#8192; - _Write once and run in CLI or web UI. Desktop interface is coming soon_
- **Performance**&#8192; - _It is faster than existing tools. Benchmarks inside_
- **Testing**&#8192;&#8192;&#8192;&#8192;&#8192;&#8192; - _Dedicated testing setup for unit test and integration test_
- **Lot more**&#8192;&#8192;&#8192;&#8192;&#8192; - _Features, sub-commands, boilerplate generator..._
  <br/> <br/>

### Installation

Scaffold new project directly using npx command

```shell
> npx lesy new my-cli
```

Or, you can install lesy cli globally and generate a new project

```shell
> npm i -g lesy
> lesy new my-cli
```

<br/> <br/>

[![asciicast](https://asciinema.org/a/cByzQns8RTNs5I117XolHSgAt.svg)](https://asciinema.org/a/cByzQns8RTNs5I117XolHSgAt)

Also you can create your own project setup and run lesy. [Learn more]().
<br/> <br/>

### Basic Example

```js
#!/usr/bin/env node

const lesy = require("@lesy/compiler");
const commands = [{ name: "hello", run: () => console.log("hello world") }];

lesy({ commands }).parse();
```

```shell
./cmd hello
```

It is just a tiny bit of lesy. There are lot of other cool stuffs like, advance commands, middlewares, features, configs, and plugins. [Learn more]()
<br/> <br/>

### Plugins

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

  ### License

  MIT

<!-- logo
headline
buttons
docs link block
intro
pilot
installation
basic example
features
plugins
contribution
dev docs
license -->
