---
title: Plugins
icon: plug-fill
---

Plugins are nothing but a group of **Commands**, **Middlewares**, **Features** and **Validators**. You can create your own plugins or use third party plugins from npm eco-system.

## Custom plugin

```js
// ./plugins/my-custom-plugin/index.js

module.exports = {
  commands: [`${__dirname}/command.js`],
  middlewares: [`${__dirname}/middleware.js`],
  features: [`${__dirname}/feature.js`],
};
```

```js
const commands = [...];
const plugins = [`${dirname}/plugins/my-custom-plugin`];

module.exports = { commands, plugins };
```

## Plugin configuration

```js
const commands = [...];
const plugins = [
    [`${dirname}/plugins/my-custom-plugin`,{name:'Peter'}]
];

module.exports = { commands, plugins };
```

```js
// ./plugins/my-custom-plugin/command.js

module.exports = {
  name: "my-command",
  run: ({ config }) => {
    const name = config[`${__dirname}/my-custom-plugin/index.js`];
  },
};
```

## Built-in plugins

## Browse all plugins
