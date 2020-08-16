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
    const addCmdRawObjSpy = jest.fn();
    const featAddSpy = jest.fn();
    const mwAddSpy = jest.fn();
    beforeAll(() => {
      createFiles(loaderdata(flavor, __dirname), __dirname);
      buildFiles(`loaderfiles/ts`, `loaderfiles/js`, __dirname);
    });

    beforeEach(() => {
      (LesyCommand as any).mockImplementation(() => ({
        addCommandFromRawObject: addCmdRawObjSpy,
      }));

      (LesyFeature as any).mockImplementation(() => ({
        add: featAddSpy,
      }));

      (LesyMiddleware as any).mockImplementation(() => ({
        add: mwAddSpy,
      }));
    });
    beforeEach(() => {
      loader = new LesyLoader({}, "");
    });

    afterEach(() => {
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
    });

    describe("command", () => {
      it("should load cmd from obj and pass to cmd class", () => {
        loader.loadCommandFromObject(
          { name: "testcmd", run: () => {} },
          "__OBJ__",
        );
        expect(addCmdRawObjSpy).toBeCalledWith(
          { name: "testcmd", run: expect.any(Function) },
          "__OBJ__",
        );
      });
      it("should load cmd from file and pass to cmd class", () => {
        loader.loadCommandFromFile(p`cmddir/cmddir0/cmdfile0`);
        expect(addCmdRawObjSpy).toBeCalledWith(
          { name: "cmd0-0", run: expect.any(Function) },
          expect.stringContaining(
            `${flavor}/cmddir/cmddir0/cmdfile0.${flavor}`,
          ),
        );
      });
      it("should load cmds from dir and pass to cmd class", () => {
        loader.loadCommandsFromDir(d`cmddir`);
        expect(
          addCmdRawObjSpy.mock.calls.map((x: any[]) => x[0].name),
        ).toEqual(["cmd0-1-0", "cmd0-1-1", "cmd0-0", "cmd0-1"]);
      });

      it("should load cmds from mixed types and pass to cmd class", () => {
        loader.loadCommands([
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
        ]);
        expect(addCmdRawObjSpy.mock.calls.length).toEqual(6);
      });

      it("should return command instance", () => {
        expect(loader.getCommand()).toEqual({
          addCommandFromRawObject: expect.any(Function),
        });
      });
    });

    describe("Middleware", () => {
      it("should load mw from obj and pass to mw istance", () => {
        loader.loadMiddlewaresFromObject({ on: "START", run: () => {} } as any);
        expect(mwAddSpy).toBeCalledWith({
          on: "START",
          run: expect.any(Function),
        });
      });

      it("should load mw from file and pass to mw instance", () => {
        loader.loadMiddlewareFromFile(p`mwdir/mwdir0/mwfile0`);
        expect(mwAddSpy).toBeCalledWith({
          on: "START",
          run: expect.any(Function),
        });
      });

      it("should load mws from dir and pass to mw instance", () => {
        loader.loadMiddlewaresFromDir(d`mwdir/mwdir0`);
        expect(mwAddSpy.mock.calls.length).toEqual(4);
      });

      it("should load mws from mixed types and pass to mw instance", () => {
        loader.loadMiddlewares([
          { on: "START", run: () => {} } as any,
          p`mwdir/mwdir0/mwfile1`,
          d`mwdir/mwdir0/mwdir1`,
        ]);
        expect(mwAddSpy.mock.calls.length).toEqual(4);
      });

      it("should return middleware instance", () => {
        expect(loader.getMiddlewares()).toEqual({
          add: expect.any(Function),
        });
      });
    });

    describe("Feature", () => {
      it("should load feature from obj and pass to ft istance", () => {
        loader.loadFeaturesFromObject((f: any) => {
          f.x = "x";
        });
        expect(featAddSpy).toBeCalledWith(expect.any(Function));
      });

      it("should load feature from file and pass to ft instance", () => {
        loader.loadFeatureFromFile(p`ftdir/ftdir0/ftfile0`);
        expect(featAddSpy).toBeCalledWith(expect.any(Function));
      });

      it("should load features from dir and pass to ft instance", () => {
        loader.loadFeaturesFromDir(d`ftdir`);
        expect(featAddSpy.mock.calls.length).toEqual(4);
      });

      it("should load features from mixed types and pass to ft instance", () => {
        loader.loadFeatures([
          (f: any) => {
            f.x = "x";
          },
          p`ftdir/ftdir0/ftfile1`,
          d`ftdir/ftdir0/ftdir1`,
        ]);
        expect(featAddSpy.mock.calls.length).toEqual(4);
      });

      it("should return feature instance", () => {
        expect(loader.getFeature()).toEqual({
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
          it("should load command", () => {
            loader[method](path);
            expect(
              addCmdRawObjSpy.mock.calls.map((x: any[]) => x[0].name),
            ).toEqual([
              "plugincmd0-0",
              "plugincmd0-1-0",
              "plugincmd0-1-1",
              "pluginrawcmd",
            ]);
          });
          it("should load middleware", () => {
            loader[method](path);
            expect(mwAddSpy.mock.calls[0][0]).toEqual({
              on: "START",
              run: expect.any(Function),
            });
          });
          it("should load feature", () => {
            loader[method](path);
            expect(featAddSpy.mock.calls[0][0]).toEqual(expect.any(Function));
          });
        },
      );
      describe("loadPlugins", () => {
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
          expect(loader.getPluginConfigs()).toEqual({
            plugindir: {
              name: "test",
            },
          });
        });
      });
    });
  });
});
