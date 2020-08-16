import { lstatSync, readdirSync, statSync } from "fs";
import { join } from "path";

import { LesyCommand } from "./command";
import { LesyFeature } from "./feature";
import { LesyMiddleware } from "./middleware";
import { Command, Feature, Middleware, Plugin } from "./model";

class LesyLoader {
  private commands: LesyCommand;
  private middlewares: LesyMiddleware;
  private features: LesyFeature;
  private root: string;
  private pluginConfigs = {};

  constructor(
    {
      commands = [],
      features = [],
      middlewares = [],
      plugins = [],
    }: {
      commands?: Command[] | string[];
      features?: string[];
      middlewares?: string[];
      plugins?: Plugin[];
    },
    root: string,
  ) {
    this.root = root;
    this.commands = new LesyCommand();
    this.middlewares = new LesyMiddleware();
    this.features = new LesyFeature(this.root);

    this.loadFeatures(features);
    this.loadCommands(commands);
    this.loadMiddlewares(middlewares);
    this.loadPlugins(plugins);
  }

  /* commands */
  loadCommandFromFile(path: string): void {
    const rawCmd = this.getModuleFromFile(path) as Command | Function;
    this.loadCommandFromObject(rawCmd, path);
  }
  loadCommandsFromDir(dir: string): void {
    this.getFiles(dir).map((path: string) => this.loadCommandFromFile(path));
  }
  loadCommandFromObject(rawCmd: Command | Function, src: string): void {
    this.commands.addCommandFromRawObject(rawCmd, src);
  }
  loadCommands(cmds: (string | Command)[]): void {
    cmds.forEach((cmd: string | Command) => {
      if (typeof cmd !== "string") {
        return this.loadCommandFromObject(cmd, "__OBJ__");
      }
      this.loadFilesAndDirs(cmd, "Command");
    });
  }

  getCommand(): LesyCommand {
    return this.commands;
  }

  /* middlewares */
  loadMiddlewareFromFile(path: string): void {
    const middleware = this.getModuleFromFile(path);
    this.middlewares.add(middleware["default"] || middleware);
  }
  loadMiddlewaresFromDir(dir: string): void {
    this.getFiles(dir).map((p: string) => this.loadMiddlewareFromFile(p));
  }
  loadMiddlewaresFromObject(rawMw: Middleware): void {
    this.middlewares.add(rawMw);
  }
  loadMiddlewares(middlewares: string[] | Middleware[]): void {
    middlewares.forEach((pathOrObj: Middleware | string) => {
      if (typeof pathOrObj === "object") {
        return this.loadMiddlewaresFromObject(pathOrObj);
      }
      this.loadFilesAndDirs(pathOrObj, "Middleware");
    });
  }

  getMiddlewares(): LesyMiddleware {
    return this.middlewares;
  }

  /* features */
  loadFeatureFromFile(path: string): void {
    const feature = this.getModuleFromFile(path) as Feature;
    this.features.add(feature);
  }
  loadFeaturesFromDir(dir: string): void {
    this.getFiles(dir).map((p: string) => this.loadFeatureFromFile(p));
  }
  loadFeaturesFromObject(rawFeature: Feature): void {
    this.features.add(rawFeature);
  }
  loadFeatures(features: (string | Feature)[]): void {
    features.forEach((pathOrFn: Feature | string) => {
      if (typeof pathOrFn !== "string") {
        return this.features.add(pathOrFn);
      }
      this.loadFilesAndDirs(pathOrFn, "Feature");
    });
  }

  getFeature(): LesyFeature {
    return this.features;
  }

  /* plugins */
  loadPluginFromFile(path: string): void {
    let plugin = this.getModuleFromFile(path);
    plugin = plugin["default"] || plugin;
    this.loadCommands(plugin["commands"] || []);
    this.loadMiddlewares(plugin["middlewares"] || []);
    this.loadFeatures(plugin["features"] || []);
  }
  loadPluginFromDir(dir: string): void {
    const pluginPath = require.resolve(dir);
    this.loadPluginFromFile(pluginPath);
  }
  loadPlugins<T>(paths: Plugin[]): void {
    paths.forEach((plugin: T extends string ? string : never) => {
      let pathOrName = plugin;
      if (Array.isArray(plugin)) {
        this.pluginConfigs[plugin[0]] = plugin[1] || {};
        pathOrName = plugin[0];
      }
      try {
        const isFile = lstatSync(pathOrName).isFile();
        if (isFile) return this.loadPluginFromFile(pathOrName);
        const isDir = lstatSync(pathOrName).isDirectory();
        if (isDir) {
          return this.getDirectories(pathOrName).map((dir: string) =>
            this.loadPluginFromDir(dir),
          );
        }
      } catch (e) {}
      try {
        const pluginModule = require.resolve(pathOrName, {
          paths: [this.root],
        });
        this.loadPluginFromFile(pluginModule);
      } catch (e) {
        console.log(`${pathOrName} is not loaded`);
        console.log(`Error: ${e.message}`);
      }
    });
  }

  getPluginConfigs() {
    return this.pluginConfigs;
  }

  private formatPath(path: string): string {
    const isRemoteModule = path.includes("/node_modules/");
    const isJsProject = process.env.LESY_LANG === "js";
    return isRemoteModule || isJsProject ? path.replace(/\.ts$/, ".js") : path;
  }

  private getModuleFromFile(path: string): object {
    const formattedPath = this.formatPath(path);
    const module = require(formattedPath);
    return module.default || module;
  }

  private getDirectories(path: string): string[] {
    return readdirSync(path)
      .filter((fileOrDir: string) =>
        statSync(join(path, fileOrDir)).isDirectory(),
      )
      .map((dir: string) => join(path, dir));
  }

  private getFiles(path: string): string[] {
    const filePaths: string[] = [];

    const loop = (p: string): void => {
      readdirSync(p).forEach((file: string) => {
        const fullPath = join(p, file);
        if (lstatSync(fullPath).isDirectory()) {
          loop(fullPath);
        } else {
          if (this.isAllowedFile(file)) filePaths.push(fullPath);
        }
      });
    };
    loop(path);
    return filePaths;
  }

  private isAllowedFile(path: string) {
    if (path.startsWith("_")) return false;
    const ext = path.split(".");
    const lastIndex = ext.length - 1;
    if (process.env.LESY_LANG === "js") {
      return ext[lastIndex] === "js";
    }
    return ext[lastIndex] !== "map" && ext[lastIndex - 1] !== "d";
  }

  private loadFilesAndDirs(fileOrDirName: string, name: string): void {
    const fileOrDir = this.formatPath(fileOrDirName);
    const isFile = lstatSync(fileOrDir).isFile();
    if (isFile) return this[`load${name}FromFile`](fileOrDir);
    const isDir = lstatSync(fileOrDir).isDirectory();
    if (isDir) return this[`load${name}sFromDir`](fileOrDir);

    throw new Error(`invalid ${name}`);
  }
}

export { LesyLoader };
