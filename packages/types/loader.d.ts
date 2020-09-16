import { Command, Plugin } from "./model";
declare class LesyLoader {
    private root;
    private pluginConfigs;
    cmdCtrl: any;
    mwCtrl: any;
    featCtrl: any;
    commands: any[];
    middlewares: any[];
    features: any[];
    constructor({ commands, features, middlewares, plugins, }: {
        commands?: Command[] | string[];
        features?: string[];
        middlewares?: string[];
        plugins?: Plugin[];
    }, root: string);
    loadFromObject(item: any, path: string, type: string): void;
    loadFromFile(path: string, type: string): void;
    loadFromDir(dir: string, type: string): void;
    load(items: any[], type: string): void;
    loadPluginFromObject({ commands, middlewares, features, }: {
        commands?: any[];
        middlewares?: any[];
        features?: any[];
    }): void;
    loadPluginFromFile(path: string): void;
    loadPluginFromDir(dir: string): void;
    loadPlugins(paths: Plugin[]): void;
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