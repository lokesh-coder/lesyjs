import { resolve } from "path";
import { createServer } from "http";
/* move inside to run method */
import finalhandler from "finalhandler";
import serveStatic from "serve-static";
import { default as intercept } from "intercept-stdout";
const AU = require("ansi_up");
const ansiUp = new AU.default();
ansiUp.use_classes = true;
ansiUp.escape_for_html = false;
import { take, filter, map } from "rxjs/operators";
import { printAddressBanner } from "./helpers/banner";
import { getLocalIPAddress } from "./helpers/public-ip";

export default {
  name: "pilot",
  description: "Run commands from GUI",
  aliases: ["server", "web", "s", "w"],
  isVisible: false,
  flags: {
    host: {
      aliases: ["h"],
    },
    port: {
      aliases: ["p"],
    },
    socketPort: {
      aliases: ["sp"],
    },
    socketHost: {
      aliases: ["sh"],
    },
    clientSocketUrl: {
      aliases: ["csu"],
    },
  },
  run: ({ flags: props, request, feature, config, utils }) => {
    const flags = {
      host: "localhost",
      port: "8888",
      socketHost: "localhost",
      socketPort: "8889", // todo: available ports
      ...props,
    };
    const chalk = utils.color();
    const { "@lesy/lesy-plugin-pilot": pilotConfig, ...allConfig } = config;
    const { name, version, bin } = feature.pkg;
    const defaultPilotConfig = {
      appName: name || "Dashboard",
      docTitle: name || "Dashboard",
      appVersion: version || "0.0",
      cmdName: Object.keys(bin)[0],
    };
    const socket = feature.socket
      .startServer(flags.socketHost, flags.socketPort)
      .init({
        requestRunCommand: request.runCommand,
        requestAllCommands: () => ({
          onRequestAllCommands: request.getCommands(),
        }),
        requestConfig: () => ({
          onRequestConfig: {
            pilot: { ...defaultPilotConfig, ...pilotConfig },
            ...allConfig,
          },
        }),
      });

    intercept(
      (txt: unknown) => {
        socket.sendMessage({
          type: "log",
          message: ansiUp.ansi_to_html(txt),
        });
      },
      (err: unknown) => {
        socket.sendMessage({
          type: "log",
          message: ansiUp.ansi_to_html(err),
        });
      },
    );

    if (feature.promptConfig) {
      feature.promptConfig.customPrompt = (questions: any) => {
        socket.sendMessage({ questions, messageId: 123 });
        return new Promise((res: any) => {
          socket
            .listen()
            .pipe(
              take(1),
              filter((data: any) => data.REQUEST === "answers"),
              map((a: any) => a.PAYLOAD),
              filter((data: any) => data.qid === 123),
              map((a: any) => a.ans),
            )
            .subscribe((a: any) => res(a)); // todo: refactor
        });
      };
    }

    const localNetworkIP = getLocalIPAddress() || "localhost";
    const isOffline = localNetworkIP === "localhost";
    const dir = resolve(__dirname, "../public");
    let cookies = ["socketHost", "socketPort", "clientSocketUrl"];
    cookies = cookies.map((c: any) => `${c}=${flags[c]}`);
    const serve = serveStatic(dir, {
      index: ["index.html"],
      setHeaders: (res: any) => res.setHeader("Set-Cookie", cookies),
    });
    const server = createServer((req, res) => {
      serve(req, res, finalhandler(req, res));
    });
    server.listen(flags.port, flags.host);

    printAddressBanner(
      chalk,
      `http://${flags.host}:${flags.port}`,
      `http://${localNetworkIP}:${flags.port} ${isOffline ? "(Offline)" : ""}`,
    );
  },
};
