---
title: "Local store"
icon: database-2-fill
summary: ""
---

**@lesy/lesy-plugin-store** plugin helps to manage key-value config in the system.

## Installation

```shell
$ npm install @lesy/lesy-plugin-store
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-store']
}
```

## Usage

Once the plugin is installed, you can manange the store either via command or programatically.

### Store commands

This plugin adds few commands to the app. They looks like,

```shell
./bin/cmd store # list all key-value pairs
./bin/cmd store set name John # set new value
./bin/cmd store get name # get value
./bin/cmd store remove name # remove value
```

The command name `store` can be changed by setting new name in plugin options.

```typescript
export default {
    commands:[...],
    plugins:[['@lesy/lesy-plugin-store',{name:'config'}]]
}
```

then we should be able to do this,

```shell
./bin/cmd config set name John
```

### Manage programatically

```typescript
// in command or middleware
export default {
  name: "hello",
  run: ({ features: { store } }) => {
    console.log(store.get("keyname"));
  },
};
```
