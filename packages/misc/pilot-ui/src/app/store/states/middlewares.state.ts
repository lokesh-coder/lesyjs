import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { UpdateCommands, LoadCommands } from "../actions/commands.actions";
import { MiddlewaresService } from "../../services/middlewares.service";
import { mergeMap } from "rxjs/operators";
import { MiddlewaresModel } from "../../pilot.models";
import { UpdateMiddlewares } from "../actions/middlewares.actions";

@State<MiddlewaresModel>({
  name: "middlewares",
  defaults: {},
})
@Injectable()
export class MiddlewaresState {
  constructor(private middlewaresService: MiddlewaresService) {}

  @Action(LoadCommands)
  loadCommands(ctx: StateContext<MiddlewaresModel>, action: UpdateMiddlewares) {
    this.middlewaresService.requestMiddlewares();
    return this.middlewaresService
      .onRequestMiddlewares()
      .pipe(mergeMap((mws) => ctx.dispatch(new UpdateMiddlewares(mws))));
  }

  @Action(UpdateMiddlewares)
  UpdateMiddlewares(
    ctx: StateContext<MiddlewaresModel>,
    action: UpdateMiddlewares,
  ) {
    ctx.setState(action.middlewares);
  }
}
