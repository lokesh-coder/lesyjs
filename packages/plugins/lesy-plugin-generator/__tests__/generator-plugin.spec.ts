import generator from "../src/generator";
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
    generator(feature) as any;
    feature
      .generateFiles({
        data: { filename: "abc" },
        name: "test",
        destination: `${__dirname}/fixtures/outputfiles`,
        source: `${__dirname}/fixtures/templates`,
      })
      .then(() => {
        const data = readFileSync(
          resolve(__dirname, "./fixtures/outputfiles/abc.txt"),
        );
        expect(data.toString()).toBe("hello abc");
        done();
      });
  });
});
