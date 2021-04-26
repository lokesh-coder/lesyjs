---
title: "#6 · Dynamic todo"
icon: bug-fill
summary: ""
---

Now we have fully functional commands and web UI, but those commands are static. What if we wanted to have a dynamically rendering content?

## Introduction to Artist UI

Artist UI is a independent standalone library of lesy, which allows us to re-render the content whenever there is a change in data. Not just that, but Arist also comes with lot of in-built interface elements like spinner, progress bar, column, box, colorful text and more. Best part is, Artist API is clean and resembels markup language, so that you dont feel complicated.

Well, as mentioned above, Artist can be installed and used without lesy. But in this guide we will see how to utilize Artist in our todos app.

## Install Artist plugin

Artist plugin is a fine wrapper around Atist UI library. First we will install it from the terminal.

```shell
npm install @lesy/lesy-plugin-artist
```

### Add plugin to lesy

As always, we have to add it to lesy options in the `index.js` file.

```shell
module.exports = {
  features: [...],
  commands: [...],
  middlewares: [...],
  plugins:['@lesy/lesy-plugin-help','@lesy/lesy-plugin-pilot','@lesy/lesy-plugin-artist']
};
```

### Artist structure

Artist plugin overrides command's default `run` function. Which means, we need to use `render` function instead of that. Lesy internally runs the `run` command which actually never exists (lesy creates one for us). Apart from that, `render` have the same context data, plus store.

```js
export default {
  name: "shuffle",
  render: ctx => {
    const { store } = ctx;

    setTimeout(() => {
      store.name = "Doe";
    }, 1000);

    return `
				<div>Hello ${store.name}</div>
				<spinner/> <text color="red" bold>loading...</text>`;
  },
};
```

As you can see from the above example, whenever there is a change in store, it re-renders and updates the content.

## Create command

Let's create a `random` command, which displays a random todo periodically. As mentioned in the above section, to work with artist we cannot use `run` function as it is a static renderer, means run once and terminate. For this we must use `render` function which will be called each time store data is changed.

Apart from `render` function, there is `onInit` function which will be called on initial run and it will be called only once. This will be helpful if we wanted to do any asynchronous operations like, interval, timeout, or Promises.

### `random` command

Create a new file `./src/commands/random.js` and paste the below content.

```js
export default {
  name: "random",
  onInit: (store, timer) => {
    if (store.todo === undefined) store.counter = 0;
    timer(() => (store.counter += 1), 1000, "someid");
  },
  render: ctx => {
    const db = ctx.feature.db;
    const todos = db.all().map(item => {
      return `${item.todo} [${item.status}]`;
    });
    const num = Math.floor(Math.random() * todos.length);
    return todos[num % ctx.store.counter];
  },
};
```

In the above code, we are setting a store value and setting a timer in the `onInit` function. Timer is simply a `setInterval` function, but with a disposer. Which means once the command is stoppedran successfully, the timer will be disposed. And if it the command is running programatically, it will call the disposer on next operation.

In the `render` function, we will fetch all todos from database and randomly return it. Timer will update the `counter` prop for each 1000ms and that makes the render function to call for each change.

### Add interface elements

Elements are HTML like tag strings, which interally calls a function and passed the attributes as arguments. As of now we havent added any elements. Let's add some.

```js
export default {
  name: "random",
  onInit: (store, timer) => {
    //code
  },
  render: ctx => {
    //code
    const todo = todos[num % ctx.store.counter];
    return `<div>
			<text color="green" bold>${todo}</text>
		</div>`;
  },
};
```

There are many elements in Artist, in the above example we have used `div` and `text` elements. `div` will add a new line after the content and `text` is used to add styles and colors.

## Run command

### From terminal

Now we will test the random command by running the below commands.

```shell
> todos --help # check if the random command is listed in help
> todos random # returns a random command for each 1000ms
```

### From web UI

Let's run the command from Pilot web UI. First we have to start the pilot server.

```shell
> todos pilot
```

Once the server is started, you can navigate to `localhost:8000` or whatever the port is printed in the terminal. From there we can click on the random command from sidebar, and click **run command** button. Dont forget to open the console, to see the changes.

## Recap

- Artist library is a wrapper of Lesy's Artist module.
- Whenever store object properties are changing, `render` function re runs.
- `onInit` is called only once, which is useful for setting up async calls.
- `render` returns a plain string or elements like `<text/>`

## Learn more

- Lesy's [Artist]() plugin documentation
- [Artist UI]() standalone module docs
