import { ProjectModel } from "../../pilot.models";

export class FetchDefaultProject {
  static readonly type = "[Project] fetch default project";
}

export class SelectedProject {
  static readonly type = "[Project] Selected project";
  constructor(public project: ProjectModel) {}
}
