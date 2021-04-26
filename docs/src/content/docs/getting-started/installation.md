---
title: Installation
icon: folder-download-fill
summary: ""
---

Setting up Lesy is pretty simple and straightforward. There are two ways to do that. Use **Lesy CLI** (recommended) or you can also setup manually.

## Scaffold using Lesy CLI

One easy way is to use `npx` to generate project boilerplate with one line command.

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
lesy new my-cli
```

This will prompt for few questions to choose flavour and plugins. If you want to skip them and use recommended setting, use flag `--yes`.

```shell
# with npx
npx lesy new my-cli --yes

# with global lesy
lesy new my-cli --yes
```

Once the command ran, it will generate new project, install all dependencies and display instructions on how to proceed further.

### Project structure

Here's how the project structure looks like, after the project is created

```text

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

### Run a command

Now you can open the terminal and run the `hello` command from the project directory.

```shell
./bin/cmd hello lesy
```

If you have already linked the bin file locally, you can run with your app command name.

```shell
my-cli hello lesy
```

### Testing a command

From your terminal, run below code to test the files.

```shell
npm test
```

### Building the project

This step is not needed for javascript project.

If you have chosen **typescript** flavor, you can compile and build the code using `build` command.

```shell
npm run build
```

Once you build the project, compiled files will be placed inside `./dist` directory. Now the source code will be in `./src` directory.

When you run `my-cli hello lesy` , lesy will execute from `dist` as you have already built the source. In some cases you want to run from `src` directory (`.ts` files), then append `--ts` flag in the command.

```shell
my-cli hello lesy --ts
```

Above code will run `.ts` files from `src` directory instead of `.js` files in dist directory.

## Manual setup

Setting up manually involves few steps and dont worry it is still easy.

### Create new project

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
    "mycli": "index.js" // or index.ts
  }
}
```

You can link your project locally using `npm link` and then run the command from the source directory in the terminal.

```shell
my-cli hello
```

### Typescript config

If you want to use typescript, install the dependency.

```shell
npm install typescript @types/node
```

Then create a `tsconfig.json` file in the project root and add this data.

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "noEmit": false,
    "importHelpers": false,
    "noImplicitAny": false,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules", "__tests__"],
  "compileOnSave": false
}
```

After this, add this line in the `package.json` scripts prop,

```json
{
  "name": "my-cli",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc --build tsconfig.json",
  },
  "bin": {...},
  "dependencies": {...},
  "devDependencies": {...},
}

```

Now you should be able to compile the typescript files by running `build` command.

```shell
npm run build
```

To toggle between source files and compiled files, please refer [Building the project]() section above.

### Test setup

If you have placed the commands, middlewares and toolkits in a separate files, then testing them is simpler.

Install [jest]() module dependencies.

```shell
npm install @lesy/testbed jest ts-jest @types/jest
```

and then create a `./jest.config.js` file in the root directory. Add these data in that file.

```json
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["./src"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "types"],
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json",
      diagnostics: false
    }
  },
  preset: "ts-jest",
  resetModules: true,
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/fixtures/",
    "types"
  ],
  verbose: true
};
```

You can ignore typescript related settings if you are using javascript falvour.

Create a test file, `./__tests__/hello.test.(js|ts)`

```js
const { resolve } = require("path");
const { LesyTestBed } = require("@lesy/testbed");
const HelloCommand = require("../src/hello");

describe("Hello - Integration test", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: false,
      root: resolve(__dirname, "./"),
      commands: [HelloCommand],
    });
  });
  it("should return proper response", async () => {
    let response = await testBed.run(["hello"]);
    expect(response).toContain("Hello Stranger!");
  });
});

describe("Hello - Unit test", () => {
  let consoleLogMock;
  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
  });

  it("should return proper response", async () => {
    HelloCommand.run({ args: { name: "foo" } });
    expect(consoleLogMock).toBeCalledWith("Hello foo!");
  });
});
```

Now run the test,

```shell
npm run test
```

## Troubleshooting

This section will be updated if any issues reported by the community. As of now, installation should work as expected. :)

## Help

If you face any issues during the installation process, please [report]() it in the repo issues tracker.
