---
title: "Overview"
icon: "user-smile-fill"
---

Lesy does lot of things under the hood, but its core is very slim and has only one purpose. It is just to find the command and execute the `run` function. Everthing else is optional.

## Basic example

Lesy provides simpler API to create a awesome command line apps. Here's how the code looks for a simple `hello` command.

```js
const lesy = require("@lesy/compiler");
const commands = [{ run: () => console.log("hello") }];
lesy({ commands }).parse();
```

There are three key things to understand in the above code to understand the concepts better.

- lesy **compiler** module - `@lesy/compiler`
- lesy **options** and config - `lesy(options)`
- lesy **parser** function - `.parse()`

## Lesy compiler

`@lesy/compiler` is the core module, which assembles all the core and plugin components under the hood. Here's the few things it does:

<br/>

- If it is typescript project, loads `ts-node` module to run `*.ts` files
- If `src` file option is provided, loads all files provided and pass to core
- Runs code module and pass args provided in `.parse(args)`
- Loads default plugins
- Sets default config
- If global workspace value is set, it just returns core promise.

## Options and configuration

lesy ` compiler` function accepts a object with bunch of properties. **Everything is optional**. But without any commands, lesy doesn't make any sense :). Here is the acceptable properties.

```js
const lesy = require("@lesy/compiler");
lesy({
    root: "",
    srcFilePath: "",
    isTypescriptApp: false,
    loadDefaultPlugins: true,
    tsFlag: "--ts",
    customTsConfig: null,
    commands: [...],
    middlewares: [...],
    features: [...],
    plugins: [...],
    validators: [...]
    config: {...},
}).parse();
```

### **commands**: `Array<Command>`

Command can be an `object`, `function`, or `class`. Also you can just provide a direct file name or directory to find commands automatically. [learn more](http://localhost:8000/docs/core/commands)

```js
const lesy = require("@lesy/compiler");
const commands = [
  // default command
  { run: () => console.log("hello") },

  // named command
  { name: "greet", run: () => console.log("hello") },

  // function command
  function greet(cmd) {
    cmd.name = "greet";
    cmd.run = () => console.log("hello");
  },

  // class command
  class Greet {
    name = "greet";
    run() {
      console.log("hello");
    }
  },

  // path to command file
  `${__dirname}/path/to/greet.js`,

  // path to commands directory
  `${__dirname}/commands/`,
];
lesy({ commands }).parse();
```

### **middlewares**: `Array<Middleware>`

Middlewares are simple functions which will be executed during the lifecyle of an command. With this, you will be able to add new functionality, tweak and change the entire behaviour of the command at any point of the flow. . [learn more](http://localhost:8000/docs/core/middlewares)

```js
const lesy = require("@lesy/compiler");
const middlewares = [
  // object
  {
    on: "START",
    run: ctx => {
      console.log("hello");
      return ctx;
    },
  },

  // filepath
  `${__dirname}/path/to/middleware.js`,

  // middleware directory
  `${__dirname}/middlewares/`,
];
lesy({ middlewares }).parse();
```

### **toolkit**: `Array<Function>`

Toolkit is a simple object that can be used to get or set value globally in commands and middlewares. [learn more](http://localhost:8000/docs/core/features)

```js
const lesy = require("@lesy/compiler");
const tools = [
  // plain function
  tool => {
    tool.greet = () => console.log("hello");
  },

  // filepath
  `${__dirname}/path/to/tool.js`,

  // features directory
  `${__dirname}/tools/`,
];
lesy({ features }).parse();
```

We can use the toolkit like,

```js
const lesy = require("@lesy/compiler");
const tools = [
  tool => {
    tool.greet = () => console.log("hello");
  },
];
const commands = [{ run: ({ tool }) => tool.greet() }];
lesy({ features, commands }).parse();
```

### **config**: `Object`

Global configuration object. We can access it in both commands and middlewares. [learn more](http://localhost:8000/docs/core/config)

```js
const lesy = require("@lesy/compiler");
const config = {
  username: "bravo",
};
const commands = [
  { run: ({ config }) => console.log(`hello ${config.username}`) },
];
lesy({ config, commands }).parse();
```

### **validators**: `Array<Object>`

For custom argument validation, we can supply custom logic. [learn more](http://localhost:8000/docs/library/helpers)

```js
const lesy = require("@lesy/compiler");
const validators = [
  {
    name: "enum",
    fn: (value, rule) => rule.includes(value),
  },
];
const commands = [
  {
    name: "greet",
    args: {
      user: {
        enum: ["john", "jane"],
      },
    },
    run: ({ args }) => console.log(`hello ${args.user}`),
  },
];
lesy({ validators, commands }).parse();
```

Once you defined the validators, we can use it in any args for validation. In the above example, only `john` or `jane` is accepted as a valid input name for user arg.

```shell
node index.js greet jake # throws validation error
```

### **plugins**: `Array<Plugin>`

Plugin is simply a group of commands, middlewares and tools. You can provide either a local plugin or lesy plugin from npm.

```js
const lesy = require("@lesy/compiler");
const plugins = [
  '@lesy/lesy-plugin-piot', // installed plugin module
  './src/plugins/my-plugin', // local plugin
  ['./src/plugins/my-plugin',options] // plugin options
];
const commands = [...];
lesy({ plugins, commands }).parse();
```

### **srcFilePath**: `String`

This option allows you to set a main file, where all components are exported. You can export only **commands**, **middlewares**, **tools**, **validators**, **config**, and **plugins**. This is extremely helpful for testing, maintainability, and organizing.

```js
const lesy = require("@lesy/compiler");
const srcFilePath = `${__dirname}/src/index.js`;
lesy({ srcFilePath }).parse();
```

in `./src/index.js` file, you can export all components.

```js
const commands = [{ run: () => console.log("hello") }];
const middlewares = [...];
const toolkits = [...];
const plugins = [...];
const config = {...};
export { commands, middlewares, toolkits, plugins, config };
```

> You can set either `srcFilePath` or supply commands, middlewares, config, plugins, validators options directly. But you cannot mix them.

### **root**: `String`

If you use `srcFilePath` option, use this option to set a project root directory.

```js
const path = require("path");
const lesy = require("@lesy/compiler");

const root = path.resolve(__dirname, "../");
const srcFilePath = `src/index.js`;

lesy({ root, srcFilePath }).parse();
```

### **isTypescriptApp**: `Boolean`

If it is a typescript project, you can set this to `true`. Lesy compiler internally runs the typescript files with `ts-node`

```js
const path = require("path");
const lesy = require("@lesy/compiler");

const isTypescriptApp = true;
const root = path.resolve(__dirname, "../");
const srcFilePath = `src/index.ts`;

lesy({ isTypescriptApp, root, srcFilePath }).parse();
```

### **loadDefaultPlugins**: `Boolean`

By default lesy loads [sidekick](http://localhost:8000/docs/plugins/sidekick) plugin. May be more in future. If you dont want that, you can just set this flag to false.

### **tsFlag**: `String`

Default value is `--ts`.

When you are working on a typescript project, you will build the code to JS files at some point. At that time, your project will have both typescript files and JS files. Whenever lesy finds JS files in dist directory, it will execute _.js files instead of_ .ts files. In those time, you can use this flag to run \*.ts files.

```js
const path = require("path");
const lesy = require("@lesy/compiler");
const options = {
  isTypescriptApp: true,
  tsFlag: "--only-ts",
  root: path.resolve(__dirname, "../"),
};

lesy(options).parse();
```

```shell
./bin/cmd greet --only-ts
```

### **customTsConfig**: `String`

Set custom `tsconfig.json` file. Mostly you might not need this.

## Parsing

By default lesy looks for `process.argv` for parsing. But you can also override this behaviour by supplying them manually.

```js
const lesy = require("@lesy/compiler");
const commands = [
  {
    name: "greet",
    flags: { age: {} },
    run: ({ flags }) => console.log(`you are ${flags.age} years old`),
  },
];
lesy({ commands }).parse(["greet", "--age", "27"]);
```

`parse` returns a `Promise` after execution. But you can also get control of lesy core class by setting `global["lesyWorkspace"]` to true.

```js
const lesy = require("@lesy/compiler");
global["lesyWorkspace"] = true;

const commands = [{ run: () => console.log(`hello`) }];
const lesyCore = lesy({ commands }).parse();
console.log(lesyCore);
```

Above code wont execute the command but instead return `LesyCore` class instance.
