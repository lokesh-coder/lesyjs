import { Injectable } from "@angular/core";
import { WsService } from "./ws.service";
import { filter, take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CommandsService {
  constructor(private wsService: WsService) {}
  runCommand(name: string, options: object = {}) {
    this.wsService.send("requestRunCommand", [name, ...Object.values(options)]);
  }

  requestCommands() {
    this.wsService.send("requestAllCommands");
  }

  onRequestCommands(): Observable<any> {
    return this.wsService.listen().pipe(
      filter(a => a && a.onRequestAllCommands),
      take(1),
      map(req => req.onRequestAllCommands),
      map(cmds => {
        return cmds.filter(cmd => cmd.isVisible);
      }),
    );
  }

  createdNestedCommands(commands: object[]) {
    const nest = (items, main = null, parent = "") =>
      items
        .filter(item => item.main === main)
        .map(item => ({
          ...item,
          children: nest(items, item.name, (parent + " " + item.name).trim()),
          family: [...parent.split(" "), item.name].filter(a => a),
        }));
    return nest(commands);
  }
}
