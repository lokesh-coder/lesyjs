import { Server } from "ws";
import { Subject } from "rxjs";
import jsonStringifySafe from "json-stringify-safe";

export class WebSocketBus {
  private ws: Server;
  private receiver: Subject<any> = new Subject();
  private sender: Subject<any> = new Subject();
  private requests: object;
  constructor() {}

  startServer(host: string, port: number) {
    this.ws = new Server({ host, port });
    this.ws.on("open", this.onConnectionOpen);
    this.ws.on("close", this.onConnectionClosed);
    return this;
  }

  init(requests: object) {
    this.requests = requests;
    this.ws.on("connection", (ws: any) => {
      this.sender.subscribe((a: any) => {
        ws.send(JSON.stringify(a));
      });
      ws.on("message", (message: string) =>
        this.onMessageReceived.call(this, message, ws),
      );
    });
    return this;
  }

  sendMessage(message: string) {
    this.sender.next(message);
  }

  listen() {
    return this.receiver.asObservable();
  }

  close() {
    this.ws.close();
  }

  private onConnectionOpen() {
    console.log("conneted");
  }

  private onConnectionClosed() {
    console.log("disconneted");
  }

  private async onMessageReceived(message: string, ws: WebSocket) {
    const data = JSON.parse(message);
    this.receiver.next(data);
    if (!this.requests[data.REQUEST]) return;
    const response = await this.requests[data.REQUEST](data.PAYLOAD);
    if (response) ws.send(jsonStringifySafe(response));
  }
}
