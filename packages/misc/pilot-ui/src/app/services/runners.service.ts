import { Injectable } from "@angular/core";
import { WsService } from "./ws.service";
import { filter, take, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class RunnersService {
  constructor(private wsService: WsService) {}

  requestRunners() {
    this.wsService.send("requestAllRunners");
  }

  onRequestRunners(): Observable<any> {
    return this.wsService.listen().pipe(
      filter(a => a && a.onRequestAllRunners),
      take(1),
      map(a => a.onRequestAllRunners),
    );
  }
}
