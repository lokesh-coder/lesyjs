---
title: "Artist UI"
icon: palette-fill
---

Artist UI is an independent standalone library of lesy, which allows us to re-render the content whenever there is a change in data. Not just that, but Arist also comes with lot of in-built interface elements like spinner, progress bar, column, box, colorful text and more.

Best part is, Artist API is clean and the template resembels markup language, so that you dont need to learn new concepts.

## Features

- Simple API and Lightweight
- Comparatively Faster
- Built-in elements
- Composable and Extensible with custom elements
- Smart change detection
- HMTL like markup code and template strings
- Configurable

## Installation

```shell
npm install @lesy/artist
yarn add @lesy/artist
```

```js
import Artist from "@lesy/artist";
const Artist = require("@lesy/artist");
```

## Basic example

Once installed, instantanize the Artist class. To print the content in the terminal, call `render` method and pass a function which returns a plain string or element string.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => `<div>you are <text color="red">awesome</text>!</div>`);
```

## Render

Artist calls the `render` method only once during the runtime, but however the function passed to render may be called multiple times, based on the change in content.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => "It's a simple text output");
```

## OnInit

If you wanted to do any async calls, you can use `onInit` method, which will be called only once before `render`.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.onInit(() => {
  setTimeout(() => {
    // do something on loading the element
  }, 500);
});

UI.render(() => `<div>hello</div>`);
```

## Store

Artist's store is a proxy object with a change notifier. Whenever there is a change in the store object, the function passedto `render` will be called and update the content. The best place to set a initial value or change the store is `onInit` method.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.onInit(store => {
  if (!store.name) store.name = "John";
  setTimeout(() => (store.name = "Jane"), 1000);
});

UI.render(store => {
  return `<div>hello <text color="red">${store.name}</text>!</div>`;
});
```

## Timer

If you wanted to run a `setInterval` timer, you can make use of `timer` function that is passed as a second parameter in the `onInit`. _timer_ is same as _setInterval_, only the difference is it will be gacefully disposed whenever manually or progamatically by having the full controll.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.onInit((store, timer) => {
  if (!store.count) store.count = 0;
  timer(() => (store.count += 1), 1000, "my-key");
});

UI.render(store => {
  return `counting: <text color="red">${store.count}</text>`;
});
```

`timer` accepts three parameters.

- **callback** - a function that will be called at specified intervals.
- **interval** - in milliseconds
- **unique ID** - Unique string or number to identify the timer.

## Built-in elements

Artist comes with bunch of widely used terminal elements.

### Text

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<text color="red" bg="gray" bold>some text</text>`;
});
```

`<text/>` and simple string both are same, unless you wanted to style the string.

### Props

- `color`
- `bg`
- `bold`
- `underline`
- `italic`
- `strikethrough`

All these stylings are handled by awesome `chalk` library bundled inside the Artist.

### Row and columns

For a column layout you can use `<row/>` and `<column/>` elements. Columns are automatically set the width based on number of items inside the row.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<row border>
     <column>one</column>
     <column>two</column>
     <column>three</column>
</row>`;
});
```

> `<column/>` element must be placed inside the `<row/>` else it will be considered just as a text. Also within row, you should only place column elements as a direct children. But can have any elements inside columns.

### Box

To draw a simple surrounding box use `<box/>`

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<box>
    <text> I am a simple text inside a box </text>
</box>`;
});
```

### Spinner

To display a spinner, use `<spinner/>` and it accepts `type` and `id` props. If you have multiple spinner, set unique id/string in the id prop.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<spinner type="dots"/> Loading...`;
});
```

More spinner types refer cliSpinners

### Progress bar

For a progress bar use `<progress/>`. You can pass `score` prop to set the value between 0-100.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `Running <progress score="20"/>`;
});
```

### Div

For a block line (new line break in the end), use `<div/>`

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<div>Line one</div><div>next line</div>`;
});
```

### Span

For inline content use `<span/>`.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<span>Line one</span><span>same line</span>`;
});
```

### Newline

To add a new line break use `<newline/>`

```js
const UI = new Artist();

UI.render(() => {
  return `<text>hello!</text>
  <newline/>
  <text>Welcome</text>`;
});
```

### Space

In somecases you might wanted a set a space explicitely. In those cases use `<space/>` with `length` prop.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  return `<text>hello!</text>
  <space length="2"/>
  <text>Welcome</text>`;
});
```

## Custom elements

For most terminal apps the built-in elements should be suffice. But if you like to create a completly new element or a composed block with existin elements, you can create one and register. Once the new element is regsitered it will be available across the app including the plugins.

### Register new element

An element is a simple object with `name`, `render` and `init` props. `init` is optional.

- **name:`string`** - tag name
- **render:`(ctx)=>void`** - same as main `render` method.
- **init:`(ctx)=>void`** - function that will be called before `render`.

Once created a elements pass that to `registerEls` method.

```js
import Artist from "@lesy/artist";
const UI = new Artist();

const Warning = {
  name: "warn",
  render: ctx => `<text bg="red" color="white">${ctx.props.label}</text>`,
};
UI.registerEls({ Warning });

UI.render(() => {
  return `<warn label="ALERT!"/> - this is a alert`;
});
```

### Async Timer

If you wanted to run a timer, you can do it in the `init` function. **init** function context will have,

- **store** - app level store object
- **props** - element attributes
- **timer** - `setInterval` function

```js
import Artist from "@lesy/artist";
const UI = new Artist();

const Blink = {
  name: "blink",
  init: ({ store, props, timer }) => {
    if (!store.active) store.active = false;
    timer(() => (store.active = !store.active), 1000, "unique-key");
  },
  render: ctx => `${ctx.store.active ? "+" : "-"}`,
};

UI.registerEls({ Blink });

UI.render(() => {
  return `<blink/> - is blinking`;
});
```

### Context and props

```js
import Artist from "@lesy/artist";
const UI = new Artist();

const Alert = {
  name: "alert",
  render: ctx => `<text>${ctx.props.message}</text>`,
};
const Info = {
  name: "info",
  render: (ctx, data) => {
    return ctx.renderEl(data.children);
  },
};
UI.registerEls({ Alert, Info });

UI.render(() => {
  return `<div>
    <alert message="This is a alert"/>
    <info>This is an info</info>
    <info>
        <text color="blue">This is an info</text>
    </info>
</div>`;
});
```

## Config

```js
import Artist from "@lesy/artist";

const UI = new Artist({
  collapseWhitespace: false,
  keepClosingSlash: true,
  preserveLineBreaks: false,
});

UI.render(() => {
  return `<div>
    <span>Name:</span>
    <span>Artist</span>
  </div>`;
});
```

## Templating

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(() => {
  const person = {
    name: "Monica",
    work: "Pilot",
  };
  const labelEl = `<text>Label</text>`;
  return `<div>${labelEl}: ${person.name}</div>`;
});
```

- Commenting is same as html `<!-- ->`
- Template strings
- White space control
- Invalid element tags leads to unknown tag

## Clear timers

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.onInit((store, props, timer) => {
  timer(() => (store.count += 1), 1000, "my-key");
});

UI.render(store => {
  return `<spinner/> - counter ${store.counter}`;
});

setTimeout(() => {
  UI.clearAllTimers();
}, 2000);
```

## Performance

### Dont's

```js
import Artist from "@lesy/artist";
const UI = new Artist();

UI.render(store => {
  setInterval(() => {
    store.count += 1;
  }, 1000);
  return "<span>${store.count}</store>";
});
```

```js
import Artist from "@lesy/artist";
import Case from "case";
const UI = new Artist();

const Warning = {
  name: "warn",
  render: () => `<text>${Case.upper("warning")}</text>`,
};
UI.registerEls({ Warning });

UI.render(() => {
  return `<warn/> - this is a warning`;
});
```

```js
const Warning = {
  name: "warn",
  render: () => {
    const Case = require("case");
    return `<text>${Case.upper("warning")}</text>`;
  },
};
```

## Know more

- Artist plugin
- Github repo
- npm plugin
