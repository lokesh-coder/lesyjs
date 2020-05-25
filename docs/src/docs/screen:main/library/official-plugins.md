---
title: Official plugins
path: /library/official-plugins
icon: exchange-box-fill
---

### Official Plugins

There were around 7 official plugins at this moment. Sooner this section will be updated with community plugins as well.

- Scaffold Generator

  It helps to generate files/ project boilerplate. :icon-ri-star-line Configurable and flexible.

  [docs](https://foo) | [npm](https://foo) | [23 downloads :icon-ri-star-line](https://foo)
  :icon-ri-star-line

- Promopter
- Automatic help
- File configuration
- Storage command and helper
- Pilot UI dashboard
- Arguments Validator

### Community Plugins

There is no plugins at this moment. Check back later.

### Scaffold Generator

This plugin helps to generate files/ project boilerplate. By default this will be added in your app. But you can also install it manually.

#### Step 1: Installation

```shell
$ npm install @termo/termo-plugin-generator
```

#### Step 2: Add to plugins array

```typescript
export default {
    commands:[...],
    plugins:['@termo/termo-plugin-generator']
}
```

#### Step 3: Use it in command or middleware

```typescript
export default {
  name: "hello",
  run: async ({ features: { generator } }) => {
    await generator().create({
      destination: `${process.cwd}/projects/`,
      source: `${__dirname}/templates`,
      data: {
        name: "John",
      },
    });
  },
};
```

### Promopter

### Automatic help

### File configuration

### Storage command and helper

### Pilot UI dashboard

### Arguments Validator
