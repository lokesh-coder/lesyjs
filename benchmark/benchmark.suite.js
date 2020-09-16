const b = require("benny");
const commander = require("commander");
const yargs = require("yargs");
const { build: gluegun } = require("gluegun");
const lesy = require("@lesy/compiler");
const { commanderCode, gluegunCode, yargsCode, lesyCode } = require("./libs");

const options = {
  // minSamples: 100
};

b.suite(
  "Performance test",
  b.add(
    "lesy",
    async () => {
      await lesyCode(lesy);
    },
    options,
  ),

  b.add(
    "commander",
    () => {
      commanderCode(commander);
    },
    options,
  ),

  b.add(
    "yargs",
    () => {
      yargsCode(yargs);
    },
    options,
  ),

  b.add(
    "glugun",
    async () => {
      await gluegunCode(gluegun);
    },
    options,
  ),

  b.cycle(),
  b.complete(),
  b.save({ file: "perf", version: "1.0.0", folder: "./results" }),
  b.save({ file: "perf", format: "chart.html", folder: "./results" }),
);
