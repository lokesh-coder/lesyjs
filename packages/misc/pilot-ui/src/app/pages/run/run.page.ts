import { Component, OnInit } from "@angular/core";
import { WsService } from "../../services/ws.service";
import { filter, map, take, tap } from "rxjs/operators";
import { RunnersService } from "../../services/runners.service";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RunnerModel } from "../../pilot.models";
import { LoadRunners } from "../../store/actions/runners.actions";
import { CommandsService } from "../../services/commands.service";

@Component({
  selector: "pilot-run-page",
  templateUrl: "./run.template.html",
  styles: [],
})
export class RunPage implements OnInit {
  runners = [];

  colors = [
    ["#D36462", "#fa709a"],
    ["#d89874", "#F7CE68"],
  ];

  @Select(state => state.runners)
  runners$: Observable<RunnerModel[]>;

  constructor(private store: Store, private commandsService: CommandsService) {
    this.store.dispatch(new LoadRunners());
  }

  ngOnInit() {}

  runCommand(el) {
    this.commandsService.runCommand("run", { command: el.value });
    el.value = null;
  }
}
