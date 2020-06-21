---
title: Configuration
path: /docs/core/config
icon: settings-3-fill
---

In main index.ts file you can add a config object, which will be avilable in commands and middlewares.

```typescript
const commands = [...];
const middlewares = [...];
const config = {
    name: "Peter"
}

export { commands, middlewares,config };
```

In any command or middleware, run context will have a config property

```typescript
export default {
  name: "hello",
  run: ({ config }) => {
    console.log(config.name);
  },
};
```

### Advanced config

- `@lesy/lesy-plugin-config` plugin will extend this feature to support load config from **yaml** **json** **rc** files.
- `@lesy/lesy-plugin-store` plugin will store config or any data in system.
