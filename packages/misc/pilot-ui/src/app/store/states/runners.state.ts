import { State, Action, StateContext } from "@ngxs/store";
import { UpdateCommands, LoadCommands } from "../actions/commands.actions";
import { tap, mergeMap } from "rxjs/operators";
import { RunnerModel } from "../../pilot.models";
import { RunnersService } from "../../services/runners.service";
import { LoadRunners, UpdateRunners } from "../actions/runners.actions";

@State<RunnerModel[]>({
  name: "runners",
  defaults: [],
})
export class RunnersState {
  constructor(private runnersService: RunnersService) {}

  @Action(LoadRunners)
  loadRunners(ctx: StateContext<RunnerModel[]>) {
    this.runnersService.requestRunners();
    return this.runnersService
      .onRequestRunners()
      .pipe(mergeMap(runners => ctx.dispatch(new UpdateRunners(runners))));
  }

  @Action(UpdateRunners)
  updateRunners(ctx: StateContext<RunnerModel[]>, action: UpdateRunners) {
    ctx.setState(action.runners);
  }
}
