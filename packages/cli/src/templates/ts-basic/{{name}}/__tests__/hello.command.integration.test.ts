import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
import hello from "../src/commands/hello";

describe("Hello command", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      root: resolve(__dirname, "./"),
      commands: [hello],
    });
  });
  it("should return proper response", async () => {
    const response = await testBed.run(["hello"]);
    expect(response).toContain("Hello Stranger!");
  });
});
