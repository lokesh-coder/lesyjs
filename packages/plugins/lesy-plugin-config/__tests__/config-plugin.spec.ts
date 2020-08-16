import { LesyTestBed } from "@lesy/testbed";
import configMw from "../src/middlewares/config.mw";
import { resolve } from "path";
// tslint:disable-next-line: import-name
import PluginData from "../src";

describe("lesy-plugin-config", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: __dirname,
      commands: [
        {
          run: ({ config }) => console.log(config),
        },
      ],
      config: {
        "@lesy/lesy-plugin-config": {
          name: "test-config",
        },
      },
      ...PluginData,
    });
  });

  it("should load config from file", async () => {
    const response = await testBed.run([]);
    expect(response).toContain("dummy-config-value-from-file");
  });
});
