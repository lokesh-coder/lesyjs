import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
import configstore from "configstore";
// tslint:disable-next-line: import-name
import PluginData from "../src";

jest.mock("inquirer", () => {
  return {
    prompt: "mock prompt",
  };
});

describe("@lesy/lesy-plugin-prompt", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "./fixtures"),
      commands: [
        {
          run: ({ feature }) => console.log(feature.prompt),
        },
        {
          name: "customprompt",
          run: ({ feature }) => {
            feature.promptConfig.customPrompt = "custom prompt";
            console.log(feature.prompt);
          },
        },
      ],
      ...PluginData,
    });
  });

  it("should call prompt plugin", async () => {
    const response = await testBed.run([]);
    expect(response).toContain("mock prompt");
  });

  it("should call custom prompt", async () => {
    const response = await testBed.run(["customprompt"]);
    expect(response).toContain("custom prompt");
  });
});
