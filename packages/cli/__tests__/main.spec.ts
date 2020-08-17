import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
// tslint:disable-next-line: import-name
import * as PluginData from "../src";

describe("CLI", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "../"),
      features: [(f: any) => (f.pkg = { version: "1.0.0" })],
      ...PluginData,
    });
  });
  it("should print greeting message", async () => {
    const response = await testBed.run([]);
    expect(response).toContain("Lesy CLI Framework - v1.0.0");
  });
});
