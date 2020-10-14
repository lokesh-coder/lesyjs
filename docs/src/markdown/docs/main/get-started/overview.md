---
title: Overview
path: /docs/get-started/overview
icon: user-smile-fill
---

Lesy is a **lightweight CLI framework** built with Node JS, which helps you to build modern and performant command-line apps.

Whether you are building a dead-simple or a complex app, Lesy lets you write less code and get more. Here's the sample code for the classic Hello world example.

```js
#!/usr/bin/env node

const lesy = require("@lesy/compiler");
const commands = [{ run: () => console.log("hello world") }];

lesy({ commands }).parse();
```

### Why Lesy?

- **Language**: Full support for Typescript with @types
- **Flexibility**: Able to change complete behavior with middlewares
- **Boilerplate**: Write less code.
- **Extensions**: Add cool functionalities with plugins
- **Platform**: Write once and run in CLI or UI
- **Performance**: It is just faster than existing libraries. Benchmark inside.
- **Testing**: Dedicated testing setup for unit test and integration test
- **Lot more**: Features, sub commands, existing plugins, boilerplate generator...

### Lesy playground

We have setup a _playground_ for you to play around with it.

[Pilot Playground](https://codesandbox.io/s/lesy-pilot-playground-hzjgw?fontsize=14&hidenavigation=1&view=preview)

### What is the meaning of Lesy?

Well, there is no specific meaning for Lesy. The whole project is built with the mindset of simplicity and maintainability. Thus each part of the project right from the name to code, everything is crafted carefully. **Lesy** sounds cool and short.

Same way, it is not related to the penguin. I just felt Penguin is cute and so made it as a logo.

Give it a try. You will like Lesy!
