import argh from "argh";

import { LesyCommand } from "./command";
import { LesyFeature } from "./feature";
import { LesyLoader } from "./loader";
import { LesyMiddleware } from "./middleware";
import {
  MiddlewareContext,
  MiddlewarePlacement as $,
  Validator,
  State,
} from "./model";
import { utils } from "./utilities";

class LesyCoreClass {
  loader: LesyLoader;
  feature = {};
  root: string;
  config: Record<string, any>;
  validators: Validator[];

  private localState: State;
  private cmdCtrl!: LesyCommand;
  private mwCtrl!: LesyMiddleware;
  private featCtrl!: LesyFeature;

  async bootstrap({
    root,
    commands = [],
    middlewares = [],
    features = [],
    plugins = [],
    validators = [],
    config = {},
  }): Promise<LesyCoreClass> {
    this.root = root;
    this.validators = validators;
    this.loader = new LesyLoader(
      { commands, features, middlewares, plugins },
      this.root,
    );
    this.config = { ...config, ...this.loader.getPluginConfigs() };

    this.mwCtrl = this.loader.getMiddlewares();
    this.state = { root, utils, validators, config: this.config };
    await this.hook($.INIT);

    this.cmdCtrl = this.loader.getCommand();
    this.featCtrl = this.loader.getFeature();
    const allCmds = this.cmdCtrl.getCommands();
    this.feature = this.featCtrl.getFeatures();
    const request = this.getRequests();
    this.state = { request, feature: this.feature, allCommands: allCmds };
    await this.hook($.START);

    return this;
  }

  async run(argv: string[]): Promise<any> {
    this.state = { argv };

    const preParsedState = await this.hook($.PRE_PARSE);
    const { argv: rawArgs = [], ...rawFlags } = argh([...preParsedState.argv]);
    this.state = { rawArgs, rawFlags };

    this.state = await this.hook($.POST_PARSE);

    const { rawArgs: rArgs, rawFlags: rFlags } = this.state;
    const defaultCmdName = this.state.config.defaultCommand;
    const cmdNames = !rArgs.length ? [defaultCmdName] : rArgs;

    this.state = this.cmdCtrl.findCommand(cmdNames)(rFlags);

    this.state = await this.hook($.PRE_VALIDATE);

    const validation = await this.cmdCtrl.validate(
      this.state.runningCommand,
      this.state.args,
      this.state.validators,
    );
    validation.errors
      .filter((e: any) => !!e.error)
      .forEach((e: any) => console.error(e.error));
    if (!validation.isPassed) process.exit();

    this.state = await this.hook($.POST_VALIDATE); // dont need?

    this.state = await this.hook($.PRE_RUN);
    try {
      await this.state.runningCommand.run(this.state);
    } catch (e) {
      this.state = { cmdRunError: e };
    }

    await this.hook($.END);
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
    };
  }

  private get state(): Partial<State> {
    return this.localState;
  }

  private set state(newState: Partial<State>) {
    const defaultState = {
      argv: [],
      id: null,
      args: {},
      flags: {},
      rawArgs: [],
      rawFlags: [],
      unknownArgs: [],
      unknownFlags: [],
      config: {},
      root: null,
      feature: {},
      utils: {},
      request: {},
      cmdRunError: null,
      validators: [],
      allCommands: null,
      runningCommand: null,
    };
    const currentState = this.localState || defaultState;
    this.localState = { ...currentState, ...newState } as State;
  }
}

const core = new LesyCoreClass();

export { core as LesyCore, LesyCoreClass };
