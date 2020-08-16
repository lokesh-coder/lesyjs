import { State, Action, StateContext } from "@ngxs/store";
import { mergeMap } from "rxjs/operators";
import {
  SelectedProject,
  FetchDefaultProject,
} from "../actions/project.actions";
import { ProjectsService } from "../../services/projects.service";

@State<{ project: any }>({
  name: "project",
  defaults: {
    project: null,
  },
})
export class ProjectState {
  constructor(private projectsService: ProjectsService) {}

  @Action(FetchDefaultProject)
  fetchDefaultProject(ctx: StateContext<object[]>) {
    this.projectsService.requestProject();
    return this.projectsService
      .onRequestProject()
      .pipe(mergeMap((name) => ctx.dispatch(new SelectedProject(name))));
  }

  @Action(SelectedProject)
  selectedProject(ctx: StateContext<any>, action: SelectedProject) {
    this.projectsService.switchProject(action.project.name);
    ctx.setState(action.project);
  }
}
