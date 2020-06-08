import { Injectable } from "@angular/core";
import { Subject, ReplaySubject, Observable } from "rxjs";
import { WsService } from "./ws.service";
import { filter, map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class NotificationService {
  constructor(private wsService: WsService) {}

  getNotification(): Observable<any> {
    return this.wsService.listen().pipe(
      tap(a => {
        console.log("RECEIVED NOTIFICATION");
      }),
      filter(n => n && n.type),
      filter(n => n.type === "notification" && n.message !== undefined),
      map(n => n.message),
    );
  }

  sendLocalNotification(data = {}) {
    this.wsService.sendLocalNotification(data);
  }
}
