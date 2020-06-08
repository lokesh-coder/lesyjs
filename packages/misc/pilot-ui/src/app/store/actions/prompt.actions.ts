import { PromptModel } from "../../pilot.models";

export class ListenForPrompt {
  static readonly type = "[Prompt] Listening for prompt";
}

export class UpdatePrompt {
  static readonly type = "[Prompt] Update prompt";
  constructor(public prompt: PromptModel) {}
}

export class ResetPrompt {
  static readonly type = "[Prompt] reset prompt";
}
