const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.base.json");
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "./packages/cli/src/**",
    "./packages/core/src/**",
    "./packages/compiler/src/**",
    "./packages/plugins/**/src/**",
    "./packages/helpers/**/src/**",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/fixtures/",
    "/.history/",
    "types",
    "docs",
    "templates",
    "packages/plugins/lesy-plugin-demo",
  ],
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.base.json",
      diagnostics: false,
    },
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/packages/",
  }),
  preset: "ts-jest",
  resetModules: true,
  testEnvironment: "node",
  testMatch: [
    // "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/fixtures/",
    "/.history/",
    "types",
    "docs",
    "templates",
    "pilot-ui",
  ],
  verbose: true,
};
