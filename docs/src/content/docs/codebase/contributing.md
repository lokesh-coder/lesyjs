---
title: "Contributing"
icon: service-fill
---

## Getting started

Check out the code and get in to the lesyjs directory:

```shell
git clone https://github.com/lokesh-coder/lesyjs.git
cd lesyjs
```

Install the dependencies and bootstrap the monorepo:

```shell
npm run bootstrap
```

The code for individual packages of this monorepo are in packages/\* and [Lerna](https://lerna.js.org/) is used to handle them. There are couple more directories `./docs` and `./benchmark` are outside of the packages and they are set to private and thus not published to npm.

## Running tests

For testing [Jest](https://jestjs.io) test runner is used in lesy. To run full suite of tests, run:

```shell
npm test
```

Above command will run all the tests in all the packages and generate the coverage inside `./coverge` directory.

## Running docs

Documenation website is created using gatsby 3.x. Code for that is placed inside `./docs` directory. To start the doc server, go to docs directory and run this command:

```shell
npm start
```

## Commiting

For commit messages Lerna uses Conventional Commits Specification to generate CHANGELOG.md and to create github release notes. While commiting your changes please ensure that the message are in right format. A pre-commit hook have been added to npm scripts to prevent ny non standart message formats.

## Contibution level

As Lesy is quite huge in codebase, including, core packages, plugins, libraries, helpers, testbed, typescript types, documentation, benchmarks, templates. **Any contribution to any of these areas is highly appreciated!**

## Pull request criteria

While raising a pull request please make sure,

- All tests are passing and coverage doesnt gets lower
- Bug fixes covers necessary test cases
- Add notes explaing what has changed, so others will get an idea in technical level
