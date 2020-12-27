import { LesyLoader } from "../src/loader";
import { LesyCommand } from "../src/command";
import { LesyFeature } from "../src/feature";
import { LesyMiddleware } from "../src/middleware";
// tslint:disable-next-line: import-name
import loaderdata from "./helpers/loaderdata.provider";
import { createFiles, buildFiles, deleteDir } from "@lesy/test-utils";

jest.mock("../src/command");
jest.mock("../src/feature");
jest.mock("../src/middleware");

describe("LESY:Loader", () => {
  describe.each(["js", "ts"])("test %s", (flavor: string) => {
    let p: Function;
    let d: Function;
    let loader: LesyLoader;
    let mockExit;
    const addCmdRawObjSpy = jest.fn();
    const featAddSpy = jest.fn();
    const mwAddSpy = jest.fn();
    beforeAll(() => {
      createFiles(loaderdata(flavor, __dirname), __dirname);
      buildFiles(`loaderfiles/ts`, `loaderfiles/js`, __dirname);
    });

    beforeEach(() => {
      (LesyCommand as any).mockImplementation(() => ({
        add: addCmdRawObjSpy,
      }));

      (LesyFeature as any).mockImplementation(() => ({
        add: featAddSpy,
      }));

      (LesyMiddleware as any).mockImplementation(() => ({
        add: mwAddSpy,
      }));
      mockExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
        throw new Error("__PROCESS_EXIT__");
      });
    });
    beforeEach(() => {
      loader = new LesyLoader({}, "");
    });

    afterEach(() => {
      mockExit.mockRestore();
      jest.resetAllMocks();
    });

    afterAll(() => {
      deleteDir([`${__dirname}/loaderfiles`]);
    });
    beforeAll(() => {
      const rootPath = `${__dirname}/loaderfiles/${flavor}/`;
      p = (path: string) => `${rootPath}${path}.${flavor}`;
      d = (path: string) => `${rootPath}${path}`;
      process.env = Object.assign(process.env, { LESY_LANG: flavor });
    });

    describe("Utils", () => {
      it("should get module from ts file", () => {
        expect(loader["getModuleFromFile"](p`dir0/file0`)).toEqual({
          abc: "xyz",
        });
      });

      it("should get all files from dir", () => {
        expect(
          loader["getFiles"](d`dummydir`).filter((x: string) =>
            x.includes("/dummydir/dir0/file"),
          ).length,
        ).toEqual(2);
      });

      it("should exclude file with _ prefix", () => {
        expect(loader["isAllowedFile"](p`dummy.file`)).toBeTruthy();
        expect(loader["isAllowedFile"](p`_dummy.file`)).toBeFalsy();
      });

      it("should exclude invalid files", () => {
        expect(loader["isAllowedFile"](p`dummy.file`)).toBeTruthy();
        const allowDefFile = flavor === "js";
        expect(loader["isAllowedFile"](p`dummy.file.d`)).toEqual(allowDefFile);
        expect(loader["isAllowedFile"](`dummy.file.${flavor}.map`)).toBeFalsy();
      });

      it("should get all directories from given path", () => {
        expect(
          loader["getDirectories"](d`dummydir`).filter((x: string) =>
            x.includes("/dummydir/dir"),
          ).length,
        ).toEqual(1);
      });

      it("should get full path based on language", () => {
        expect(loader["formatPath"](p`dummydir/dir0/file1`)).toContain(
          `/loaderfiles/${flavor}/dummydir/dir0/file1.${flavor}`,
        );
      });
      it("should throw exception when path is invalid", () => {
        expect(() => loader["loadFilesAndDirs"]("aaa", "cmd")).toThrowError(
          /^ENOENT: no such file or directory, lstat 'aaa'$/,
        );
      });
    });

    describe("command", () => {
      it("should load cmd from obj and pass to cmd class", () => {
        loader.loadFromObject(
          { name: "testcmd", run: () => {} },
          "__OBJ__",
          "cmd",
        );
        expect(addCmdRawObjSpy).toBeCalledWith(
          { name: "testcmd", run: expect.any(Function) },
          "__OBJ__",
        );
      });
      it("should load cmd from file and pass to cmd class", () => {
        loader.loadFromFile(p`cmddir/cmddir0/cmdfile0`, "cmd");
        expect(addCmdRawObjSpy).toBeCalledWith(
          { name: "cmd0-0", run: expect.any(Function) },
          expect.stringContaining(
            `${flavor}/cmddir/cmddir0/cmdfile0.${flavor}`,
          ),
        );
      });
      it("should load cmds from dir and pass to cmd class", () => {
        loader.loadFromDir(d`cmddir`, "cmd");
        expect(
          addCmdRawObjSpy.mock.calls.map((x: any[]) => x[0].name),
        ).toEqual(["cmd0-1-0", "cmd0-1-1", "cmd0-0", "cmd0-1"]);
      });

      it("should load cmds from mixed types and pass to cmd class", () => {
        loader.load(
          [
            { name: "abccmd", run: () => {} },
            ((c: any) => {
              c.name = "foo";
              c.run = () => {};
            }) as any,
            class Abc {
              name = "one";
              run() {}
            },
            d`cmddir/cmddir0/cmddir1`,
            p`cmddir/cmddir0/cmdfile0`,
          ],
          "cmd",
        );
        expect(addCmdRawObjSpy.mock.calls.length).toEqual(6);
      });

      it("should return command instance", () => {
        expect(loader.cmdCtrl).toEqual({
          add: expect.any(Function),
        });
      });
    });

    describe("Middleware", () => {
      beforeEach(() => {
        loader.mwCtrl = new LesyMiddleware();
      });
      afterAll(() => {
        loader.mwCtrl = null;
      });
      it("should load mw from obj and pass to mw istance", () => {
        loader.loadFromObject(
          { on: "START", run: () => {} } as any,
          null,
          "mw",
        );
        expect(mwAddSpy).toBeCalledWith(
          {
            on: "START",
            run: expect.any(Function),
          },
          null,
        );
      });

      it("should load mw from file and pass to mw instance", () => {
        loader.loadFromFile(p`mwdir/mwdir0/mwfile0`, "mw");
        expect(mwAddSpy).toBeCalledWith(
          {
            on: "START",
            run: expect.any(Function),
          },
          p`mwdir/mwdir0/mwfile0`,
        );
      });

      it("should load mws from dir and pass to mw instance", () => {
        loader.loadFromDir(d`mwdir/mwdir0`, "mw");
        expect(mwAddSpy.mock.calls.length).toEqual(4);
      });

      it("should load mws from mixed types and pass to mw instance", () => {
        loader.load(
          [
            { on: "START", run: () => {} } as any,
            p`mwdir/mwdir0/mwfile1`,
            d`mwdir/mwdir0/mwdir1`,
          ],
          "mw",
        );
        expect(mwAddSpy.mock.calls.length).toEqual(4);
      });

      it("should return middleware instance", () => {
        expect(loader.mwCtrl).toEqual({
          add: expect.any(Function),
        });
      });
    });

    describe("Feature", () => {
      beforeEach(() => {
        loader.featCtrl = new LesyFeature("");
      });
      afterAll(() => {
        loader.featCtrl = null;
      });
      it("should load feature from obj and pass to ft istance", () => {
        loader.loadFromObject(
          (f: any) => {
            f.x = "x";
          },
          null,
          "feat",
        );
        expect(featAddSpy).toBeCalledWith(expect.any(Function), null);
      });

      it("should load feature from file and pass to ft instance", () => {
        loader.loadFromFile(p`ftdir/ftdir0/ftfile0`, "feat");
        expect(featAddSpy).toBeCalledWith(
          expect.any(Function),
          p`ftdir/ftdir0/ftfile0`,
        );
      });

      it("should load features from dir and pass to ft instance", () => {
        loader.loadFromDir(d`ftdir`, "feat");
        expect(featAddSpy.mock.calls.length).toEqual(4);
      });

      it("should load features from mixed types and pass to ft instance", () => {
        loader.load(
          [
            (f: any) => {
              f.x = "x";
            },
            p`ftdir/ftdir0/ftfile1`,
            d`ftdir/ftdir0/ftdir1`,
          ],
          "feat",
        );
        expect(featAddSpy.mock.calls.length).toEqual(4);
      });

      it("should return feature instance", () => {
        expect(loader.featCtrl).toEqual({
          add: expect.any(Function),
        });
      });
    });

    describe("Plugin", () => {
      describe.each(["file", "dir"])(
        "load plugin from %s",
        (pathtype: string) => {
          let path;
          let method;
          beforeAll(() => {
            path = pathtype === "file" ? p`plugindir/index` : d`plugindir`;
            method =
              pathtype === "file" ? "loadPluginFromFile" : "loadPluginFromDir";
          });
          it("should load all commands", () => {
            loader[method](path);
            expect(loader.commands.length).toEqual(3);
            expect(loader.commands[0]).toEqual(p`plugindir/cmddir0/cmdfile0`);
            expect(loader.commands[1]).toEqual(d`plugindir/cmddir0/cmddir1`);
            expect(loader.commands[2].name).toEqual("pluginrawcmd");
          });
          it("should load all middleware", () => {
            loader[method](path);
            expect(loader.middlewares.length).toEqual(3);
            expect(loader.middlewares[0]).toEqual(p`plugindir/mwdir0/mwfile0`);
            expect(loader.middlewares[1]).toEqual(d`plugindir/mwdir0/mwdir1`);
            expect(loader.middlewares[2].on).toEqual("END");
          });
          it("should load all features", () => {
            loader[method](path);
            expect(loader.features.length).toEqual(3);
            expect(loader.features[0]).toEqual(p`plugindir/ftdir0/ftfile0`);
            expect(loader.features[1]).toEqual(d`plugindir/ftdir0/ftdir1`);
            expect(typeof loader.features[2]).toEqual("function");
          });
        },
      );
      describe("loadPlugins", () => {
        it("should load plugin from object", () => {
          const loadPluginFromObjSpy = jest.spyOn(
            loader,
            "loadPluginFromObject",
          );
          const objCmds = { commands: [{ name: "abc", run: () => {} }] };
          loader.loadPlugins([objCmds]);
          expect(loadPluginFromObjSpy).toBeCalledWith(
            expect.objectContaining(objCmds),
          );
        });
        it("should load plugin from file path", () => {
          const loadPluginFromFileSpy = jest.spyOn(
            loader,
            "loadPluginFromFile",
          );
          loader.loadPlugins([p`plugindir/index`]);
          expect(loadPluginFromFileSpy).toBeCalledWith(
            expect.stringContaining("plugindir/index"),
          );
        });
        it("should load plugin from dir path", () => {
          const loadPluginFromDirSpy = jest.spyOn(loader, "loadPluginFromDir");
          loader.loadPlugins([d`plugindir`, d`plugindir`]);
          expect(loadPluginFromDirSpy).toBeCalledTimes(2);
        });

        it("should resolve plugin from name", () => {
          const loadPluginFromFileSpy = jest.spyOn(
            loader,
            "loadPluginFromFile",
          );
          loader["root"] = d``;
          loader.loadPlugins(["plugindir"]);
          expect(loadPluginFromFileSpy).toBeCalledWith(
            expect.stringContaining("plugindir/index"),
          );
        });

        it("should collect plugin options when provided", () => {
          jest.spyOn(loader, "loadPluginFromFile");
          loader["root"] = d``;
          loader.loadPlugins([["plugindir", { name: "test" }]]);
          expect(loader.pluginConfigs).toEqual({
            plugindir: {
              name: "test",
            },
          });
        });

        it("should load plugins plugin if provided in config", () => {
          jest.spyOn(loader, "loadPluginFromFile");
          loader["root"] = d``;
          loader.loadPlugins([
            [
              "plugindir",
              { plugins: ["pluginsplugindir", p`pluginsplugindir/hello`] },
            ],
          ]);
          expect(loader.pluginConfigs).toEqual({
            plugindir: {
              plugins: [
                {
                  module: {
                    code: "PLUGINS_PLUGIN_CONTENT",
                    id: 2,
                  },
                  src: "pluginsplugindir",
                },
                {
                  module: {
                    code: "PLUGINS_PLUGIN_HELLO",
                    id: 1,
                  },
                  src: p`pluginsplugindir/hello`,
                },
              ],
            },
          });
        });

        it("should show error if plugin source in invalid", () => {
          const logSpy = jest.spyOn(console, "log");
          loader.loadPlugins(["abc"]);
          expect(logSpy).toBeCalledWith("abc is not loaded");
          expect(logSpy).toBeCalledWith(
            expect.stringContaining(
              "Error: Cannot resolve module 'abc' from paths ['']",
            ),
          );
        });
      });
    });
  });
});
