import { lstatSync, readdirSync, statSync } from "fs";
import { join, sep } from "path";

import { Command, Plugin } from "./model";
import { LesyCommand } from "./command";

class LesyLoader {
  private root: string;
  pluginConfigs = {};
  cmdCtrl: any;
  mwCtrl: any;
  featCtrl: any;

  commands: any[] = [];
  middlewares: any[] = [];
  features: any[] = [];
  validators: any[] = [];

  constructor(
    {
      commands = [],
      features = [],
      middlewares = [],
      plugins = [],
      validators = [],
    }: {
      commands?: Command[] | string[];
      features?: string[];
      middlewares?: string[];
      validators?: any[];
      plugins?: Plugin[];
    },
    root: string,
  ) {
    this.root = root;
    const corePlugin = { commands, middlewares, features, validators };
    this.loadPlugins([corePlugin, ...plugins]);
  }

  loadFromObject(item: any, path: string, type: string) {
    this[`${type}Ctrl`].add(item, path);
  }
  loadFromFile(path: string, type: string) {
    const item = this.getModuleFromFile(path);
    this.loadFromObject(item, path, type);
  }
  loadFromDir(dir: string, type: string) {
    this.getFiles(dir).map((path: string) => this.loadFromFile(path, type));
  }
  load(items: any[], type: string) {
    items.forEach((item) => {
      if (typeof item !== "string") {
        return this.loadFromObject(item, "__OBJ__", type);
      }
      this.loadFilesAndDirs(item, type);
    });
  }

  loadPluginFromObject({
    commands = [],
    middlewares = [],
    features = [],
    validators = [],
  }): void {
    this.commands = this.commands.concat(commands);
    this.middlewares = this.middlewares.concat(middlewares);
    this.features = this.features.concat(features);
    this.validators = this.validators.concat(validators);
  }
  loadPluginFromFile(path: string): void {
    let plugin = this.getModuleFromFile(path);
    plugin = plugin["default"] || plugin;
    this.loadPluginFromObject(plugin);
  }
  loadPluginFromDir(dir: string): void {
    const pluginPath = require.resolve(dir);
    this.loadPluginFromFile(pluginPath);
  }
  loadPlugins(paths: Plugin[]): void {
    paths.forEach((pluginSource: any) => {
      if (Array.isArray(pluginSource)) {
        const [pluginPath, pluginConfig = {}] = pluginSource;
        this.pluginConfigs[pluginPath] = this.loadPluginsPlugins(pluginConfig);
        // tslint:disable-next-line: no-parameter-reassignment
        pluginSource = pluginPath;
      }
      try {
        const isObject = typeof pluginSource === "object";
        if (isObject) return this.loadPluginFromObject(pluginSource);
        const isFile = lstatSync(pluginSource).isFile();
        if (isFile) return this.loadPluginFromFile(pluginSource);
        const isDir = lstatSync(pluginSource).isDirectory();
        if (isDir) {
          return this.getDirectories(pluginSource).map((dir: string) =>
            this.loadPluginFromDir(dir),
          );
        }
      } catch (e) {}
      try {
        const pluginModule = require.resolve(pluginSource, {
          paths: [this.root],
        });
        this.loadPluginFromFile(pluginModule);
      } catch (e) {
        console.log(`${pluginSource} is not loaded`);
        console.log(`Error: ${e.message}`);
      }
    });

    this.cmdCtrl = new LesyCommand();
    this.load(this.commands, "cmd");
    if (this.features.length > 0) {
      const { LesyFeature } = require("./feature");
      this.featCtrl = new LesyFeature(this.root);
      this.load(this.features, "feat");
    }

    if (this.middlewares.length > 0) {
      const { LesyMiddleware } = require("./middleware");
      this.mwCtrl = new LesyMiddleware();
      this.load(this.middlewares, "mw");
    }
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
    const pathSegments = path.split(sep);
    const fileName = pathSegments[pathSegments.length - 1];
    if (fileName.startsWith("_")) return false;
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
    if (isFile) return this.loadFromFile(fileOrDir, name);
    const isDir = lstatSync(fileOrDir).isDirectory();
    if (isDir) return this.loadFromDir(fileOrDir, name);
  }

  private loadPluginsPlugins(pluginConfig = {}) {
    const pluginsPlugins = pluginConfig["plugins"];
    if (!pluginsPlugins || !Array.isArray(pluginsPlugins)) return pluginConfig;
    const pluginsPluginsData = [];
    pluginsPlugins.forEach((pluginSource: string) => {
      try {
        const isFile = lstatSync(pluginSource).isFile();
        if (isFile) {
          pluginsPluginsData.push({
            src: pluginSource,
            module: this.getModuleFromFile(pluginSource),
          });
          return;
        }
      } catch (e) {}

      try {
        const paths = [this.root];
        pluginsPluginsData.push({
          src: pluginSource,
          module: this.getModuleFromFile(
            require.resolve(pluginSource, { paths }),
          ),
        });
      } catch (e) {
        console.log(`${pluginSource} is not loaded`);
        console.log(`Error: ${e.message}`);
      }
    });
    return {
      ...pluginConfig,
      plugins: pluginsPluginsData,
    };
  }
}

export { LesyLoader };
