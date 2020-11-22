import { Injectable } from "@angular/core";
import { WsService } from "./ws.service";
import { filter, take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MiddlewaresService {
  constructor(private wsService: WsService) {}

  requestMiddlewares() {
    this.wsService.send("requestAllMiddlewares");
  }

  onRequestMiddlewares(): Observable<any> {
    return this.wsService.listen().pipe(
      filter((a) => a && a.onRequestAllMiddlewares),
      take(1),
      map((req) => req.onRequestAllMiddlewares),
    );
  }
}
