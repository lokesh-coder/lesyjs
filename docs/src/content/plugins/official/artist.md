---
title: "Artist"
icon: paint-brush-fill
---

**@lesy/lesy-plugin-artist** is the wrapper of Lesy's [Artist UI](/libraries/standalone/artist-UI) library.

## Installation

```shell
npm install @lesy/lesy-plugin-artist # or
yarn add @lesy/lesy-plugin-artist
```

Then add it to plugins array in main `index` file

```js
export default {
  commands: [`${__dirname}/commands`],
  plugins: ["@lesy/lesy-plugin-artist"],
};
```

## Usage

Generally, lesy finds `run` function in the command and executes. But, Artist plugin overrides that, and runs the `render` function. The context data of the render function is same and additionally you will be able to access the `store`. Apart from that, `onInit` will be executed before render if it is defined. The API is same as the Artist library.

```js
// hello command
export default {
  name: "hello",
  onInit: (store, timer) => {
    timer(() => (store.count += 1), 1000, "my-key");
  },
  render: ({ store }) => {
    return `<div>Counter: ${store.count}</div>`;
  },
};
```

## Plugins

You can add plugins to Artist plugin by providing in the config

```js
export default {
  commands: [`${__dirname}/commands`],
  plugins: [
    [
      "@lesy/lesy-plugin-artist",
      { plugins: [`${__dirname}/src/my-artist-elements-plugin`] },
    ],
  ],
};
```

## Learn more

- Read about [Artist UI](/libraries/standalone/artist-UI) API and elements
- [Commands context](/docs/components/commands/#run-context) data
