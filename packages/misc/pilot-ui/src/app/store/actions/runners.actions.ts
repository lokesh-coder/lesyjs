import { RunnerModel } from "../../pilot.models";

export class LoadRunners {
  static readonly type = "[Runners] Load runners";
}

export class UpdateRunners {
  static readonly type = "[Runners] Update runners";
  constructor(public runners: RunnerModel[]) {}
}
