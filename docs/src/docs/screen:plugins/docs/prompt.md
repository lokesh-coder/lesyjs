---
title: Prompt
path: /docs/plugins/prompt
icon: questionnaire-fill
---

**@lesy/lesy-plugin-prompt** plugin helps to do interactive prompts. This is a wrapper of awesome [Inquirer](https://www.npmjs.com/package/inquirer) package. But however this plugin does few more cool things when combined with **middlewares** and **features**;

### Installation

```shell
$ npm install @lesy/lesy-plugin-prompt
```

Then add it to plugins array in main `index` file

```typescript
export default {
    commands:[...],
    plugins:['@lesy/lesy-plugin-prompt']
}
```

### Usage

```typescript
export default {
  name: "my-prompt-command",
  async run({ feature }) {
    const questions = [
      {
        name: "name",
        message: "Name of the user",
        type: "input",
      },
    ];
    const answers = await feature.prompt(questions);
    console.log(answers);
  },
};
```

To know more about the different type of prompt formats and validation, please check [Inquirer Question](https://www.npmjs.com/package/inquirer#questions) section.
