import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { UpdateCommands, LoadCommands } from "../actions/commands.actions";
import { CommandsService } from "../../services/commands.service";
import { mergeMap } from "rxjs/operators";
import { CommandModel } from "../../pilot.models";

@State<CommandModel[]>({
  name: "commands",
  defaults: [],
})
@Injectable()
export class CommandsState {
  constructor(private commandsService: CommandsService) {}

  @Action(LoadCommands)
  loadCommands(ctx: StateContext<CommandModel[]>, action: UpdateCommands) {
    this.commandsService.requestCommands();
    return this.commandsService
      .onRequestCommands()
      .pipe(mergeMap((commands) => ctx.dispatch(new UpdateCommands(commands))));
  }

  @Action(UpdateCommands)
  updateCommands(ctx: StateContext<CommandModel[]>, action: UpdateCommands) {
    ctx.setState(action.commands);
  }
}
