---
title: "#2 · Create commands"
icon: bug-fill
summary: Lesy ships own testing tool `@lesy/testbed` for unit and integration test.
---

In this section, we will focus on creating the commands for listing, adding, deleting and updating the todos. For this we have to create 4 commands named _add_, _delete_, _list_, and _update_.

```shell
todos add "buy milk"
todos delete 123
todos list
todos update 456 done
```

## Introduction to commands

Command is the core part of lesy. Everything revolves around it. In this guide we will explore different aspects of command. Lets start with creating the commands.

### Command structure

You can create commands from Object, Function and Class. For this tutorial, we will create command from simple object. Structure of a simple command looks like this,

```js
const command = {
  name: "greet",
  args: { name: {} },
  run: ctx => {
    console.log(`hello ${ctx.args.name}!`);
  },
};
```

There are lot of other properties in the command, but for our app, we mostly use the above 3 props. In this, `run` is the functional property, which will be executed when we run the command from terminal.

```shell
todos hello lesy # prints "hello lesy!"
```

### Default command

You might have noticed that when we scaffold the project, there are two default command files in `commands` directory. One is `default` and other one is `hello`. Hello command is optional, we can delete it.

Default command runs when we run our app command in terminal.

```shell
> todos
Hello todos
```

## Create commands

We will put all commands in a directory named `commands` inside `src`.

### `add` Command

Create a new file `./src/commands/add.js`

```js
module.exports = {
  name: "add",
  aliases: ["new", "a"],
  args: {
    todo: {
      required: true,
      requiredError: "todo is mandatory!",
    },
  },
  run: ctx => {
    const { db } = ctx.feature;
    const { todo } = ctx.args;
    const id = Math.floor(Math.random() * 1000);
    db.add([{ todo, id, status: "pending" }]);
    console.log(`todo item added. ID:${id}`);
  },
};
```

What's happening here:

- `name` - name of the command
- `aliases` - shorter/alternative names of the command
- `args` - inputs
- `args.todo.required` - add mandatory validator
- `args.todo.requiredError` - message printed if the arg is not supplied
- `run` - function executed on running the command
- `run(ctx)` - ctx is the data that is passed to the run function on the runtime
- `ctx.feature` - access the global object
- `ctx.args` - get the user supplied args input data
- `ctx.feature.todos` - DB instance that we added to the feature object

When the user runs the `add` command,

```shell
todos add "buy milk"
todos new "go to store" // alias new
todos a "call mom" // alias a - add
```

Lesy will execute the `run` function that is declared in `add` command and pass the necessary data through the context( `ctx` ) object.

In the run function, we will get the DB instance and add the todo item. Then print the success message.

The todo item will be a simple object, which contains the below props.

```js
{
  id: 123,
  todo: 'buy milk',
  status: 'pending' // or done
}
```

Here we are creating friendly random custom ID and saving it in the db, which we will use it as reference for deleting and updating the todo item.

```js
Math.floor(Math.random() * 1000); // returns random number between 0-1000
```

By default the status will be **pending**. Once the user is done, we will change the status to **done** from the update command.

### Add the command to lesy

Untill now we have only created a command but not informed to lesy. To do that, lets add the commands to lesy options in the `index.js` file.

```js
// ./src/index.js
export default {
  commands: [`${__dirname}/commands`],
  features: [`${__dirname}/db.feature.js`],
};
```

Here we have provided the `commands` directory. Lesy will get all commands in the directory and load them. Here,

- You can also directly add the command object in the array. But it will make the testing difficult.
- You can add the specific command file path. But then we need to add manually for all other commands.

### `list` command

Create a new file `./src/commands/list.js`, and add the below content.

```js
module.exports = {
  name: "list",
  aliases: ["ls"],
  run: ctx => {
    const { db } = ctx.feature;

    const todos = db
      .all()
      .map(item => `${item.id}: ${item.todo} [${item.status}]`)
      .join("\n");

    console.log(todos);
  },
};
```

Here we will

- get the DB instance `const {db} = ctx.feature`
- fetch the todos `db.all().map().join('\n')`
- print the todos as rows

Now try this command in your terminal. You should see the todo items you have added earlier.

```shell
> todos list
123: buy milk [pending]
654: go to store [done]
```

### `update` Command

Create a new file `./src/commands/update.js`, and add the below content.

```js
module.exports = {
  name: "status",
  aliases: ["update", "s"],
  args: {
    id: {
      required: true,
      requiredError: "is is mandatory",
    },
    status: {
      enum: ["done", "pending"],
      enumError: "only [done,pending] is allowed",
    },
  },
  run: ctx => {
    const { db } = ctx.feature;
    const { id, status } = ctx.args;

    const doc = db.find().equals("id", Number(id)).run();
    db.update(doc[0]._id_, { status });
    console.log(`todo item updated`);
  },
};
```

For update we need 2 inputs, `id` and `status`. Using the id we will set the status. But we also wanted to make sure, user should supply only the valid status like pending or done. We can check this in `run` function, but lesy already provided a easy solution by adding a reusable validator.

### Create a Validator

Validators are simple object with a name and rule function. These validators can be attached to any args in any commands across the application. For the update command, we want to restrict the user to supply only the known values for status. It should be either done or pending.

Validator looks like this,

```js
{
  name: "enum",
  fn: (value, rule) => rule.includes(value),
};
```

Now if we see the command,

```js
args: {
    status: {
      enum: ["done", "pending"],
      enumError: "only done or pending is allowed for status",
    },
  },
```

- `enum` is the validator name

- `["done", "pending"]` is the rule

- `enumError` is the error message to be shown if the value doesn't match. It is optional.

  Lets add the validator to lesy options in the `index.js` file

```js
// ./src/index.js
export default {
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

In the run function there are couple of things to explain.

```js
const doc = db.find().equals("id", Number(id)).run();
db.update(doc[0]._id_, { status });
```

- `db.find().equals().run()` - will get all todos matching the id
- `doc[0]._id_` - `find()` response we will returns the actual id (`_id_`) of the document
- `db.update(id,data)` - will update the todo item.

From the terminal, we will list all todos, get the id of any todo and then change the status.

```shell
> todos list
123: buy milk [pending]
```

```shell
> todos update 123 done # it works
todo item updated

> todos update 123 completed # throws validation error
only done or pending is allowed for status
```

Then we will try list command to verify the changes,

```shell
> todos list
123: buy milk [done] # worked. status changed
```

### `delete` command

For deletion, we have two things to do. One is delete specific todo and delete all todos.

```shell
> todos delete 123 # delete one item
> todos delete --all # delete all todos
```

Create a new file `./src/commands/delete`, and add the below content.

```js
module.exports = {
  name: "delete",
  aliases: ["del", "remove"],
  args: { id: {} },
  flags: { all: {} },
  run: ctx => {
    const { db } = ctx.feature;
    const { id } = ctx.args;
    const { all } = ctx.flags;

    const doc = db.find().equals("id", Number(id)).run();
    if (id) db.remove(doc[0]._id_);
    if (all) db.reset();
    console.log(`todo removed`);
  },
};
```

Here we will use flags to denote whether to remove all todos. `flags` API is same as `args` object.

Similar to update command, we will find the document id and remove the todo. If user provided the id, we will delete that specifically or if user provided the flags, we will remove all.

- `db.remove(doc[0]._id_)` - deletes one item
- `db.reset()` - deletes all todo items.

Lets try this in terminal,

```shell
> todos delete 123
todo removed

> todos delete --all
todo removed
```

## Recap

- Mandatory props for the command are `name` and `run`. Others are optional
- Command can be a simple object, function or a class.
- Validators are used globally for validating arguments
- Dont forget to include the command paths in the lesy options in index file.

## Learn more

- [Commands API]() documentation
- [Validator]() schema and rules docs
- [Sub commands]() usage
