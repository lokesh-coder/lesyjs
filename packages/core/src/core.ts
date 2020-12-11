import { LesyCommand } from "./command";
import { LesyFeature } from "./feature";
import { LesyLoader } from "./loader";
import { LesyMiddleware } from "./middleware";
import { MiddlewareContext, MiddlewarePlacement as $, State } from "./model";
import { utils } from "./utilities";

class LesyCoreClass {
  // todo: rename to lesycore
  loader: LesyLoader;

  private localState: Partial<State> = {};
  private cmdCtrl!: LesyCommand;
  private mwCtrl!: LesyMiddleware;

  async bootstrap({
    root,
    commands = [],
    middlewares = [],
    features = [],
    plugins = [],
    validators = [],
    config = {},
  }): Promise<LesyCoreClass> {
    this.loader = new LesyLoader(
      { commands, features, middlewares, plugins },
      root,
    );
    // todo: store plugin config under config.plugins
    for (const prop in this.loader.pluginConfigs) {
      config[prop] = this.loader.pluginConfigs[prop];
    }

    this.mwCtrl = this.loader.mwCtrl;
    this.state = { root, utils, validators, config };
    if (this.mwCtrl) await this.hook($.INIT);

    this.cmdCtrl = this.loader.cmdCtrl;
    const feature = this.loader.featCtrl
      ? this.loader.featCtrl.getFeatures()
      : {};
    this.state = {
      feature,
      request: this.getRequests(),
      allCommands: this.cmdCtrl.getCommands(),
    };
    if (this.mwCtrl) await this.hook($.START);
    return this;
  }

  async run(argv: string[]): Promise<any> {
    this.state = { argv };

    if (this.mwCtrl) this.state = await this.hook($.PRE_PARSE);
    const argh = argv.some((a: string) => a.startsWith("-"))
      ? require("argh")
      : (x: any) => ({ argv: x });
    const { argv: rawArgs = [], ...rawFlags } = argh([...this.state.argv]);
    this.state = { rawArgs, rawFlags };

    if (this.mwCtrl) this.state = await this.hook($.POST_PARSE);

    const { rawArgs: rArgs, rawFlags: rFlags } = this.state;
    const defaultCmdName = this.state.config.defaultCommand;
    const cmdNames = !rArgs.length ? [defaultCmdName] : rArgs;

    this.state = this.cmdCtrl.findCommand(cmdNames, rFlags);

    if (this.mwCtrl) this.state = await this.hook($.PRE_VALIDATE);

    if (Object.keys(this.state.runningCommand.args).length) {
      await this.validate(this.state);
    }
    if (this.mwCtrl) this.state = await this.hook($.PRE_RUN);

    try {
      await this.state.runningCommand.run(this.state);
    } catch (e) {
      // todo: option to expose errors
      this.state = { cmdRunError: e };
    }
    if (this.mwCtrl) await this.hook($.END);
  }

  private async validate({ runningCommand, args, validators }: Partial<State>) {
    const validation = await this.cmdCtrl.validate(
      runningCommand,
      args,
      validators,
    );
    validation.errors
      .filter((e: any) => !!e.error)
      .forEach((e: any) => console.error(e.error));
    if (!validation.isPassed) process.exit();
  }

  private async hook(
    name: $,
    data: MiddlewareContext = this.state,
  ): Promise<MiddlewareContext> {
    return await this.mwCtrl.run(name, data);
  }

  private getRequests() {
    return {
      runCommand: this.run.bind(this),
      getCommandById: this.cmdCtrl.getCommandById.bind(this.cmdCtrl),
      getCommandByName: this.cmdCtrl.getCommandByName.bind(this.cmdCtrl),
      getCommands: this.cmdCtrl.getCommands.bind(this.cmdCtrl),
      getMiddlewares: this.mwCtrl ? this.mwCtrl.get.bind(this.mwCtrl) : {},
    };
  }

  private get state(): Partial<State> {
    return this.localState;
  }

  private set state(newState: Partial<State>) {
    for (const prop in newState) this.localState[prop] = newState[prop];
  }
}

export { LesyCoreClass };
