---
title: Arg validator
path: /plugins/arg-validator
icon: shield-keyhole-fill
---

**@lesy/lesy-plugin-validator** plugin helps to prompt for required argument if it is not filled.

### Installation

```shell
$ npm install @lesy/lesy-plugin-validator
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-validator']
}
```

### Usage

Actually there is nothing you have to do. Once you have added this plugin, it will automatically prompt for required arguements if it is not supplied.
