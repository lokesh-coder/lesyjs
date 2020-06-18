---
title: Commands
path: /docs/core/commands
icon: terminal-box-fill
---

Command is a core part of lesy. You can create and add commands in multiple ways. Lets see what you can actually do with commands.

- Execute synchronous and asynchronous code
- Run multi-level sub commands
- Run another command programatically
- Parse and validate arguments and flags
- Use features from app or plugins

### Types of commands

Command can be an `Object`, `Function` or `Class` .

#### Plain Object

```typescript
{
    name:"hello",
    run:()=>console.log("Hello Buddy!")
}
```

#### Function

```typescript
function hello(cmd) {
  cmd.name = "hello";
  cmd.run = () => console.log("Hello Buddy!");
}
```

#### Class based

```typescript
class Hello {
  name = "hello";
  run() {
    console.log("Hello Buddy!");
  }
}
```

You can add them directly or refer the file path or commands directory.

#### Include directly

In the **index.ts** file, include the commands directly.

```typescript
export default {
  commands: [
    {
      name: "mycommand",
      run: () => console.log("running my command..."),
    }, // can be a object, function or class as mentioned above
  ],
};
```

#### File path

```typescript
// src/commands/welcome.ts
export default {
  name: "welcome",
  run: () => console.log("Hi!"),
};
```

Add the file path in **index.ts** file.

```typescript
export default {
  commands: [`${__dirname}/commands/welcome.ts`],
};
```

#### Commands directory

You can also refer the commands directly path. this will be usefull if you have many nested commands.

```typescript
export default {
  commands: [`${__dirname}/commands`],
};
```

### Anatomy of command

The only required properties for a command is `name` and `run` . Everything else is optional and used for other purposes.

#### name

It refers the name of the command. It should be unique and short. Hyphen `-` is allowed.

#### run

This function or method will be executed when this command is triggered.

#### aliases

Command can have multiple alias. Please make sure you are not using the same alias in the another command

```typescript
{
    name:"hello",
    aliases:["hi","yo"],
    run:()=>{}
}

/*
    $ node bin/cmd hello
    $ node bin/cmd hi
    $ node bin/cmd yo
*/
```

#### args

These are the arguments schema. This has inbuild validation. [refer](foobar) [](/)Validator helper.

```typescript
{
    name:"hello",
    args:{
        username:{
            required:true
        },
        age:{}
    },
    run:({args})=>{
        console.log(`arg values are ${args}`)
    }
}

/*
$ node bin/cmd hello john 28 // GOOD
$ node bin/cmd hello john // OK
$ node bin/cmd hello // THROWS ERROR
*/
```

#### flags

Flags are very similar to args. But flags have aliases and type.

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
$ node bin/cmd hello --title=miss --is-morning // GOOD
$ node bin/cmd hello --title=mr // OK
$ node bin/cmd hello // THROWS ERROR
*/
```

#### extra

This extra text will be used by other plugins and middlewares. Originally, use case is for showing extra info about the command in help or pilot command

```typescript
{
    name:"delete",
    extra:"this command will delete all files. run with caution.",
    run:()=>{}
}
```

#### main

When you have sub commands, main should refer to parent command name.

```typescript
{
    name:"component",
    main:"generate",
    run:()=>{}
}

/*
$ node bin/cmd generate component
*/
```

#### description

This is a command description used by help and other plugins.

#### usage

Sample usage code shown in the help command

### Run context

The `run` method provides various data about the command and app.

```typescript
{
    name:"hello",
    run:(data)=>{
        // data.args    - resolved args
        // data.flags   - resolved flags
        // data.config  -  returns configuration set in index and by other plugins
        // data.feature - object of features from app and plugins
        // data.root    - root file path
        // data.utils   - returns color() and spinner() util
        // data.argv    - return raw input argv
        // data.id      - command ID
        // data.request - object of dynamic actions
    }
}
```

#### data.request

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

### Sub commands

Commands can be nested multiple levels. If you want to make a sub-command, just add the parent name in `main` property. Other features of the command remains same for sub commands.

```typescript
// parent command
// src/commands/generate.ts
{
    name:"generate",
    aliases:["g"],
    run:()=>{}
}
```

```typescript
// sub commands
// src/commands/generate/component.ts
{
    name:"component",
    main:"generate",
    aliases:["c"],
    args:{
        componentName:{
            required:true
        }
    },
    run:()=>{}
}

// src/commands/generate/util.ts
{
    name:"util",
    main:"generate",
    flags:{
        global:{}
    },
    run:()=>{}
}
```

```shell
$ node bin/cmd generate component <componentName>
$ node bin/cmd g c <componentName>
$ node bin/cmd generate

$ node bin/cmd g util --global
```

Please dont use parent name aliases

### Default command

By default **lesy** look for command named `default` if no args supplied in the input. If you would like to run different command as a default command, set it in the config.

```typescript
{
    commands:[...],
    config:{
        defaultCommand:"hello"
    }
}
```
