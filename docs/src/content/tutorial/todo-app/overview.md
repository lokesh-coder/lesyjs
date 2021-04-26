---
title: Overview
icon: bug-fill
summary: ""
---

In this guide, we will build a **simple todo application** that enables user to add, remove, update, and list todo items. While building the app, we will learn the fundamental concepts of lesy.

Here's how it would look like, once we built.

<!-- <gif> -->

Complete [source code]() of this app is available in GitHub repo.

## Plan

- Setup a simple database to store all our todos
- Create commands for listing, adding and updating todos
- Show todo stats info at the bottom
- Install lesy help plugin
- Start pilot server for web interface
- Show random todos dynamically
- Spice up with colors and styles

Normally in other CLI builders, you would do all operations in a command itself. But is lesy, you have different components to handle them without much code. Along the guide, we will discover those components one by one.

## Installation

First, lets generate a new project using lesy CLI. We will name the app as **todos**.

```shell
npx lesy new todos
```

Running the above command will ask you the project location, app command name, and few other details. For this guide we will use javascript flavor. But you can also choose typescript if you would like to. Steps remain same. Once the project is generated, you will see some instuctions in the terminal to proceed further. Also as per the instruction, you need to link your module locally to use your command name in terminal.

Now try this in your terminal,

```shell
todos hello lesy
```

If it displays `hello lesy`, then the installation is done and everything is set to go.

Now we can check the version,

```shell
todos --version
todos -v
```

## Project structure

This is how your project files looks like after scaffolding.

```text
todos
├── tests
│   ├── hello.command.integration.test.js
│   └── hello.command.test.js
├── bin
│   └── cmd
├── src
│   ├── commands
│   │   ├── default.js
│   │   └── hello.js
│   └── index.js
└── package.json
```

## Learn more

- Detailed [installation]() instructions
- [Lesy CLI]() overview
- [Todo app]() github repository
