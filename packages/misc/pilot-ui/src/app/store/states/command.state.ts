import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { SelectedCommand } from "../actions/command.actions";

@State<{ command: any }>({
  name: "command",
  defaults: {
    command: null,
  },
})
@Injectable()
export class CommandState {
  @Action(SelectedCommand)
  selectedCommand(ctx: StateContext<any>, action: SelectedCommand) {
    ctx.setState(action.command);
  }
}
