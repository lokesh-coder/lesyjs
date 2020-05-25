module.exports = {
  collectCoverage: true,

  collectCoverageFrom: ["./src/**"],

  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["/node_modules/", "/.history/", "types"],

  resetModules: true,

  testEnvironment: "node",

  testPathIgnorePatterns: [
    "/node_modules/",
    "/fixtures/",
    "/.history/",
    "types",
  ],

  verbose: true,
};
