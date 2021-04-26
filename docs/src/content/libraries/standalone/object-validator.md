---
title: "Object Validator"
icon: settings-fill
summary: ""
---

**@lesy/validator** is a tiny package for object validation. It is internally used by `@lesy/core` to check the user supplied argument values matches the command argument schema.

It is a generic package, which can also be used outside of lesy framework. Let's see how to use this in any project.

There are 3 things involved in this.

- **Rules** - Different criteria to test the object
- **Schema** - Defines what rules applicable to which property
- **Value** - It is the test object

## Create Validator

### Write a rule

```js
const enumRule = (value, rule) => {
  return rule.includes(value);
};
```

In this `rule` is the data that is set in the object schema and `value` is the user provided value for a property.

You can also return a promise inside a rule.

```js
const enumRule = (value, rule) => {
  return Promise.resolve(rule.includes(value));
};
```

> A rule function must return a boolean value or a Promise of boolean.

### Define Schema

```js
const objectSchema = {
  name: { enum: ["hello", "world"] },
};
```

### Validate object

```js
const { LesyValidator } = require("@lesy/validator");

const validator = new LesyValidator(objectSchema);
validator.register("enum", enumRule);
const results = validator.validate({ name: "hello" });
```

Output will looks like this,

```js
{error: null, name: "name", passed: "hello"} // passed
{error: "<enum> validation failed for [name]"} // failed
```

You can set a custom error message in schema, like

```js
const objectSchema = {
  name: {
    enum: ["hello", "world"],
    enumError: "name property accepts either hello or world.",
  },
};
```

## Example usage

```js
// import module
const { LesyValidator } = require("@lesy/validator");

// create a rule
const enumRule = (value, rule) => {
  return rule.includes(value);
};

// define schema
const objectSchema = {
  name: {
    enum: ["John", "Jane"],
    // enumError:'Validation failed' // optional
  },
};

// instantiate the Validator class
const validator = new LesyValidator(objectSchema);
validator.register("enum", enumRule);

// check the object
const results = validator.validate({ name: "Jim" });
```

## Playground

<iframe height="400px" width="100%" src="https://repl.it/@lokeshcoder/lesy-validator?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Check out the Validator [playground](https://repl.it/@lokeshcoder/lesy-validator)
