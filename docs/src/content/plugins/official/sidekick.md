---
title: "Sidekick"
icon: rocket-fill
summary: ""
---

**@lesy/lesy-plugin-sidekick** is a build-in plugin helps you to,

- Load package json file
- Allows `--version` flag globally
- Dsiplay any exceptions thrown inside any commands

## Usage

```typescript
// in any command or middleware context
export default {
  name: "pkginfo",
  run: ({ feature }) => {
    console.log(feature.pkg);
  },
};
```

## Disable plugin

```js
const path = require("path");
const lesy = require("@lesy/compiler");

lesy({
  isTypescriptApp: true,
  loadDefaultPlugins: false,
  root: path.resolve(__dirname, "../"),
}).parse();
```
