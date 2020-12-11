---
title: Installation
path: /docs/get-started/installation
icon: folder-download-fill
---

Setting up Lesy is pretty simple and straightforward. And there are two ways to do that. Use **Lesy CLI** or do it manually.

### Scaffold project with CLI

One easy way is using `npx` to generate project boilerplate with one command.

```shell
npx lesy new my-cli
```

Alternatively you can install **Lesy** globally with `npm` or `yarn`.

```shell
#using npm
npm install --global lesy

#using yarn
yarn global lesy
```

Then, generate boilerplate with the below command,

```shell
lesy my-cli
```

This will ask you few questions like, is it typescript project, install pilot. If you want to skip them and use recommended setting, use flag `--yes`.

```shell
# with npx
npx lesy new my-cli --yes

# with global lesy
lesy new my-cli --yes
```

### Project structure

Here's how the project structure look like, after the project is created

```
my-cli
├── tests
│   ├── hello.command.integration.test.js
│   └── hello.command.test.js
├── bin
│   └── cmd
├── src
│   ├── commands
│   │   ├── default.js
│   │   └── hello.js
│   └── index.js
└── package.json
```

### Manual setup

If you are creating a simple CLI project and dont want too many directories, then its pretty simple.

**Step 1**: Create new node project:

```shell
npm init my-cli --yes
```

**Step 2**: Get inside to your project directory and install `@lesy/compiler` with `npm` or `yarn`

```shell
cd my-cli
npm install @lesy/compiler
```

**Step 3**: Create main `index.(js|ts)` file

```js
#!/usr/bin/env node

const lesy = require("@lesy/compiler");
const commands = [{ name: "hello", run: () => console.log("hello world") }];

lesy({ commands }).parse();
```

**Step 4**: Update bin property in `package.json` file

```json
{
  "name": "my-cli",
  "bin": {
    "mycli": "index.js"
  }
}
```

its done!
