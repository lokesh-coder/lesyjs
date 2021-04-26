---
title: Commands
icon: terminal-box-fill
summary: ""
---

Command is simply an object with `name` and `run` function property. Whenever you run the command in terminal, it executes the `run` function with the context data. Here's the some of the features of command:

- Execute synchronous and asynchronous code
- Run multi-level sub commands
- Run another command programmatically
- Parse and validate arguments and flags
- Provide tools and utils through context
- Allow middlewares to update the context data

## Overview

First, let's see how a command looks like,

```js
const lesy = require('@lesy/compiler');

const commands= [{ name: "hello", run: () => console.log("Hello Buddy!")}],
lesy({commands}).parse();
```

If you have generated the project from Lesy CLI, you might have an `index` file where the commands are exported from there. Your code wight look like this,

```js
// src/index.(js|ts)
const commands = [`${__dirname}/commands`];
const middlewares = [...];
export { commands, middlewares };

// src/commands/hello.(js|ts)
export default {
  name: "hello",
  run: () => console.log("Hello Buddy!"),
}
```

In the below examples lets assume the code has `index` file where all commands are exported.

## Creating a command

Command can be simple `Object`, `Function` or `Class` .

### Command Object

```typescript
{
    name: "hello",
    run: () => console.log("Hello Buddy!")
}
```

### Command Function

```typescript
function hello(cmd) {
  cmd.name = "hello";
  cmd.run = () => console.log("Hello Buddy!");
}
```

### Command Class

```typescript
class Hello {
  name = "hello";
  run() {
    console.log("Hello Buddy!");
  }
}
```

Based on the compexity of your project you can choose one of these types. For simplicity, we will use object type throughout this guide.

## Adding commands

You can directly add the commands in the lesy options as mentioned in the overview section, or you can provide a file path or a directory for lookup.

### File path

```typescript
// src/commands/welcome.(js|ts)
export default {
  name: "welcome",
  run: () => console.log("Hi!"),
};
```

Add the file path in **index** file.

```typescript
const commands = [`${__dirname}/commands/welcome.(js|ts)`];
export { commands };
```

### Commands directory

You can also refer the commands directly path. this will be usefull if you have many nested commands.

```typescript
const commands = [`${__dirname}/commands`];
export { commands };
```

> If you want to exclude one or more files, you can simply add `_` prefix to the file name. For example, `/commands/_greeting.js`

## Properties

The only required property for a command is `run` . Everything else is optional.

```js
const GreetCommand = {
  name:'greet',
  description:'Prints greeting message',
  aliases:['hello','welcome'],
  args:{ name:{} },
  flags:{
    gender:{
      aliases:['g']
    }
  },
  additionalInfo:'',
  main:'',
  usage:''
  group:'commands',
  isVisible:true,
  run:(ctx)=>console.log(`hello ${ctx.args.name}`)
}
```

### **name**: `String`

It refers the name of the command. It should be unique and short. Hyphen `-` is allowed.

By default **lesy** looks for the command named `default` if no args supplied in the input. If you would like to run a different command as a default command, set it in the config.

```typescript
const lesy = require('@lesy/compiler');
const options={
    commands:[...],
    config:{ defaultCommand:"hello" }
};
lesy(options).parse();
```

### **description**: `String`

This is a command description used by help and other plugins.

### **run**`(context):void`

It is a function which will be executed when this command is triggered. You can also use `async/await` for asynchronous calls. Check [run context]() section for more info.

### **aliases**: `Array<String>`

Command can have multiple aliases. Please make sure you are not using the same alias in the another command.

```typescript
{
    name:"hello",
    aliases:["hi","yo"],
    run:()=>{}
}

/*
./bin/cmd hello
./bin/cmd hi
./bin/cmd yo
*/
```

### **args**: `Object`

Arguments can be defined by a simple object with arg name as property key name. And the value will be the validation schema. Currently, lesy comes with `required`, `size` and `exact` validators. You can check out [validator]() for creating a new rules and schema.

```typescript
{
    name:"hello",
    args:{
        username:{
            required:true,
            requiredError:"Please provide username",
        },
        age:{}
    },
    run:({args})=>{
        console.log(`arg values are ${args}`)
    }
}

/*
./bin/cmd hello john 28 // GOOD
./bin/cmd hello john   // OK
./bin/cmd hello       // THROWS ERROR
*/
```

### **flags**: `Object`

Flags are very similar to args. But flags have aliases and type in additional.

```typescript
{
    name:"hello",
    flags:{
        title:{
            type:"string",
            required:true
        },
        isMorning:{}
    },
    run:({flags})=>{
        console.log(`flag values are ${flags}`)
    }
}

/*
./bin/cmd hello --title=miss --is-morning // GOOD
./bin/cmd hello --title=mr 								// OK
./bin/cmd hello 													// THROWS ERROR
*/
```

### **additionalInfo**: `String`

This extra text will be used by other plugins and middlewares. Originally, use case is for showing info about the command in help or pilot command

```typescript
{
    name:"delete",
    additionalInfo:"Deletes all files. Run with caution!",
    run:()=>{}
}
```

### **main**: `String`

When you have sub commands, `main` should refer to parent command name. Learn more about [sub commands]().

```typescript
{
    main:"generate",
    name:"component",
    run:()=>{}
}

/*
./bin/cmd generate component
*/
```

### **usage**: `String`

Sample usage code is shown in the help command.

### **group**: `String`

If you have many commands you can group them and show it in the help.

## Run context

The `run` method provides various data about the command and app.

```typescript
{
    name:"hello",
    run:(ctx)=>{
        // ctx.args    - resolved args
        // ctx.flags   - resolved flags
        // ctx.config  -  returns configuration set in index and by other plugins
        // ctx.feature - object of features from app and plugins
        // ctx.root    - root file path
        // ctx.utils   - returns color() and spinner() util
        // ctx.argv    - return raw input argv
        // ctx.id      - command ID
        // ctx.request - object of dynamic actions
    }
}
```

### **request**: `Object`

`request` object can be used to run command dynamically or fetch other command info

```typescript
{
    name:"hello",
    run:({request})=>{
        request.runCommand(["hello","John"]);
        request.getCommandById(1);
        request.getCommandByName("Hello");
        request.getCommands();
    }
}
```

### **utils**: `Object`

todo

## Sub commands

Commands can be nested multiple levels. If you want to create a sub-command, just add the parent name in `main` property. Other properties of the command remains same for sub commands. You can place the sub commands files anywhere, as lesy doesnt iterate through the directories but with the name.

```typescript
/* PARENT COMMAND */
// src/commands/generate.js
{
    name:"generate",
    aliases:["g"],
    run:()=>{}
}

/* SUB COMMANDS */
// src/commands/generate/component.js
{
    main:"generate",
    name:"component",
    aliases:["c"],
    args:{
        componentName:{
            required:true
        }
    },
    run:()=>{}
}

// src/commands/generate/util.js
{
    main:"generate",
    name:"util",
    flags:{
        global:{}
    },
    run:()=>{}
}

```

```shell
./bin/cmd generate component <componentName>
./bin/cmd g c <componentName>
./bin/cmd generate

./bin/cmd g util --global
```

> Dont use parent command aliases in the `main` property. Always mention the parent command's `name` value in `main`.

## Global flags

### `--version`, `-v`

### `--ts`

## Typescript `@types`

## Reserved names

## Recap
