import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";

describe("CLI", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "../"),
      commands: [resolve(__dirname, "../src/commands/default.command.ts")],
      features: [(f: any) => (f.pkg = { version: "1.0.0" })],
    });
  });
  it("should print greeting message", async () => {
    const response = await testBed.run([]);
    expect(response).toContain("Lesy CLI Framework - v1.0.0");
  });
});
