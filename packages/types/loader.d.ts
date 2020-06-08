import { LesyCommand } from "./command";
import { LesyFeature } from "./feature";
import { LesyMiddleware } from "./middleware";
import { Command, Feature, Middleware, Plugin } from "./model";
declare class LesyLoader {
    private commands;
    private middlewares;
    private features;
    private root;
    private pluginConfigs;
    constructor({ commands, features, middlewares, plugins, }: {
        commands?: Command[] | string[];
        features?: string[];
        middlewares?: string[];
        plugins?: Plugin[];
    }, root: string);
    loadCommandFromFile(path: string): void;
    loadCommandsFromDir(dir: string): void;
    loadCommandFromObject(rawCmd: Command | Function, src: string): void;
    loadCommands(cmds: (string | Command)[]): void;
    getCommand(): LesyCommand;
    loadMiddlewareFromFile(path: string): void;
    loadMiddlewaresFromDir(dir: string): void;
    loadMiddlewaresFromObject(rawMw: Middleware): void;
    loadMiddlewares(middlewares: string[] | Middleware[]): void;
    getMiddlewares(): LesyMiddleware;
    loadFeatureFromFile(path: string): void;
    loadFeaturesFromDir(dir: string): void;
    loadFeaturesFromObject(rawFeature: Feature): void;
    loadFeatures(features: (string | Feature)[]): void;
    getFeature(): LesyFeature;
    loadPluginFromFile(path: string): void;
    loadPluginFromDir(dir: string): void;
    loadPlugins<T>(paths: Plugin[]): void;
    getPluginConfigs(): {};
    private formatPath;
    private getModuleFromFile;
    private getDirectories;
    private getFiles;
    private isAllowedFile;
    private loadFilesAndDirs;
}
export { LesyLoader };
//# sourceMappingURL=loader.d.ts.map