import { LesyWorkSpace, SocketInputData, AnyObject } from "./models";
import { resolve } from "path";
import { readdirSync, existsSync } from "fs";
import { createServer } from "http";

declare global {
  module NodeJS {
    interface Global {
      lesyWorkspace: LesyWorkSpace;
      lesySelectedProject: string;
    }
  }
}

export default class PilotCommand {
  name = "pilot";
  description = "Run commands from GUI";
  aliases = ["server", "web", "s", "w"];
  isVisible = false;
  flags = {
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
  };
  private socket: any;
  private localNetworkIP: string;
  private isOffline: boolean;

  private getBinFiles(dir: string) {
    const files = readdirSync(dir);
    return files
      .map((filePath: string) => resolve(dir, filePath))
      .filter((filePath: string) => existsSync(filePath));
  }

  private async fetchProjectPaths(): Promise<string[]> {
    const execa = require("execa");
    const fileSearch = require("search-in-file").fileSearch;
    const { stdout: binPath } = await execa("npm", ["bin", "-g"]);
    try {
      const results = await fileSearch(
        this.getBinFiles(binPath),
        "@lesy/compiler",
      );
      return results;
    } catch ({ message }) {
      console.error(message);
    }
  }

  private async loadProjectData(currCtx: any): Promise<LesyWorkSpace> {
    global.lesyWorkspace = {
      [currCtx.feature.pkg.name]: currCtx,
    };
    global.lesySelectedProject = currCtx.feature.pkg.name;
    const projectsPaths = await this.fetchProjectPaths();
    for (let i = 0; i < projectsPaths.length; i = i + 1) {
      const p = await require(projectsPaths[i]).default;
      global.lesyWorkspace[p.feature.pkg.name] = p.localState;
    }
    return global.lesyWorkspace;
  }

  private getSelectedProject(): any {
    return global.lesyWorkspace[global.lesySelectedProject];
  }

  private getAllProjects(): any[] {
    const projectNames = Object.keys(global.lesyWorkspace);
    return projectNames.map((name: string) => ({ name }));
  }

  private switchProject(name: string): void {
    global.lesySelectedProject = name;
  }

  private getConfig(): AnyObject {
    const { feature, config } = this.getSelectedProject();
    const { name, version, bin } = feature.pkg;
    const defaultPilotConfig = {
      appName: name || "Dashboard",
      docTitle: name || "Dashboard",
      appVersion: version || "0.0",
      cmdName: Object.keys(bin)[0],
    };
    const { "@lesy/lesy-plugin-pilot": pilotConfig, ...allConfig } = config;
    return {
      pilot: { ...defaultPilotConfig, ...pilotConfig },
      ...allConfig,
    };
  }

  private getSocketData(): SocketInputData {
    const selectedProject = () =>
      this.getAllProjects().find(
        (p: any) => p.name === global.lesySelectedProject,
      );

    return {
      requestSwitchProject: this.switchProject,
      requestRunCommand: this.getSelectedProject().request.runCommand,
      requestProject: () => ({
        onRequestProject: selectedProject(),
      }),
      requestAllProjects: () => ({
        onRequestAllProjects: this.getAllProjects(),
      }),
      requestAllCommands: () => ({
        onRequestAllCommands: this.getSelectedProject().request.getCommands(),
      }),
      requestConfig: () => ({
        onRequestConfig: this.getConfig(),
      }),
    };
  }

  private tapLogs() {
    const intercept = require("intercept-stdout");
    const AU = require("ansi_up");
    const ansiUp = new AU.default();
    ansiUp.use_classes = true;
    ansiUp.escape_for_html = false;

    const cb = (text: any) => {
      this.socket.sendMessage({
        type: "log",
        message: ansiUp.ansi_to_html(text),
      });
    };

    intercept(cb, cb);
  }

  private hijackPrompt(feature: AnyObject) {
    if (!feature.promptConfig) return;
    const { take, filter, map } = require("rxjs/operators");
    feature.promptConfig.customPrompt = (questions: any) => {
      this.socket.sendMessage({ questions, messageId: 123 });
      return new Promise((res: any) => {
        this.socket
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

  private getMergedFlags(flags: AnyObject): AnyObject {
    const f = {
      host: "localhost",
      port: "8888",
      socketHost: "localhost",
      socketPort: "8889", // todo: available ports
      ...flags,
    };
    return f;
  }

  private establishSocket(flags: AnyObject, feature: AnyObject): void {
    this.socket = feature.socket
      .startServer(flags.socketHost, flags.socketPort)
      .init(this.getSocketData());
  }

  private startServer(flags: AnyObject) {
    const { getLocalIPAddress } = require("./helpers/public-ip");
    const finalhandler = require("finalhandler");
    const serveStatic = require("serve-static");

    this.localNetworkIP = getLocalIPAddress() || "localhost";
    this.isOffline = this.localNetworkIP === "localhost";
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
  }

  private renderConnectionInfo(utils: AnyObject, flags: AnyObject) {
    const { printAddressBanner } = require("./helpers/banner");
    const chalk = utils.color();
    printAddressBanner(
      chalk,
      `http://${flags.host}:${flags.port}`,
      `http://${this.localNetworkIP}:${flags.port} ${
        this.isOffline ? "(Offline)" : ""
      }`,
    );
  }

  async run({ flags: f, request, feature, config, utils }) {
    const flags = this.getMergedFlags(f);
    await this.loadProjectData({ request, feature, config });
    this.tapLogs();
    this.hijackPrompt(feature);
    this.establishSocket(flags, feature);
    this.startServer(flags);
    this.renderConnectionInfo(utils, flags);
  }
}
