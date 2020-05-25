export default function socket(feature) {
  Object.defineProperty(feature, "socket", {
    get: () => {
      const soc = require("./pilot.socket");
      return new soc.WebSocketBus();
    },
  });
}
