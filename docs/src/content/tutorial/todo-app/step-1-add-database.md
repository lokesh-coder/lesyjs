---
title: "#1 · Add Database"
icon: bug-fill
summary: Lesy ships own testing tool `@lesy/testbed` for unit and integration test.
---

For storing all the todos we need a simple DB. We will use `flat-db` module for that. It has a simple API and lightweight.

## Introduction to Feature

One of the main components in lesy is **Feature**. It is a simple object, you can take it as a global object, which will be passed to both Command and middlewares, as a context data. As this point you dont need to worry about commands and middlewares. We will cover them in a bit.

Feature looks like this,

```js
const caseFeature=(feature)=>{
  const case = require('case');
  feature.case = case;
}
```

Why we need this?

- If many command and middlewares need the same functionality
- Load any third party module lazily
- To set a global data

## Create a db

Lets install the `flat-db` module. In your project root, run this from your terminal,

```shell
npm install flat-db
```

After it is installed, create a new file `./src/db.feature.js` and add this.

```js
let db = require("flat-db");
db.configure({ dir: "./todos-collection" });
db new db.Collection("todos");

export default (feature)=>{
  feature.db = db;
}
```

Now that we have added a simple `flat-db` wrapper and added the db instance to the global object. But we got a problem here. Features are loaded as soon as the app bootstraps. So, the flat-db module will also be loaded eagerly. What actually we wanted is, load the module only if it requires. And another important thing is, we also dont want to load the module multiple times on multiple calls.

We will refactor this little bit.

```js
export default feature => {
  Object.defineProperty(feature, "db", {
    get: () => {
      const db = require("flat-db");
      db.configure({ dir: "./todos-collection" });
      return new db.Collection("todos");
    },
  });
};
```

By adding the `getter` method, the module is cached on the first load and returns the same instance on next consicutive calls. In the above code `./todos-collection` is the database file path name. you can name it whatever you like. From here we can acces the DB instance like `feature.db`

## Database API

- `db.remove(id)` - remove the todo item
- `db.get(id)` - get a todo item
- `db.all()` - get all todos
- `db.reset()` - delete all todos
- `db.remove(id)` - delete the todo item
- `db.update(id,data)` - update the todo item

## Add the feature

We have created the feature, but havent added to the lesy yet. To do that, go to `./src/index.js` file and paste this content.

```js
export default {
  features: [`${__dirname}/db.feature.js`],
};
```

> It's not necessary to create a file for feature, you can also directly add the feature function in the array. It is just for the readability and for testing purpose.

## Recap

- Features are global object, that is shared between commands and middlewares.
- Always require the 3rd party module inside the feature function for lazy loading.
- Dont forget to add the feature in index file or in main lesy options.

## Learn more

- [Features]() documentation
- [flat-db]() repository for API reference
- Object [getter]() docs
