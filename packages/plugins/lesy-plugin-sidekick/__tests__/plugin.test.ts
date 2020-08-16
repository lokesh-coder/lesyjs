import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
import configstore from "configstore";
// tslint:disable-next-line: import-name
import PluginData from "../src";

describe("@lesy/lesy-plugin-sidekick", () => {
  describe("Features", () => {
    let testBed;
    beforeEach(() => {
      testBed = new LesyTestBed({
        isTypescriptApp: true,
        loadDefaultPlugins: false,
        root: resolve(__dirname, "./fixtures"),
        commands: [
          {
            run: ({ feature }) => console.log(feature.pkg.name),
          },
        ],
        ...PluginData,
      });
    });

    it("should fetch package json file", async () => {
      const response = await testBed.run([]);
      expect(response).toContain("test-file");
    });

    it("should return empty object if no package file found", async () => {
      testBed.data.root = resolve(__dirname, "./fixtures/xyz");
      const response = await testBed.run([]);
      expect(response).toContain("undefined");
    });
  });

  describe("Error Middleware", () => {
    let testBed;
    beforeEach(() => {
      testBed = new LesyTestBed({
        isTypescriptApp: true,
        loadDefaultPlugins: false,
        root: resolve(__dirname, "../"),
        commands: [
          {
            run: () => {
              throw new Error("error occured");
            },
          },
          {
            name: "hello",
            run: () => console.log("hello everyone"),
          },
        ],
        ...PluginData,
      });
    });

    it("should display error stack on runtime errors", async () => {
      const response = await testBed.run([]);
      expect(response).toContain("error occured");
      expect(response).toContain("at Object.run");
      expect(response).toContain("at LesyCoreClass.run");
    });

    it("should not do anything if no error occurs", async () => {
      const response = await testBed.run(["hello"]);
      expect(response).toContain("hello everyone");
    });
  });

  describe("Version Middleware", () => {
    let testBed;
    let mockExit;
    beforeEach(() => {
      testBed = new LesyTestBed({
        isTypescriptApp: true,
        loadDefaultPlugins: false,
        root: resolve(__dirname, "./fixtures"),
        config: {
          version: {
            enable: true,
            flags: ["-v", "--version"],
          },
        },
        commands: [
          {
            name: "hello",
            run: () => console.log("hello everyone"),
          },
        ],
        ...PluginData,
      });
      mockExit = jest
        .spyOn(process, "exit")
        .mockImplementationOnce((() => {}) as never);
    });
    afterEach(() => {
      mockExit.mockRestore();
      mockExit.mockReset();
    });

    it("should display version", async () => {
      const response = await testBed.run(["hello", "-v"]);
      expect(response).toContain("version 2.4.0");
      expect(mockExit).toBeCalledTimes(1);
    });

    it("should display version if expanded flag is provided", async () => {
      const response = await testBed.run(["hello", "--version"]);
      expect(response).toContain("version 2.4.0");
      expect(mockExit).toBeCalledTimes(1);
    });

    it("should not display version if config is disabled", async () => {
      testBed.data.config.version.enable = false;
      const response = await testBed.run(["hello", "--version"]);
      expect(response).toContain("hello everyone");
      expect(mockExit).not.toBeCalled();
    });
  });
});
