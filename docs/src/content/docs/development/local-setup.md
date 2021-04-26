---
title: "Local setup"
icon: "mac-fill"
---

## Clone repo

Checkout the code from the github repository via HTTPS, SSH or using Github CLI.

### HTTPS clone

```shell
git clone https://github.com/lokesh-coder/lesyjs.git
```

### SSH clone

```shell
git clone git@github.com:lokesh-coder/lesyjs.git
```

### Github CLI

```shell
gh repo clone lokesh-coder/lesyjs
```

### Download project

Alternatively you can also [Download](https://github.com/lokesh-coder/lesyjs/archive/refs/heads/master.zip) the complete project code and extract in your local machine.

## Install dependencies

**Lerna** is used to manage the dependencies and to organize the Lesy's monorepo project. First install the lerna globally.

```shell
npm install -g lerna
yarn add global lerna
```

Once Lerna is installed, you can run `bootstrap` script command, which internally calls lerna to install all dependencies.

```shell
cd lesy
npm run bootstrap
```

## Build project

After installation, run linting to verify there is no lint error.

```shell
npm run lint
```

Lesy is written in **typescript**. So, you need to build if you want to run compiled version of the project.

```shell
npm run build # or
npm run cbb # clean,bootstrap and build
```

## Run tests

To run the test suites, from root directory run the test command.

```shell
npm run test
```

## Run Lesy CLI

By default, Lesy CLI bin has node compiler. Meaning only after you build the project the Lesy CLI will work. But, if you want to run as a typescript project, update the `packages/cli/bin/cmd` file shebang to:

```bash
#!/usr/bin/env ts-node --project ./tsconfig.json -r tsconfig-paths/register
```

and then you can run the CLI.

```shell
./packages/cli/bin/cmd --version
```

## Run Pilot dashboard

Pilot Dashboard is written using Angular and Typescript. Hence it is already compiled and placed the build files in Pilot library. To work with Pilot, you need to run Pilot UI and Pilot command separtely in two different terminal tabs.

First run the pilot command. Which will start the server.

```shell
cd packages/cli
bin/cmd pilot
```

and from the another terminal run Pilot Dashboard UI.

```shell
cd packages/misc/pilot-ui
npm start
```

## Run Benchmark

To run the benchmark, run:

```shell
npm run benchmark
```
