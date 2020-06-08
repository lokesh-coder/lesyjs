import { existsSync } from "fs";

class LesyCompiler {
  opts: any = {
    isTypescriptApp: false,
    loadDefaultPlugins: true,
    srcFilePath: "src/index.ts",
    tsFlag: "--ts",
    root: null,
    customTsConfig: null,
  };

  private defaultPlugins = ["@lesy/lesy-plugin-sidekick"];
  private defaultConfig = {
    version: { enable: true, flags: ["--version", "-v"] },
    defaultCommand: "default",
  };
  private tsConfigPath = null;

  exec(opts = {}) {
    this.opts = { ...this.opts, ...opts };
    const {
      isTypescriptApp,
      root,
      srcFilePath,
      tsFlag,
      loadDefaultPlugins,
      customTsConfig,
      ...src
    } = this.opts;
    const hasSrcData = Object.keys(src).length > 0;
    const hasBuildDir = existsSync(`${root}/dist`);
    const shouldRunTSCode = process.argv.includes(tsFlag);
    let mainFilePath: string;
    process.env.LESY_LANG = "js";
    if (!isTypescriptApp) {
      mainFilePath = !hasSrcData && require.resolve(root);
    } else {
      if ((hasBuildDir && shouldRunTSCode) || !hasBuildDir) {
        // run src
        process.env.LESY_LANG = "ts";
        mainFilePath = `${root}/${srcFilePath}`;
        this.tsConfigPath = customTsConfig || `${root}/tsconfig.json`;
        this.registerTSNode();
        this.registerPaths();
      } else {
        // run dist
        mainFilePath = !hasSrcData && require.resolve(root);
      }
    }

    return this.runApp(hasSrcData ? src : require(mainFilePath));
  }

  private registerTSNode() {
    const tsNode = require("ts-node");
    tsNode.register({
      transpileOnly: true,
      typeCheck: false,
      project: this.tsConfigPath,
    });
  }

  private registerPaths() {
    if (!require(this.tsConfigPath)["compilerOptions"]["paths"]) {
      return;
    }
    const tsPaths = require("tsconfig-paths");
    const config = tsPaths.loadConfig(this.tsConfigPath); // todo: duplicate
    tsPaths.register({ baseUrl: config.absoluteBaseUrl, paths: config.paths });
  }

  private runApp(appData) {
    const { LesyCore, LesyCoreClass } = require("@lesy/core");
    const { root } = this.opts;
    Object.assign(appData, this.includeEssentials(appData));

    const lesy = LesyCore.bootstrap({ ...appData, root }).catch((e: any) =>
      console.log("LESY ERROR:", e),
    );

    return {
      parse: (argv: string[]) =>
        lesy.then((l: typeof LesyCoreClass) =>
          l.run(argv || process.argv.slice(2)),
        ),
    };
  }

  private includeEssentials(appData) {
    let { plugins = [], config = {} } = appData;
    if (this.opts.loadDefaultPlugins) {
      plugins = [
        ...this.defaultPlugins.map((p: string) => require.resolve(p)),
        ...plugins,
      ];
    }
    config = { ...this.defaultConfig, ...config };
    return { ...appData, plugins, config };
  }
}

const compiler = new LesyCompiler();
module.exports = compiler.exec.bind(compiler);
