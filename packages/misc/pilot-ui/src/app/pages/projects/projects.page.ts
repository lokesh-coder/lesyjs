import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { LoadProjects } from "../../store/actions/projects.actions";
import { SelectedProject } from "../../store/actions/project.actions";
import { LoadConfig } from "../../store/actions/common.actions";
import { PilotState, ProjectModel } from "../../pilot.models";

@Component({
  selector: "pilot-projects-page",
  templateUrl: "./projects.template.html",
})
export class ProjectsPage implements OnInit {
  currentProjectName = "";

  @Select((state: PilotState) => state.projects)
  projects$: Observable<ProjectModel[]>;

  @Select((state: PilotState) => state.common.config)
  config$: Observable<object>;

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new LoadProjects());
  }

  ngOnInit() {
    this.currentProjectName = this.store.selectSnapshot<string>(
      (state: PilotState) => state.project.name,
    );
  }
  switchProject(project: ProjectModel) {
    this.store.dispatch(new SelectedProject(project));
    this.store.dispatch(new LoadConfig());

    this.router.navigateByUrl("/");
  }
}
