---
title: "#3 · Add Todo stats at footer"
icon: bug-fill
summary: Lesy ships own testing tool `@lesy/testbed` for unit and integration test.
---

Till now we have the DB setup and working commands to manage todos. To improve the UX, lets show the stats info below the command response for all commands. Like, if user run any of the command we will display a footer stats like this,

```shell
> todos update 123 done
todos updated

Total: 5 Done: 2 Pending 3
```

We can add this info to our commands manually, but the problem is we need to add it to all commands one by one. We can have one function to get this info and we can use it in all commands. But there is a better way to do that using middlewares.

## Introduction to middlewares

Middleware is a simple function that runs at a specific point of the command life-cycle. You can take middlewares as a pipe, which connects different parts of the command flow. It means, you get a data, manipulate or execute any code and then return the new data.

Midlewares can be plugged during all stages like, START, INIT, PRE_PARSE, POST_PARSE, POST_VALIDATE, PRE_RUN, END.

Different stages gets current runtime context data, so that you can access the hot data and change them on the fly.

## Create middleware

Now lets create a simple middleware, which will be executed after the command is ran. At this point we dont want to manipulate the data, but to execute a simple logic and print a stats message.

Lets create a new file at `./src/footer.middleware.js` and paste the below content. Dont get scared seeing the code. Logic is simple.

```js
module.exports {
  on: "END",
  run: (ctx) => {
    const {runningCommand}=ctx;
    const db = ctx.feature.db;
    const todos = db.all();
    const getItems = (name) => todos.filter(({ status }) => status === name).length;

    const totalItems = todos.length;
    const doneItems = getItems("done");
    const pendingItems = getItems("pending");

    const isTodoCommands= ["list", "add", "status", "delete"].includes(runningCommand.name)
    if (isTodoCommands) {
      const info = `Total:${totalItems} Done:${doneItems} Pending:${pendingItems}`;
      const line = ".".repeat(info.length);
      console.log(`\n${line}\n\n${info}\n\n${line}\n`);
    }
    return ctx;
  },
};
```

Whats happening here:

- `on:'END'` - tells the lesy to run this middleware at the end of command flow.
- `ctx.feature.db` - get the DB instance
- `db.all()` - fetch all todos
- `todos.filter()` - filter all todos based on status and get the total count
- `ctx.runningCommand` - gives us the object of current command that is running
- `isTodoCommands` - show this message only for relavant commands. Not for all
- print the stats
- return the `ctx` object, to continue the middleware chain. So that other middleware use this context data.

## Add Middleware

Its time to add the middleware to lesy options. Update the index file.

```js
module.exports = {
  middlewares: [`${__dirname}/footer.middleware.ts`],
  commands: [`${__dirname}/commands`],
  features: [`${__dirname}/db.feature.js`],
  validators: [
    {
      name: "enum",
      fn: (value, rule) => rule.includes(value),
    },
  ],
};
```

Similar to commands, you can provide directory or direct object in middlewares array.

## Recap

- Middlewares are global function run at different points of the command life-cycle
- Always return the context data to continue the chain
- Dont forget to include the middlewares path to lesy

## Learn more

- [Middlewares]() documentation
