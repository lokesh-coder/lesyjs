---
title: Testbed overview
icon: bug-fill
summary: Lesy ships own testing tool `@lesy/testbed` for unit and integration test.
---

Generally commands, middlewares, features can be tested independently with Jest. But however, to test them with the app or to test a plugin **testbed** can be used

```js
import { resolve } from "path";
import { LesyTestBed } from "@lesy/testbed";

describe("CLI", () => {
  let app;

  beforeEach(() => {
    app = new LesyTestBed({
      root: resolve(__dirname, "./"),
      commands: [
        `src/commands/default.command.ts`,
        {
          name: "hello",
          run: () => console.log("hello yoyo!"),
        },
      ],
    });
  });

  it("should log proper output", async () => {
    let response = await app.run(["hello"]);
    expect(response).toContain("hello yoyo!");
  });
});
```
