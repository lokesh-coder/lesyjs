---
title: Middlewares
icon: fire-fill
summary: Middlewares are special type of hooks, to inject new functionality or change the behaviour of the command flow. For instance, if you want to redirect the command or validate, the middleware can be hooked in to specific points in the flow. Basically, they are simple functions which will be execute at specific point during runtime.
---

Middlewares are simple functions which will be executed during the lifecyle of command flow. With this, you will be able to add new functionallity, tweak and change the entire behaviour of the command at any point of the flow.

## Overview

Middlewares are simple objects with hook point property and run method. Based on the hook type, the run method will have specific argument values.

```typescript
export default {
  on: "START",
  run: data => {
    console.log("running on start..");
    return data;
  },
};
```

## What you can do with middlewares?

- Async operations
- Programatically run command
- Change command
- Change args and flags
- Terminate the flow
- Intercept and change the output
- Modify running command competely
- Print additional info at any stages
- Capture and send logs to other services
- Include data in command context data
- And much more..

## Create middleware

Middlewares are simple objects with hook point property and run function. Based on the hook, the run method will have specific context values.

```typescript
export default {
  on: "START",
  run: context => {
    console.log("running on start..");
    return context;
  },
};
```

> Middleware **should return** the input data to continue the flow.

### Async middleware

By default middlewares are synchronous. But it supports async operations like resolving Promises and setTimeout.

```typescript
export default {
  on: "INIT",
  run: async ctx => {
    return Promise(res => {
      ctx.newProp = "some value";
      res(ctx);
    });
  },
};
```

## Add middleware

Add the middleware file in the **index** file, similar to [commands]().

```typescript
const middlewares = [`${__dirname}/middlewares/start.js`];
const commands = [...];

export { commands, middlewares };
```

Middleware should return the input data to continue the flow.

## Hook points

- INIT
- START
- PRE_VALIDATE
- POST_VALIDATE
- PRE_PARSE
- POST_PARSE
- PRE_RUN
- END

## Hooks and context

For all of the hook points, `config` and `root` properties will be available in the context data. Otherwise, the context data will differ for each hooks.

If you want to use any third party module, require it inside run method

### @**init**

It is plugged before loading commands and plugins. At this point you get complete access to **lesyCore** object. This is usefull if you want to alter or change the core behaviour.

### @**start**

This will run after loading all commands and plugins. The run context will have all commands.

```typescript
export default {
  on: "START",
  run: ctx => {
    console.log(ctx.cmds);
    return ctx;
  },
};
```

### @**pre_parse**

This will run before parsing raw argv input. At this point you can change **argv** values to direct to different command.

```typescript
export default {
  on: "PRE_PARSE",
  run: ctx => {
    // ctx.argv    - raw input argv values
    // ctx.root    - root path
    // ctx.config  - config object
    // ctx.utils   - colors() and spinner() object
    // ctx.feature - all features
    // ctx.request - oject of dynamic actions
    return ctx;
  },
};
```

### @**post_parse**

Run after parsing raw argv values.

```typescript
export default {
  on: "PRE_PARSE",
  run: ctx => {
    // ctx.argv    - raw input argv values
    // ctx.root    - root path
    // ctx.config  - config object
    // ctx.utils   - colors() and spinner() object
    // ctx.feature - all features
    // ctx.request - oject of dynamic actions

    // ctx.args    - resolved args
    // ctx.flags   -  resolved flags
    return ctx;
  },
};
```

### @**pre_validate**

Once lesy found the right command to execute, it will pass the command object to pre_validate hook. At this point, the command object can be modified or validated by any middlewares.

```typescript
export default {
  on: "PRE_VALIDATE",
  run: ctx => {
    console.log(ctx);
    return ctx;
  },
};
```

It would have,

```typescript
{
	command:{
		id: 2,
		name: 'hello',
		args: { name: {} },
		flags: {},
		aliases: [ 'hello' ],
		main: null,
		group: 'Commands',
		description: '',
		isVisible: true,
		run: [Function: run],
		src: '/path/to/src/commands/hello.command.ts'
	},
	values: { name: 'john' },
	args: [ 'john' ]
}
```

### @**post_validate**

This runs after **lesy** runs validation. If validation fails, process will exit and the flow will be terminated. In such cases this wont run. Run context is same as **pre_validate**

### @**pre_run**

After validation passes, **pre_run** will be executed will all the necessary info about the command and essestial utilities.

```typescript
export default {
  on: "PRE_RUN",
  run: ctx => {
    // ctx.argv    - raw input argv values
    // ctx.root    - root path
    // ctx.config  - config object
    // ctx.utils   - colors() and spinner() object
    // ctx.feature - all features
    // ctx.request - oject of dynamic actions
    // ctx.args    - resolved args
    // ctx.flags   -  resolved flags
    // ctx.rest    -  unknown args
    return ctx;
  },
};
```

### @**end**

This hook will run at the end of the command flow.

```typescript
export default {
  on: "END",
  run: ctx => {
    console.log("Command ran successfully!");
    return ctx;
  },
};
```

## Example

## Gotcha

## Usages

- Used in help plugin, to send all commands info as a context data. so that you can create your own help command with the data

- Used in artist plugin, to run a render function instead of run function in command.
