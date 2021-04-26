---
title: "Indepth concepts"
icon: focus-2-fill
---

## Architecture

![lesy core flow](/images/lesy-core-flow2.png)

## How it works

**core** has two main methods. `bootstrap` and `run`

**bootstrap(userData)**

- Takes the user provided data(commands, featutes, etc.,)
- Passes all data to loader to extract the content.
- Extracted content is saved in state
- Executes middlewares hooked to `INIT` and `START`

**run(argv)**

- Takes user provided command args from the terminal or from `parse` method
- Parse arguments and flags
- Find the correct command from the args
- Validate args and flags
- Run command
- During this flow it executes middlewares hooked to `PRE_PARSE`, `POST_PARSE`, `PRE_VALIDATE`,`PRE_RUN`,`END`
