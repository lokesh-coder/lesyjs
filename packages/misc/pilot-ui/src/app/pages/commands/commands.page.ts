import { Component, OnInit } from "@angular/core";
import { CommandsService } from "../../services/commands.service";
import { map } from "rxjs/operators";
import { Observable, combineLatest } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { CommandModel } from "../../pilot.models";
import { LoadCommands } from "../../store/actions/commands.actions";
import { SelectedCommand } from "../../store/actions/command.actions";

@Component({
  selector: "pilot-commands-page",
  templateUrl: "./commands.template.html",
})
export class CommandsPage implements OnInit {
  config: object;
  commands: any[];
  selectedCommand;
  showMobileMenu = false;

  @Select((state) => state.commands)
  commands$: Observable<CommandModel[]>;

  @Select((state) => state.common.config)
  config$: Observable<object>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cs: CommandsService,
  ) {
    this.store.dispatch(new LoadCommands());
  }

  ngOnInit() {
    const param$ = this.route.paramMap.pipe(map((p: any) => p.params.id));

    combineLatest([param$, this.commands$, this.config$]).subscribe(
      ([param, commands, config]) => {
        if (commands.length === 0) {
          return;
        }
        this.commands = this.cs.createdNestedCommands(commands);
        this.config = config;
        this.selectedCommand = this.commands.find(
          (c) => param === c.family.join("-"),
        );
        if (!this.selectedCommand) {
          this.selectedCommand = this.commands
            .map((c) => c.children)
            .filter((c) => c.length > 0)
            .map((c) => c.filter((v) => param === v.family.join("-"))[0])[0];
        }
        this.store.dispatch(new SelectedCommand(this.selectedCommand));
      },
    );
  }
}
