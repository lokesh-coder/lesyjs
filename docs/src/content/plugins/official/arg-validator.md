---
title: "Arg validator"
icon: shield-keyhole-fill
summary: ""
---

**@lesy/lesy-plugin-validator** plugin helps to prompt for required argument if it is not filled.

## Installation

```shell
$ npm install @lesy/lesy-plugin-validator
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-prompt','@lesy/lesy-plugin-validator']
}
```

> This plugin depends on prompt plugin. Please install and add `@lesy/lesy-plugin-prompt` as well.

## Usage

Once you have added this plugin, it will automatically prompt for required arguements if it is not supplied.
