import { LesyLoader } from "./loader";
import { Validator } from "./model";
declare class LesyCoreClass {
    loader: LesyLoader;
    feature: {};
    root: string;
    config: Record<string, any>;
    validators: Validator[];
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
    private hook;
    private getRequests;
    private get state();
    private set state(value);
}
declare const core: LesyCoreClass;
export { core as LesyCore, LesyCoreClass };
//# sourceMappingURL=core.d.ts.map