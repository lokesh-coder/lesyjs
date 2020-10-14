---
title: Scaffold generator
path: /docs/plugins/scaffold-generator
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
  run: async ({ feature: { generateFiles } }) => {
    await generateFiles({
      source: `${__dirname}/templates`,
      destination: `${process.cwd}/projects/`,
      data: {
        filename: "welcome",
        name: "Scooby Doo",
      },
    });
  },
};
```

#### Step 2: Create source templates

```html
<!-- path/to/templates/{{filename}}.html -->
<h1>Hello {{name}}</h1>
```

#### Step 3: Run command to generate files

```shell
./bin/cmd generate
```

This command will create a files in the destination folder. And the output file looks like,

```html
<!-- path/to/estination/welcome.html -->
<h1>Hello Scooby Doo</h1>
```

### Options

Once the plugin is installed and added to the index file, we can access the `generator` function from the `feature` property. It has only one method named `create`, which accepts the following options.

#### source

The source path for the templates. Should be an absolute path.

#### destination

The destination path for the compiled files.Should be an absolute path.

#### data

We can pass the dynamic data to the templates using the `data` option. It is a plain object. All the keys will be replaced with the values in the template files.

#### handlebarsInstance

If you wish to register any handlebars helpers or partials, you can get the instance from this function property.

#### handebarsOptions

You can pass handlebars options using this property.

### Templating

Templates are parsed using [Handlebars](https://handlebarsjs.com/guide/). This plugin comes with a built-in case helper. In the template we can use,

```html
<h1>Hello {{uppercase name}}</h1>
```

supported helpers:

** uppercase** &middot; ** lowercase** &middot; ** capitalcase** &middot; ** snakecase** &middot; ** pascalcase** &middot; ** camelcase** &middot; ** headercase** &middot; ** constantcase** &middot; ** titlecase**
