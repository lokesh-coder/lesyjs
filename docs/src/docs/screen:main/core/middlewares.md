---
title: Middlewares
path: /core/middlewares
icon: fire-fill
---

Middlewares are special type of hooks, to inject new functionality or change tge behaviour of the command flow. For instance, if you want to redirect the command, or validate the middleware can be hooked in to specific points in the flow. Basically, they are simple functions which will be execute at the runtime.

### Hook points

- INIT
- START
- PRE_VALIDATE
- POST_VALIDATE
- PRE_PARSE
- POST_PARSE
- PRE_RUN
- END

### Structure

Middlewares are simple objects with hook point property and run method. Based on the hook type, the run method will have specific argument values.

```typescript
export default {
  on: "START",
  run: (data) => {
    console.log("running on start..");
    return data;
  },
};
```

Add the middleware file in the **index.ts** file.

```typescript
let argv = process.argv.slice(2);
let commands = [...];
let middlewares = [`${__dirname}/middlewares/start.ts`];

export { argv, commands, middlewares };
```

Middleware should return the input data to continue the flow.

### Sync and Async execution

By default middlewares are synchronous. But it supports async operations like resolving Promises and setTimeout.

```typescript
export default {
  on: "INIT",
  run: async (data) => {
    return Promise((res) => {
      data.newProp = "Hello";
      res(data);
    });
  },
};
```

### Run context

For all of the hook points, `config` and `root` properties will be available. Otherwise, the context data will differ for each hooks.

If you want to use any third party module, require it inside run method

### INIT - Hook

It is plugged before loading commands and plugins. At this point you get complete access to **lesyCore** object. This is usefull if you want to alter or change the core behaviour.

### START - Hook

This will run after loading all commands and plugins. The run context will have all commands.

```typescript
export default {
  on: "START",
  run: (data) => {
    console.log(data.cmds);
    return data;
  },
};
```

### PRE_PARSE - Hook

This will run before parsing raw argv input. At this point you can change **argv** values to direct to different command.

```typescript
export default {
  on: "PRE_PARSE",
  run: (data) => {
    // data.argv    - raw input argv values
    // data.root    - root path
    // data.config  - config object
    // data.utils   - colors() and spinner() object
    // data.feature - all features
    // data.request - oject of dynamic actions
    return data;
  },
};
```

### POST_PARSE - Hook

Run after parsing raw argv values.

```typescript
export default {
  on: "PRE_PARSE",
  run: (data) => {
    // data.argv    - raw input argv values
    // data.root    - root path
    // data.config  - config object
    // data.utils   - colors() and spinner() object
    // data.feature - all features
    // data.request - oject of dynamic actions

    // data.args    - resolved args
    // data.flags   -  resolved flags
    return data;
  },
};
```

### PRE_VALIDATE - Hook

Once lesy found the right command to execute, it will pass the command object to pre_validate hook. At this point, the command object can be modified or validated by any middlewares.

```typescript
export default {
  on: "PRE_VALIDATE",
  run: (data) => {
    console.log(data);
    return data;
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

### POST_VALIDATE - Hook

This runs after **lesy** runs validation. If validation fails, process will exit and the flow will be terminated. In such cases this wont run. Run context is same as **pre_validate**

### PRE_RUN - Hook

After validation passes, **pre_run** will be executed will all the necessary info about the command and essestial utilities.

```typescript
export default {
  on: "PRE_RUN",
  run: (data) => {
    // data.argv    - raw input argv values
    // data.root    - root path
    // data.config  - config object
    // data.utils   - colors() and spinner() object
    // data.feature - all features
    // data.request - oject of dynamic actions
    // data.args    - resolved args
    // data.flags   -  resolved flags
    // data.rest   -  unknown args
    return data;
  },
};
```

### END - Hook

This hook will run at the end of the command flow. There is no run context. Thus no need of return statement.

```typescript
export default {
  on: "END",
  run: () => {
    console.log("Command ran successfully!");
  },
};
```
