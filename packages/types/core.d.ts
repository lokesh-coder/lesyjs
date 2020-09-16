import { LesyLoader } from "./loader";
declare class LesyCoreClass {
    loader: LesyLoader;
    feature: {};
    root: string;
    config: Record<string, any>;
    private localState;
    private cmdCtrl;
    private mwCtrl;
    private featCtrl;
    bootstrap({ root, commands, middlewares, features, plugins, validators, config, }: {
        root: any;
        commands?: any[];
        middlewares?: any[];
        features?: any[];
        plugins?: any[];
        validators?: any[];
        config?: {};
    }): Promise<LesyCoreClass>;
    run(argv: string[]): Promise<any>;
    private validate;
    private hook;
    private getRequests;
    private get state();
    private set state(value);
}
export { LesyCoreClass };
//# sourceMappingURL=core.d.ts.map