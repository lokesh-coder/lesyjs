// tslint:disable-next-line: import-name
import WebSocket from "ws";
import { WebSocketBus } from "../pilot.socket";

describe("web socket", () => {
  let wsServer: WebSocketBus;
  let wsClient: WebSocket;

  beforeAll((done) => {
    wsServer = new WebSocketBus().startServer("localhost", 1234).init({
      requestRunCommand: (payload) => {
        return {
          success: true,
          data: payload,
        };
      },
    });

    wsServer["ws"].on("connection", () => wsClient.on("open", done));
    wsClient = new WebSocket(`ws://localhost:1234`);
  });

  afterAll((done) => {
    wsClient.close();
    wsServer.close(done);
  });

  it("should exchange messages", (done) => {
    wsClient.on("message", (m) => {
      expect(m).toEqual(
        JSON.stringify({
          success: true,
          data: "echo 123",
        }),
      );
      done();
    });

    wsClient.send(
      JSON.stringify({ REQUEST: "requestRunCommand", PAYLOAD: "echo 123" }),
    );
  });
});
