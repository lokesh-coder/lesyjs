import { existsSync } from "fs";
import { LesyCoreClass } from "@lesy/core";
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
    Object.assign(this.opts, opts);
    const src = {
      commands: this.opts.commands || [],
      middlewares: this.opts.middlewares || [],
      features: this.opts.features || [],
      plugins: this.opts.plugins || [],
      config: this.opts.config || {},
      validators: this.opts.validators || [],
    };
    const hasSrcData = this.opts.commands;
    let mainFilePath: string;
    process.env.LESY_LANG = "js";
    if (!this.opts.isTypescriptApp) {
      mainFilePath = !hasSrcData && require.resolve(this.opts.root);
    } else {
      const { root, tsFlag, srcFilePath, customTsConfig } = this.opts;
      const hasBuildDir = existsSync(`${root}/dist`);
      const shouldRunTSCode = process.argv.includes(tsFlag);
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
    this.includeEssentials(appData);
    appData.root = this.opts.root;
    const lesy = new LesyCoreClass()
      .bootstrap(appData)
      .catch((e: any) => console.log("LESY ERROR:", e));
    return {
      parse: (argv: string[]) =>
        lesy.then((l: any) => {
          if (global["lesyWorkspace"]) return l;
          return l.run(argv || process.argv.slice(2));
        }),
    };
  }

  private includeEssentials(appData) {
    if (this.opts.loadDefaultPlugins) {
      appData.plugins = [
        ...this.defaultPlugins.map((p: string) => require.resolve(p)),
        ...(appData.plugins || []),
      ];
    }
    const config = { ...this.defaultConfig }; // todo: refactor to imprv perf
    for (const prop in appData.config) config[prop] = appData.config[prop];
    appData.config = config;
  }
}

const compiler = new LesyCompiler();
module.exports = compiler.exec.bind(compiler);
