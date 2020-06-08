module.exports = {
  collectCoverage: true,

  collectCoverageFrom: ["./src/**"],

  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["/node_modules/", "/.history/", "types"],

  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json",
      diagnostics: false
    }
  },

  preset: "ts-jest",

  resetModules: true,

  testEnvironment: "node",

  testPathIgnorePatterns: [
    "/node_modules/",
    "/fixtures/",
    "/.history/",
    "types"
  ],

  verbose: true
};
