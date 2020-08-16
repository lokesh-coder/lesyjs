import { Injectable } from "@angular/core";
import { WsService } from "./ws.service";
import { filter, take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProjectsService {
  constructor(private wsService: WsService) {}
  switchProject(name: string) {
    this.wsService.send("requestSwitchProject", [name]);
  }

  requestProjects() {
    this.wsService.send("requestAllProjects");
  }
  requestProject() {
    this.wsService.send("requestProject");
  }

  onRequestProjects(): Observable<any> {
    return this.wsService.listen().pipe(
      filter((a) => a && a.onRequestAllProjects),
      take(1),
      map((req) => req.onRequestAllProjects),
    );
  }

  onRequestProject(): Observable<any> {
    return this.wsService.listen().pipe(
      filter((a) => a && a.onRequestProject),
      take(1),
      map((req) => req.onRequestProject),
    );
  }
}
