---
title: Installation
path: /get-started/installation
icon: folder-download-fill
---

Setting up Lesy is pretty simple and straightforward.

### Generate project with CLI

One easy way is using `npx` to generate project boilerplate with one command.

```shell
npx lesy my-cli
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
npx lesy my-cli --yes

# with global lesy
lesy my-cli --yes
```

### Project structure

Here's how the project structure look like, after the project is generated

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

Actually manual set up is also easy.

**Step 1**: Create new node project:

```shell
npm init my-cli --yes
```

**Step 2**: Get inside to your project directory and install `@lesy/compiler` with `npm` or `yarn`.

```shell
cd my-cli
npm install @lesy/compiler
```

**Step 3**: Create `executable` bin file `my-cli/bin/cmd`

```js
#!/usr/bin/env node

const path = require("path");
const lesy = require("@lesy/compiler");

lesy({
  root: path.resolve(__dirname, "../"),
  commands:[...],
  /* ...other props */
}).parse();
```

**Step 4**: Update executable file name in `package.json` file

```json
{
  "name": "my-cli",
  "bin": {
    "mycli": "bin/cmd"
  }
}
```
