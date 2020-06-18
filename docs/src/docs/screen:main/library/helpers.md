---
title: Helpers
path: /docs/library/helpers
icon: settings-fill
---

**@lesy/validator** is a tiny package for object validation. It is internally used inside `@lesy/core` to check the user supplied argument values matches the command argument schema.

It is a generic package, which can also be used outside of lesy framework. Let's see how to use this in any project.

There are 3 things involved in this.

- Rules - Different criteria to test the object
- Schema - Defines what rules applicable to which property
- Value - It is the test object

### Step 1: Create a rule

```js
const enumRule = (value, rule) => {
  return rule.includes(value);
};
```

### Step 2: Define Schema

```js
const objectSchema = {
  name: { enum: ["hello", "world"] },
};
```

### Step 3: Validate object

```js
const validator = new LesyValidator(objectSchema);
validator.register("enum", enumRule);
const results = validator.validate({ name: "hello" });
```
