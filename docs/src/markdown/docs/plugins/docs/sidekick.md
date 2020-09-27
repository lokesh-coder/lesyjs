---
title: Sidekick
path: /docs/plugins/sidekick
icon: rocket-fill
---

**@lesy/lesy-plugin-sidekick** is a inbuild plugin helps you to,

- Load package json file
- Allows `--version` flag globally
- Dsiplay any exceptions thrown inside any commands

### Usage

```typescript
// in any command or middleware context
export default {
  name: "pkginfo",
  run: ({ feature }) => {
    console.log(feature.pkg);
  },
};
```

### Disable plugin

```js
const path = require("path");
const lesy = require("@lesy/compiler");

lesy({
  isTypescriptApp: true,
  loadDefaultPlugins: false,
  root: path.resolve(__dirname, "../"),
}).parse();
```
