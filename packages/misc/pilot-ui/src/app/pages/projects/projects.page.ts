import { Component, OnInit } from "@angular/core";
import { CommandsService } from "../../services/commands.service";
import { map } from "rxjs/operators";
import { Observable, combineLatest } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { ProjectsService } from "../../services/projects.service";
import { LoadProjects } from "../../store/actions/projects.actions";
import { SelectedProject } from "../../store/actions/project.actions";
import { LoadConfig } from "../../store/actions/common.actions";

@Component({
  selector: "pilot-projects-page",
  templateUrl: "./projects.template.html",
})
export class ProjectsPage implements OnInit {
  config: object;
  projects: any[];
  selectedProject;

  @Select((state) => state.projects)
  projects$: Observable<string[]>;

  @Select((state) => state.common.config)
  config$: Observable<object>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private ps: ProjectsService,
  ) {
    this.store.dispatch(new LoadProjects());
  }

  ngOnInit() {}
  switchProject(name) {
    this.store.dispatch(new SelectedProject(name));
    this.store.dispatch(new LoadConfig());
  }
}
