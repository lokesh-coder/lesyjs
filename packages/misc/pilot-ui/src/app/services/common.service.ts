import { Injectable } from "@angular/core";
import { WsService } from "./ws.service";
import { filter, take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CommonService {
  constructor(private wsService: WsService) {}

  requestConfig() {
    this.wsService.send("requestConfig");
  }

  onRequestConfig(): Observable<any> {
    return this.wsService.listen().pipe(
      filter(a => a && a.onRequestConfig),
      take(1),
      map(a => a.onRequestConfig),
    );
  }
}
