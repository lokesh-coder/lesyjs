---
title: "#7 · Testing todos"
icon: bug-fill
summary: ""
---

While you are generating the project, lesy installs [Jest]() testing library and `@lesy/testbed` library to do unit test and integration test. As our commands are in object, tessting with jest should be straight forward like any other tests we write for our apps. But Sometime you wanted to make sure the commands and other components works together as expected. For that pupose, Lesy provides a `Testbed` to test the complete application with all components.

## Introduction to Testbed

Testbed is a tiny wrapper around lesy core to help with integration test.

## Add unit test

For this tutorial, we will see how to test the `list` command in unit level.

Create a test file `./__tests__/list.command.test.js`, and paste the below content.

```js
const ListCommand = require("../src/commands/list");

describe("List command", () => {
  let consoleLogMock;
  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementationOnce();
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
  });

  it("should display all todo items", async () => {
    const dbMock = jest.fn().mockImplementation(() => {
      return {
        db: { all: () => [{ id: 123, todo: "buy milk", status: "done" }] },
      };
    });
    const feature = { db: dbMock };
    ListCommand.run({ feature });
    expect(consoleLogMock).toBeCalledWith("123: buy milk [done]");
  });
});
```

In above code, we are mocking `console.log` to capture the output for each test. And then within the test block, we mock the database list method to return custom response.

On calling the `list` run command we capture the mock db response and test the output.

## Add integration test

In the unit level test, we have tested only the `run` function, by providing the mock arguments manually. But In some cases we might wanted to test the whole features of command including args, flags, middlewares, basically everything. In those scenarios, we can use testbed.

Now let's create another file, `./__tests__/list.command.integration.test.js`, and paste the below content.

```js
const { resolve } = require("path");
const { LesyTestBed } = require("@lesy/testbed");
const ListCommand = require("../src/commands/list");
const dbFeature = require("../src/db.feature.js");

describe("List command", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: false,
      root: resolve(__dirname, "./"),
      commands: [ListCommand],
      features: [dbFeature],
    });
  });
  it("should add todo item", async () => {
    let response = await testBed.run(["add", "buy milk"]);
    expect(response).toContain("todo item added. ID:");
  });

  it("should list all todos", async () => {
    let response = await testBed.run(["list"]);
    expect(response).toContain("buy milk [pending]");
  });
});
```

In the above example, we initialise the testbed with the same props that we use for lesy compiler options. `testbed.run(args)` is the command line arguments.

## Recap

- Unit tests are ran by jest independently
- Integration/app level tests are handled by Testbed

## Learn more

- [Testbed]() API documentation
- [Testing setup]() instructions
