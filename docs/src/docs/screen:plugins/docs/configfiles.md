---
title: Config files
path: /docs/plugins/config-files
icon: file-settings-fill
---

**@lesy/lesy-plugin-config** plugin extends the support for config by allowing own customized `json`, `yaml`, `js` files in the project root.

### Installation

```shell
$ npm install @lesy/lesy-plugin-config
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-config']
}
```

### Usage

#### Step 1: Create config file in the project root

```json
/// path/to/project/myapp.json
{
  "appName": "MySuperApp"
}
```

#### Step 2: Get the config in command or middleware

```typescript
export default {
  name: "hello",
  run: ({ config }) => {
    console.log(config.appName);
  },
};
```

### Options

By default this plugins picks up config file that is named same as your project directory name. For example, if your root directory is `myapp`, then the plugins looks for `myapp.json`, `myapp.yml`, `myapp.config.js`. But you can override this behaviour by providing the file name in plugin options.

```typescript
export default {
    commands:[...],
    plugins:[['@lesy/lesy-plugin-config',{name:'mysupercoolapp'}]]
}
```
