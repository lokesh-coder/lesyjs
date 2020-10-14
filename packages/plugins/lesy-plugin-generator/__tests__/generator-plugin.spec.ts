import generatorFeature from "../src/generator.feature";
import { LesyCoreClass } from "@lesy/core";
import {
  existsSync,
  readdirSync,
  lstatSync,
  unlinkSync,
  rmdirSync,
  readFileSync,
} from "fs";
import { resolve } from "path";

describe("lesy-plugin-generator", () => {
  const deleteFolderRecursive = function (path: string) {
    if (existsSync(path)) {
      readdirSync(path).forEach((file: string) => {
        const curPath = `${path}/${file}`;
        if (lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          unlinkSync(curPath);
        }
      });
      rmdirSync(path);
    }
  };

  afterEach(() => {
    deleteFolderRecursive(resolve(__dirname, "./fixtures/outputfiles"));
  });

  it("should be injected properly", async () => {
    const bootstrap = (await new LesyCoreClass().bootstrap({
      plugins: [resolve(__dirname, "../src/index.ts")],
    })) as any;
    expect(bootstrap.state.feature.generateFiles).toBeTruthy();
  });

  it("should generate files", (done: any) => {
    const feature = {} as any;
    generatorFeature(feature) as any;
    feature
      .generateFiles({
        data: { filename: "abc" },
        name: "test",
        destination: `${__dirname}/fixtures/outputfiles/`,
        source: `${__dirname}/fixtures/dynamic`,
      })
      .then(() => {
        const data = readFileSync(
          resolve(__dirname, "./fixtures/outputfiles/abc.txt"),
        );
        expect(data.toString()).toBe("hello ABC");
        done();
      });
  });

  it("should use handlebars instance", (done: any) => {
    const feature = {} as any;
    generatorFeature(feature) as any;

    const handlebarsIns = (hb) => {
      hb.registerHelper("comma", (string) => {
        return string.split("").join(",");
      });
    };

    feature
      .generateFiles({
        data: { filename: "abc", user: "jim" },
        name: "test",
        destination: `${__dirname}/fixtures/outputfiles`,
        source: `${__dirname}/fixtures/static`,
        handlebarsInstance: handlebarsIns,
      })
      .then(() => {
        const data = readFileSync(
          resolve(__dirname, "./fixtures/outputfiles/ins.txt"),
        );
        expect(data.toString()).toBe("j,i,m");
        done();
      });
  });

  it("should use handlebars options", (done: any) => {
    const feature = {} as any;
    generatorFeature(feature) as any;

    feature
      .generateFiles({
        data: { filename: "abc", user: "jim" },
        name: "test",
        destination: `${__dirname}/fixtures/outputfiles`,
        source: `${__dirname}/fixtures/static`,
        handebarsOptions: {
          helpers: {
            comma: (str: string) => str.split("").join("-,-"),
          },
        },
      })
      .then(() => {
        const data = readFileSync(
          resolve(__dirname, "./fixtures/outputfiles/ins.txt"),
        );
        expect(data.toString()).toBe("j-,-i-,-m");
        done();
      });
  });
});
