---
title: Features
icon: water-flash-fill
summary: Features are simple object which can be used to add functionalities and use them across commands and middlewares.
---

## Creating a feature

```js
// sayhello.feature.js
module.exports = function (feature) {
  feature.sayHello = () => console.log("hello");
};
```

### Declare features

Once you created add it in index file,

```js
const commands = [`${__dirname}/hello.command.js`];
const features = [`${__dirname}/sayhello.feature.js`];

module.exports = { commands, features };
```

### Use features

Then it can be accesses in command,

```js
module.export = {
  name: "hello",
  run: ctx => {
    ctx.features.sayHello();
  },
};
```

## Performance

Always consider adding as property function. So that it can be lazily loaded. For instance if you want to include thir party module,

```js
module.exports = function (feature) {
  feature.sayHello = () => {
    const Case = require("case");
    console.log(Case.pascal("hello"));
  };
};
```
