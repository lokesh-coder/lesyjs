import { State, Action, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap, mergeMap } from "rxjs/operators";
import { PromptModel } from "../../pilot.models";
import { PromptService } from "../../services/prompt.service";
import {
  ListenForPrompt,
  UpdatePrompt,
  ResetPrompt,
} from "../actions/prompt.actions";

@State<PromptModel>({
  name: "prompt",
  defaults: {
    messageId: undefined,
    questions: [],
  },
})
@Injectable()
export class PromptState {
  constructor(private promptService: PromptService) {}

  @Action(ListenForPrompt)
  listenForPrompt(ctx: StateContext<PromptModel>) {
    return this.promptService.getPrompt().pipe(
      tap((prompt) => {
        console.log("PROMPT", prompt);
      }),
      mergeMap((prompt) => ctx.dispatch(new UpdatePrompt(prompt))),
    );
  }

  @Action(UpdatePrompt)
  updatePrompt(ctx: StateContext<PromptModel>, action: UpdatePrompt) {
    ctx.setState(action.prompt);
  }

  @Action(ResetPrompt)
  resetPrompt(ctx: StateContext<PromptModel>) {
    ctx.setState({ questions: [], messageId: undefined });
  }
}
