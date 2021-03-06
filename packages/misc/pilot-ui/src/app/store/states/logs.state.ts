import { State, Action, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { mergeMap } from "rxjs/operators";
import { LogsService } from "../../services/logs.service";
import {
  LoadLogs,
  AddLog,
  ClearLogs,
  ReverseLogs,
} from "../actions/logs.actions";
import { LogsModel, LogsDirection } from "../../pilot.models";

@State<LogsModel>({
  name: "logs",
  defaults: {
    logs: [],
    direction: LogsDirection.DESC,
  },
})
@Injectable()
export class LogsState {
  constructor(private logsService: LogsService) {}

  @Action(LoadLogs)
  loadLogs(ctx: StateContext<LogsModel>) {
    return this.logsService
      .getLogs()
      .pipe(mergeMap((log) => ctx.dispatch(new AddLog(log))));
  }

  @Action(AddLog)
  addLog(ctx: StateContext<LogsModel>, action: AddLog) {
    const state = ctx.getState();
    const pushStratergy = state.direction === "DESC" ? "push" : "unshift";
    const pointer = state.direction === "DESC" ? state.logs.length - 1 : 0;
    const lastLog = state.logs[pointer];
    const isDynamicLog = action.log.rewriteLastLog ? "isDynamicLog" : "";
    const logData = [Date.now(), action.log.message, isDynamicLog];

    if (action.log.rewriteLastLog && lastLog[2] === "isDynamicLog") {
      state.logs[pointer] = logData;
    } else {
      state.logs[pushStratergy](logData);
    }

    ctx.setState(state);
  }

  @Action(ClearLogs)
  ClearLogs(ctx: StateContext<LogsModel>) {
    const state = ctx.getState();
    ctx.setState({ ...state, logs: [[Date.now(), "logs cleared!\n"]] });
  }

  @Action(ReverseLogs)
  ReverseLogs(ctx: StateContext<LogsModel>) {
    const state = ctx.getState();
    const { ASC, DESC } = LogsDirection;
    const newDirection = state.direction === "DESC" ? ASC : DESC;
    ctx.setState({ logs: state.logs.reverse(), direction: newDirection });
  }
}
