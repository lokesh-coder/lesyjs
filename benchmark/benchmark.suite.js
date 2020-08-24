const b = require("benny");
const commander = require("commander");
const yargs = require("yargs");
const { build: gluegun } = require("gluegun");
const lesy = require("@lesy/compiler");
const { commanderCode, gluegunCode, yargsCode, lesyCode } = require("./libs");

b.suite(
  "Performance test",

  b.add("commander", () => {
    commanderCode(commander);
  }),

  b.add("yargs", () => {
    yargsCode(yargs);
  }),

  b.add("glugun", async () => {
    await gluegunCode(gluegun);
  }),

  b.add("lesy", async () => {
    await lesyCode(lesy);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: "perf", version: "1.0.0", folder: "./results" }),
  b.save({ file: "perf", format: "chart.html", folder: "./results" }),
);
