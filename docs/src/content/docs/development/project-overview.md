---
title: "Project overview"
icon: "leaf-fill"
---

Each and every part of Lesy is carefully handcrafted to provide a better experience to both developers and users. Yet, there is always a scope to improve the code base for the modern future.

Few things are considered as rules while developing,

- **Simpler** - _Dont complicate unneccesarily_
- **Maintainable** - _Stick with standard_
- **Decoupled** - _Do only one thing perfectly_
- **Extensible** - _Allow awesome minds to plug things_

## Project structure

First lets see how the code is organised.

```bash
lesy
├── benchmark/
├── docs/
└── packages/
    ├── cli/
    ├── compiler/ # includes ts node if it is typescript project
    ├── core/ # handles user input and output
    ├── testbed/
    ├── types/
    ├── helpers/
    │   └── validator/
    ├── misc/
    │   ├── pilot-ui/
    │   ├── artist-ui/
    │   └── test-utils/
    └── plugins/
        ├── lesy-plugin-config/
        ├── lesy-plugin-demo/
        ├── lesy-plugin-generator/
        ├── lesy-plugin-help/
        ├── lesy-plugin-artist/
        ├── lesy-plugin-pilot/
        ├── lesy-plugin-prompt/
        ├── lesy-plugin-sidekick/
        ├── lesy-plugin-store/
        └── lesy-plugin-validator/
```

There were around **21 packages** in the lesy framework. But what really matters is `core` and `compiler`, others are supporting features.

> Below content is being updated with more examples and illustration.

## Core

As the name says, it is the heart <i class="ri-heart-3-fill text-primary"></i> of the project. Main responsibility of the core is take user commands, convert them to objects and run them. Nothing more. It is slim, and can live without other things in the project.

Core components include,

### [Command Contoller](https://github.com/lokesh-coder/lesyjs/blob/master/packages/core/src/command.ts)

Takes commands, process and strore them in a nice format

### Middleware Controller

Takes middlewares, stores in an array and execute when requested

### Feature Controller

Takes features, stores and run when called

### Loader

Load files and delegate to above controllers

### Utilities

Wrap useful third party modules for commands to use

### Core

Orchestrate all the above components and run commands and middlewares

## Compiler

Compiler takes care of fewer tasks:

- If it is typescript project, loads ts-node to run ts files
- If src file is provided, loads all files provided and pass to core
- Runs code module and pass args provided in parse
- Loads default plugins
- Sets default config
- If global workspace value is set, it just returns core promise.

## Plugins

Plugins directory consist of all lesy plugins

## Misc

It consist of two packages, Pilot UI and test utils. Both packages are internally used and not published to npm.

- Pilot UI is build with Angular and manages complete user interface logic. It is compiled and build by pilot plugin. Then the dist directory is served.

- Test utils used inside few of the packages. It contains few helper methods.

## Testbed

Used for integration test. Basically Testbed will run lesy with user provided data and collect all console output and returns.

## Types

Contains all the type definition files of the core package.

## CLI

This package contains few lesy libraries and templates to scaffold new project based on the answers provided by users while initialising.

Unlike other packages, lesy CLI is not part of @lesy organisation in the npm. This is because, if it is under @lesy scope, then user have to do `npx @lesy/cli new my-cli`. To improve the user and developer experience, CLI package has been moved out of lesy org.

## Validator

This package is used to validate a object against a rules defined in another object. It works independently and not coupled with lesy in any way.

This library accepts custom rules.

## Compile and Build

Lesy is build with node and typescript. And this project is maintained as a monorepo. Based on the need, either `ncc` or `tsc` compiler is used. `ncc` is mainly used to compress the file and reduce the size.

[lerna]() is used to handle bootstraping and executing build script in all projects.

## Release

[lerna]() is handle quite a few things here,

- Versioning based on **conventional commits**
- Release all packages to npm
- Create tag and push to github
- Create release notes in github
- Update CHANGELOG file
- Update the new version in all package.json files

## Docs

Documentation is made using [gatsby](). All the markdown is build and published to `gh-pages` by the github actions.

## Pilot UI

Pilot UI is a angular project. Basically Pilot command in lesy will exposes necessary data though web sockets and Pilot UI receives and display.

When running command from UI, it send run signal and Pilot cmd runs the command and sends the ouput.

## Benchmark

[benny]() is used for benchmarking. [commander](), [gluegun](), and [yargs]() are used for comparition. The output JSON is used in the Performance page to represent as bar chart.
