import { Component, OnInit, Input } from "@angular/core";
import { CommandsService } from "../../services/commands.service";
import { groupBy, toPairs } from "lodash";

@Component({
  selector: "pilot-sidemenu",
  templateUrl: "./sidemenu.template.html",
  styles: [],
})
export class SidemenuComponent implements OnInit {
  commandGroups = [];
  @Input("commands")
  set commands(commands) {
    this.commandGroups = toPairs(groupBy(commands, x => x.group));
    console.log("setting", commands);
  }
  constructor(private commandService: CommandsService) {}
  ngOnInit() {}
  createPath(command) {
    return command.family.join("-");
  }
}
