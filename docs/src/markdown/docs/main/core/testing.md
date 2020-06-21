---
title: Testing
path: /docs/core/testing
icon: bug-fill
---

Lesy ships with `Jest` and own testing tool `@lesy/testbed` for integration test. Generally commands, middlewares, features can be tested independently with Jest. But however, to test them with the app or to test a plugin **testbed** can be used

```js
import { resolve } from "path";
import { LesyTestBed } from "@lesy/testbed";

describe("CLI", () => {
  let testBed;

  beforeEach(() => {
    testBed = new LesyTestBed({
      root: resolve(__dirname, "./"),
      commands: [
        `/src/commands/default.command.ts`,
        {
          name: "hello",
          run: () => {
            console.log("hello yoyo!");
          },
        },
      ],
    });
  });

  it("should log proper outout", async () => {
    let response = await testBed.run(["hello"]);
    expect(response).toContain("hello yoyo!");
  });
});
```
