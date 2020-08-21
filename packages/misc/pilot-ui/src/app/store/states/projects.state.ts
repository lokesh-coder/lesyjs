import { State, Action, StateContext } from "@ngxs/store";
import { mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ProjectModel } from "../../pilot.models";
import { LoadProjects, UpdateProjects } from "../actions/projects.actions";
import { ProjectsService } from "../../services/projects.service";

@State<ProjectModel[]>({
  name: "projects",
  defaults: [],
})
@Injectable()
export class ProjectsState {
  constructor(private projectsService: ProjectsService) {}

  @Action(LoadProjects)
  loadProjects(ctx: StateContext<ProjectModel[]>) {
    this.projectsService.requestProjects();
    return this.projectsService
      .onRequestProjects()
      .pipe(mergeMap((projects) => ctx.dispatch(new UpdateProjects(projects))));
  }

  @Action(UpdateProjects)
  updateProjects(ctx: StateContext<ProjectModel[]>, action: UpdateProjects) {
    ctx.setState(action.projects);
  }
}
