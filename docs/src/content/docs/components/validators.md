---
title: "Validators"
icon: "settings-6-fill"
---

Validators are plain object with a `name` and rule function (`fn`) used to validate schema against user supplied value. Once added they can be attached to any arguments in any commands across the application, including plugins.

## Basic structure

Validator object must have `name` and `fn` properties. **name** is a simple string, which will be used in arguments in a command. **fn** is a function which will have `value` and `rule` parameters.

- `value` - is the string that user supplied for an argument
- `rule` - is the input criteria to the validator

```js
{
  name: "enum",
  fn: (value, rule) => rule.includes(value),
};
```

## Create validator

In the main `index` file, you can add validators in the export object along with other components. Once added, these validators will be available to all commands.

```js
// ./src/index.(js|ts)
export default {
  commands: [...],
  validators: [
    {
      name: "enum",
      fn: (value, rule) => rule.includes(value),
    },
  ],
};
```

## Attach to arguments

Lets consider we have a `greet` command and has `name` argument. To make it mandatory, you can add a pre-defined validator named `required`. Along with that now you can add `enum` validator and supply valid names.

```js
// command
export default {
  name: "greet",
  args: {
    name: {
      required: true,
      enum: ["john", "jane"],
    },
  },
  run: ({ args }) => console.log(`hello ${args.name}!`),
};
```

When you run the command with invalid arg, you will see a error message.

```shell
> ./bin/cmd greet john # hello john!
> ./bin/cmd greet peter # <enum> validation failed for [name]`
```

## Custom error message

To set a custom error message, you can add property named like `<rule>Error` . For `enum` rule, the property name looks like `enumError`. This is similar to `requiredError` and `sizeError` .

```js
export default {
  name: "greet",
  args: {
    name: {
      required: true,
      enum: ["john", "jane"],
      enumError: "Name can either be 'john' or 'jane'!",
    },
  },
  run: ({ args }) => console.log(`hello ${args.name}!`),
};
```

## Know more

- Validators can also be used independently without lesy. To know about the API and standalone usage, refer to [Validator library](/libraries/standalone/object-validator) section.
- Check out [commands](/docs/components/commands/#args-object) section to learn more about usage with commands.
- You can also go through [tutorial](/tutorial/todo-app/step-2-create-commands/#create-a-validator) section for usage reference.
