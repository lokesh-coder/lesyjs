---
title: Overview
path: /docs/get-started/overview
icon: user-smile-fill
---

Lesy is just a simple lightweight CLI framework helps you to build modern and performant command line apps. Thats all!

Whether you are building a dead simple app or more advanced app, Lesy lets you to write less code and get more. Here's the sample code for classic Hello world example.

```js
#!/usr/bin/env node

const lesy = require("@lesy/compiler");
const commands = [{ run: () => console.log("hello world") }];

lesy({ commands }).parse();
```

### Why Lesy?

- **Language**: Full support for Typescript with @types
- **Flexibility**: Able to change complete behaviour with middlewares
- **Boilerplate**: Write less code. whether its a dead simple project or complex one.
- **Extensions**: Add cool functionalities with plugins
- **Platform**: Write once and run in CLI or UI
- **Performance**: It is just faster than existing libraries. Benchmark inside.
- **Testing**: Dedicated testing setup for unit test and integration test
- **Lot more**: Features, sub commands, existing plugins, boilerplate generator...

### Lesy playground

We have setup a _playground_ for you to play around with it.

[Pilot Playground](https://codesandbox.io/s/lesy-pilot-playground-hzjgw?fontsize=14&hidenavigation=1&view=preview)

### What is the meaning of Lesy?

Well, there is no specific meaning for Lesy. The whole project is build with the mindset of simple and easy. Whether it is a code or documentation or name or logo, everything should be simple. **Lesy** sounds cool and short.

Same way, it is not related to penguin logo. Penguin is cute right? Lets make that as a logo and name it Lesy!!

Give it a try, you will like Lesy!
