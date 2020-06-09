import { LesyCoreClass } from "../src/core";

import { createFiles, deleteDir } from "@lesy/test-utils";
import { Command } from "../src/model";

describe("Core", () => {
  let data;
  let core: LesyCoreClass;
  let startMwMock;
  let initMwMock;
  let preparseMwMock;
  let postparseMwMock;
  let prevalidateMwMock;
  let prerunMwMock;
  let endMwMock;
  let cmdRunMock;
  beforeAll(() => {
    createFiles(
      {
        "plugin/package.json": `{"name":"plugin","main":"index.js"}`,
        "plugin/middleware.js": "module.exports={on:'END',run:()=>{}}",
        "plugin/feature.js": "module.exports=(x)=>(x.pluginft='abc')",
        "plugin/command.js": "module.exports={name:'plugincmd',run:()=>{}}",
        "plugin/index.js": `module.exports={
            commands:['${__dirname}/plugin/command.js'],
            features:['${__dirname}/plugin/feature.js'],
            middlewares:['${__dirname}/plugin/middleware.js'],
        }`,
      },
      __dirname,
    );
  });
  afterAll(() => {
    deleteDir([`${__dirname}/plugin`]);
  });
  beforeEach(() => {
    startMwMock = jest.fn((x: any) => x);
    initMwMock = jest.fn((x: any) => x);
    preparseMwMock = jest.fn((x: any) => x);
    postparseMwMock = jest.fn((x: any) => x);
    prevalidateMwMock = jest.fn((x: any) => x);
    prerunMwMock = jest.fn((x: any) => x);
    endMwMock = jest.fn((x: any) => x);
    cmdRunMock = jest.fn();

    data = {
      root: `${__dirname}`,
      plugins: [[`plugin`, { conf1: "xyz" }]],
      commands: [
        { name: "hello", run: () => {} },
        { name: "greet", args: { title: { required: true } }, run: () => {} },
        {
          name: "sample",
          args: { title: { required: true } },
          flags: { f1: {} },
          run: cmdRunMock,
        },
      ],
      middlewares: [
        { on: "START", run: startMwMock },
        { on: "INIT", run: initMwMock },
        { on: "PRE_PARSE", run: preparseMwMock },
        { on: "POST_PARSE", run: postparseMwMock },
        { on: "PRE_VALIDATE", run: prevalidateMwMock },
        { on: "PRE_RUN", run: prerunMwMock },
        { on: "END", run: endMwMock },
      ],
      features: [(x: any) => (x.mainft = "one")],
      config: { test: "xyz", defaultCommand: "plugincmd" },
    };
    core = new LesyCoreClass();
  });
  afterEach(() => {
    jest.clearAllMocks();
    startMwMock.mockClear();
    initMwMock.mockClear();
    preparseMwMock.mockClear();
    postparseMwMock.mockClear();
    prevalidateMwMock.mockClear();
    prerunMwMock.mockClear();
    endMwMock.mockClear();
    cmdRunMock.mockClear();
  });

  describe("bootstrap", () => {
    beforeEach(async () => {
      core = await core.bootstrap(data);
    });
    it("should set root property", () => {
      expect(core.root).toEqual(__dirname);
    });
    it("should get all commands", () => {
      expect(
        core["cmdCtrl"].getCommands().map((x: Command) => x.name),
      ).toEqual(["hello", "greet", "sample", "plugincmd"]);
    });
    it("should get all features", () => {
      expect(core["featCtrl"].getFeatures()).toEqual({
        mainft: "one",
        pluginft: "abc",
      });
    });
    it("should get all middlewares", () => {
      expect(core["mwCtrl"].get()).toEqual({
        END: [
          { on: "END", run: expect.any(Function) },
          { on: "END", run: expect.any(Function) },
        ],
        INIT: [{ on: "INIT", run: expect.any(Function) }],
        POST_PARSE: [{ on: "POST_PARSE", run: expect.any(Function) }],
        POST_RUN: [],
        POST_VALIDATE: [],
        PRE_PARSE: [{ on: "PRE_PARSE", run: expect.any(Function) }],
        PRE_RUN: [{ on: "PRE_RUN", run: expect.any(Function) }],
        PRE_VALIDATE: [{ on: "PRE_VALIDATE", run: expect.any(Function) }],
        START: [{ on: "START", run: expect.any(Function) }],
      });
    });
    it("should get config", () => {
      expect(core["config"]).toEqual({
        defaultCommand: "plugincmd",
        test: "xyz",
        plugin: {
          conf1: "xyz",
        },
      });
    });
    it("should get complete state", () => {
      core["state"].allCommands[3].src = "__DUMMY_SRC__";
      expect(core["state"]).toMatchSnapshot({
        root: expect.stringContaining("/packages/core/__tests__"),
      });
    });
    it("should call init middleware", () => {
      expect(initMwMock).toBeCalledWith(
        expect.objectContaining({ allCommands: null }),
      );
    });
    it("should call start middleware", () => {
      expect(startMwMock).toBeCalledWith(
        expect.objectContaining({ allCommands: core["state"].allCommands }),
      );
    });
  });

  describe("run", () => {
    beforeEach(async () => {
      core = await core.bootstrap(data);
      await core.run(["hello", "--name", "john"]);
    });
    it("should call PRE_PARSE hook", () => {
      expect(preparseMwMock).toBeCalledWith(
        expect.objectContaining({ argv: ["hello", "--name", "john"] }),
      );
    });
    it("should call POST_PARSE hook", () => {
      expect(postparseMwMock).toBeCalledWith(
        expect.objectContaining({
          rawArgs: ["hello"],
          rawFlags: { name: "john" },
        }),
      );
    });
    it("should run default command if no args provided", async () => {
      await core.run([]);
      expect(prevalidateMwMock).nthCalledWith(
        2,
        expect.objectContaining({
          runningCommand: expect.objectContaining({ name: "plugincmd" }),
        }),
      );
    });
    it("should validate args", async () => {
      const consoleSpy = jest.spyOn(console, "error");
      jest.spyOn(console, "error").mockImplementationOnce(() => {
        throw new Error("__PROCESS_EXIT__");
      });

      try {
        await core.run(["greet"]);
      } catch (error) {
        expect(consoleSpy).toBeCalledWith(
          "<required> validation failed for [title]",
        );
        expect(error.message).toBe("__PROCESS_EXIT__");
      }
    });
    it("should run PRE_RUN middleware", () => {
      expect(prerunMwMock).toBeCalledTimes(1);
    });
    it("should run END middleware", () => {
      expect(endMwMock).toBeCalledTimes(1);
    });
    it("should run command", async () => {
      await core.run(["sample", "xyz", "--f1", "qaz"]);
      expect(cmdRunMock).toBeCalledWith(
        expect.objectContaining({
          args: { title: "xyz" },
          flags: { f1: "qaz" },
        }),
      );
    });
    it("should capture error if command throws", async () => {
      cmdRunMock.mockImplementationOnce(() => {
        throw new Error("test error");
      });
      await core.run(["sample", "xyz", "--f1", "qaz"]);
      expect(core["state"].cmdRunError.message).toBe("test error");
    });
  });
});
