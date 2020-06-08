import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WsService } from "./ws.service";
import { filter, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class LogsService {
  constructor(private wsService: WsService) {}

  getLogs(): Observable<any> {
    return this.wsService.listen().pipe(
      filter(log => log && log.type),
      filter(log => log.type === "log"),
      map(log => log.message),
    );
  }
}
