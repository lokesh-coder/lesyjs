import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
// tslint:disable-next-line: import-name
import PluginData from "../src";

(PluginData["features"] as any).push(
  (f: any) => (f.pkg = { name: "test_key" }),
);

describe("@lesy/lesy-plugin-pilot", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "../"),
      ...PluginData,
    });
  });

  it("should execute the run command", async () => {
    const response = await testBed.run([
      "run",
      "ls packages/plugins/lesy-plugin-pilot/__tests__/fixtures",
    ]);
    expect(response).toContain(
      "running > ls packages/plugins/lesy-plugin-pilot/__tests__/fixtures",
    );
    expect(response).toContain("hello.txt");
  });

  it("should throw error on executing the run command", async () => {
    const response = await testBed.run(["run", "echos abc"]);
    expect(response).toContain("Error > Command failed with ENOENT: echos abc");
  });
});
