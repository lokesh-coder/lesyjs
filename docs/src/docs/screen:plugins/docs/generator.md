---
title: Scaffold generator
path: /plugins/scaffold-generator
icon: folder-add-fill
npm: https://www.npmjs.com/package/@lesy/lesy-plugin-generator
repo: https://github.com/lokesh-coder/lesy/tree/master/packages/plugins/lesy-plugin-generator
---

**@lesy/lesy-plugin-generator** plugin helps to generate files/ project boilerplate. By default this will be added in your app. But you can also install it manually.

### Installation

```shell
$ npm install @lesy/lesy-plugin-generator
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-generator']
}
```

### Usage

#### Step 1: Use it in command or middleware

```typescript
export default {
  name: "generate",
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

#### Step 2: Create source templates

```html
<!-- path/to/templates/welcome.html -->
<h1>Hello {{name}}</h1>
```

#### Step 3: Run command to generate files

```shell
./bin/cmd generate
```

This command will create a files in the destination folder. And the output file looks like,

```html
<!-- dpath/to/estination/welcome.html -->
<h1>Hello John</h1>
```

### Options

Once the plugin is installed and added to index file, we can access the `generator` function from the `features`. It has only one method called `create`, which accepts the following options.

#### `source`

The source path for the templates. Should be a absolute path.

#### `destination`

The destination path for the compiled files.Should be a absolute path.

#### `data`

We can pass the dynamic data to the templates using `data` option. It is a plain object. All the keys will be replaced with the value in the template files.

### Templating

Templates are parsed using [Handlebars](https://handlebarsjs.com/guide/). This plugin comes with a inbuild case change helper. In the template we can use,

```html
<h1>Hello {{name|uppercase}}</h1>
```

supports

- uppercase
- lowercase
- capitalcase
- snakecase
- pascalcase
- camelcase
- headercase
- constantcase
- titlecase
