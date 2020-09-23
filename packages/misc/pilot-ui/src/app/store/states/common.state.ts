import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { State, Action, StateContext, createSelector } from "@ngxs/store";
import { CommonModel } from "../../pilot.models";
import { PilotConfig } from "../../pilot.config";
import {
  SetConsolePanelHeight,
  ToggleConsolePanel,
  SetConfig,
  LoadConfig,
  SetConsolePanelFullScreen,
  ToggleConsolePosition,
} from "../actions/common.actions";
import { CommonService } from "../../services/common.service";
import { mergeMap } from "rxjs/operators";

@State<CommonModel>({
  name: "common",
  defaults: {
    consoleHeight: 0,
    consolePosition: "vertical",
    config: {},
  },
})
@Injectable()
export class CommonState {
  constructor(
    private commonService: CommonService,
    private titleService: Title,
  ) {}
  static consolePanelsHeight() {
    return createSelector([CommonState], (state: CommonModel) => {
      const topPanelHeight = 100 - state.consoleHeight;
      return [topPanelHeight, state.consoleHeight];
    });
  }

  @Action(SetConsolePanelHeight)
  setHeight(ctx: StateContext<CommonModel>, action: SetConsolePanelHeight) {
    const state = ctx.getState();
    ctx.setState({ ...state, consoleHeight: action.height });
  }

  @Action(SetConsolePanelFullScreen)
  setFullscreen(ctx: StateContext<CommonModel>) {
    const state = ctx.getState();
    ctx.setState({ ...state, consoleHeight: 100 });
  }

  @Action(ToggleConsolePanel)
  togglePanel(ctx: StateContext<CommonModel>) {
    const state = ctx.getState();
    const consoleHeight =
      state.consoleHeight === 0 ? PilotConfig.ConsolePanelDefaultHeight : 0;
    ctx.setState({ ...state, consoleHeight });
  }

  @Action(ToggleConsolePosition)
  toggleConsolePosition(ctx: StateContext<CommonModel>) {
    const state = ctx.getState();
    const consolePosition =
      state.consolePosition === "vertical" ? "horizontal" : "vertical";
    ctx.setState({ ...state, consolePosition });
  }

  @Action(LoadConfig)
  loadConfig(ctx: StateContext<CommonModel>) {
    this.commonService.requestConfig();
    return this.commonService
      .onRequestConfig()
      .pipe(mergeMap((config) => ctx.dispatch(new SetConfig(config))));
  }

  @Action(SetConfig)
  setConfig(ctx: StateContext<CommonModel>, action: SetConfig) {
    const state = ctx.getState();
    ctx.setState({ ...state, config: action.config });
    this.titleService.setTitle(action.config.pilot.docTitle);
  }
}
