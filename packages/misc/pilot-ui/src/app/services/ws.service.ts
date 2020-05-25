import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

declare var process: any;
@Injectable({ providedIn: "root" })
export class WsService {
  dataSub: BehaviorSubject<any> = new BehaviorSubject(null);
  private wsSubject;
  constructor() {
    this.wsSubject = webSocket(this.getSocketUrl());
    this.wsSubject.subscribe(
      msg => this.dataSub.next(msg),
      (err: any) => {
        console.log("ERROR OCCURED", err);
        this.sendLocalNotification({
          status: "ERROR",
          title: "Failure",
          details: "Connection closed",
        });
      },
      () => console.log("complete"),
    );
  }
  send(action: any, payload: object = {}) {
    this.wsSubject.next({ REQUEST: action, PAYLOAD: payload });
  }
  sendLocalNotification(data) {
    this.dataSub.next({
      type: "notification",
      message: {
        ...data,
      },
    });
  }
  listen() {
    return this.dataSub.asObservable();
  }

  private getLocalSocketData() {
    if (!environment.production) {
      return {
        socketHost: process.env.socketHost,
        socketPort: process.env.socketPort,
      };
    }
    const values: any = document.cookie
      .split(";")
      .map(s => s.split("=").map(y => y.trim()))
      .filter(([key, _]) =>
        ["socketHost", "socketPort", "clientSocketUrl"].includes(key),
      )
      .filter(z => z[1] !== "undefined");
    const data = values.reduce((a, c) => ({ ...a, [c[0]]: c[1] }), {});
    return data;
  }

  private getSocketUrl() {
    const {
      clientSocketUrl,
      socketHost,
      socketPort,
    } = this.getLocalSocketData();
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const url = clientSocketUrl
      ? clientSocketUrl
      : `${socketHost}:${socketPort}`;
    return `${protocol}://${url}`;
  }
}
