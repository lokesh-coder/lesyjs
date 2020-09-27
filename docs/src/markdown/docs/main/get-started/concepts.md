---
title: Concepts
path: /docs/get-started/concepts
icon: honour-fill
---

Lesy does too many things under the hood, but its core is very slim and has only one purpose. It is just to find the command and execute the `run` function. Everthing else is optional.

### Basic example

Create a `index.js` file under `my-cli` directory and install `npm i @lesy/compiler`. Then paste the below code.

```js
const lesy = require("@lesy/compiler");
const commands = [{ run: () => console.log("hello") }];
lesy({ commands }).parse();
```

Now get it to `my-cli` directory in the terminal and run this `node index.js`. We dont need to mention `name` property in the command if it is a default command. You will see `hello` as the response.

This is very basic example to demonstrate how simple lesy is.

### Properties

`lesy` function accepts a object with bunch of properties. Everything is optional. But without commands it is meaningless right? Here's are acceptable properties.

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

#### commands

Commands can be a `object`, `function`, or `class`. Also you can just provide a direct file name or directory to find commands automatically. [learn more](/docs/core/commands)

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

#### middlewares

Middlewares acts as hooks. If you want to execute or change a data in the flow, you can use middlewares. [learn more](/docs/core/middlewares)

```js
const lesy = require("@lesy/compiler");
const middlewares = [
  // object
  {
    on: "START",
    run: (ctx) => {
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

#### features

Features are simple object that can be used globally in any commands and middlewares. [learn more](/docs/core/features)

```js
const lesy = require("@lesy/compiler");
const features = [
  // plain function
  (feature) => {
    feature.greet = () => console.log("hello");
  },

  // filepath
  `${__dirname}/path/to/feature.js`,

  // features directory
  `${__dirname}/features/`,
];
lesy({ features }).parse();
```

We can use the feature like,

```js
const lesy = require("@lesy/compiler");
const features = [
  (feature) => {
    feature.greet = () => console.log("hello");
  },
];
const commands = [{ run: ({ feature }) => feature.greet() }];
lesy({ features, commands }).parse();
```

#### config

Global configuration object. We can access it in both commands and middlewares. [learn more](/docs/core/config)

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

#### validators

For custom argument validation, we can supply custom logic. [learn more](/docs/library/helpers)

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

```bash
$ node index.js greet john
```

#### srcFilePath

We can either supply **commands**, **middlewares**, **features**, **validators**,**config**, **plugins** directly or you have export it in different file.

```js
const lesy = require("@lesy/compiler");
const srcFilePath = `${__dirname}/src/index.js`;
lesy({ srcFilePath }).parse();
```

in `my-cli/src/index.js` file, you can export all props.

```js
const commands = [{ run: () => console.log("hello") }];
export { commands };
```

#### root

In case you place the above properties in different location, set root.

```js
const path = require("path");
const lesy = require("@lesy/compiler");

const root = path.resolve(__dirname, "../");
const srcFilePath = `src/index.js`;

lesy({ root, srcFilePath }).parse();
```

#### isTypescriptApp

If it is a typescript project, we can set this to true. Lesy internally execute the typescript files with `ts-node`

```js
const path = require("path");
const lesy = require("@lesy/compiler");

const isTypescriptApp = true;
const root = path.resolve(__dirname, "../");
const srcFilePath = `src/index.ts`;

lesy({ isTypescriptApp, root, srcFilePath }).parse();
```

> We can set either **srcFilePath** or supply commands, middlewares, config, plugins, validators directly. But both cannot exists together.

#### loadDefaultPlugins

By default lesy loads [sidekick](/docs/plugins/sidekick) plugin. May be more in future. If you dont want that, you can just set this flag to false.

#### tsFlag

Default value is `--ts`.

When you are working on a typescript project, you will build the code to JS files at some point. At that time, your project will have both typescript files and JS files. Whenever lesy finds JS files, it will execute _.js files instead of _.ts files. In those time, you can use this flag to run \*.ts files.

```js
const path = require("path");
const lesy = require("@lesy/compiler");

lesy({
  isTypescriptApp: true,
  tsFlag: "--only-ts",
  root: path.resolve(__dirname, "../"),
}).parse();
```

```bash
> ./bin/cmd greet --only-ts
```

#### customTsConfig

Set custom tsconfig json file. Mostly you might not need this.

### Parsing

By default lesy looks for `process.argv` for args. But if can also supply them manually.

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

`parse` returns a promise after execution. But we can also get control of lesy core class by setting `global["lesyWorkspace"]` to true.

```js
const lesy = require("@lesy/compiler");
global["lesyWorkspace"] = true;

const commands = [{ run: () => console.log(`hello`) }];
const lesyCore = lesy({ commands }).parse();
console.log(lesyCore);
```

Above code wont execute the command but instead return `LesyCore` class instance.
