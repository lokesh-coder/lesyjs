const { resolve } = require("path");
const { LesyTestBed } = require("@lesy/testbed");
const HelloCommand = require("../src/commands/hello");

describe("Hello - Integration test", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: false,
      root: resolve(__dirname, "./"),
      commands: [HelloCommand],
    });
  });
  it("should return proper response", async () => {
    let response = await testBed.run(["hello"]);
    expect(response).toContain("Hello Stranger!");
  });
});
