---
title: Sample2
path: /docs/dev/sample2
icon: terminal-box-fill
---

Each and every part of Lesy is carefully handcrafted to provide a better experience to both developers and users. Yet, there is always a scope to improve the code base for the modern future.

Few things are considered as rules while developing,

- **Simpler** - _Dont complicate unneccesarily_
- **Maintainable** - _Stick with standard_
- **Decoupled** - _Do only one thing perfectly_
- **Extensible** - _Allow awesome minds to plug things_

### Project structure

First lets see how the code is organised.

```bash
lesy/
┣ benchmark/
┣ docs/
┗ packages/
  ┣ cli/
  ┣ compiler/ # includes ts node if it is typescript project
  ┣ core/ # handles user input and output
  ┣ testbed/
  ┣ types/
  ┣ helpers/
    ┗ validator/
  ┣ misc/
    ┣ pilot-ui/
    ┗ test-utils/
  ┗ plugins/
    ┣ lesy-plugin-config/
    ┣ lesy-plugin-demo/
    ┣ lesy-plugin-generator/
    ┣ lesy-plugin-help/
    ┣ lesy-plugin-pilot/
    ┣ lesy-plugin-prompt/
    ┣ lesy-plugin-sidekick/
    ┣ lesy-plugin-store/
    ┗ lesy-plugin-validator/
```

There were around **18 packages** in the lesy framework. But what really matters is `core` and `compiler`, others are supporting features.

### Core

As the name says, it is the heart <i class="ri-heart-3-fill text-primary"></i> of the project. Main responsibility of the core is take user commands, convert them to objects and run them. Nothing more. It is slim, and can live without other things in the project.

Core components include,

#### Command Contoller

Takes commands, process and strore them in a nice format

#### Middleware Controller

Takes middlewares, stores in an array and execute when requested

#### Feature Controller

Takes features, stores and run when called

#### Loader

Load files and delegate to above controllers

#### Utilities

Wrap useful third party modules for commands to use

#### Core

Orchestrate all the above components and run commands and middlewares

### Compiler

### Plugins

### Misc

### Testbed

### Types

### CLI

### Helpers

### Build

### Release

### Docs

### Pilot UI

### Benchmark

### How it works
