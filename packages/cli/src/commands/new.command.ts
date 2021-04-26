import { existsSync, mkdirSync } from "fs";
import { resolve, relative } from "path";

export default class Init {
  name = "new";
  aliases = ["create", "n", "init", "i"];
  description = "Create new project";
  args = {
    pname: {
      description: "project name",
      required: true,
    },
  };
  flags = {
    yes: {
      description: "forcefully set default values",
      aliases: ["f"],
    },
  };
  private spinner;
  private execa;
  private projectDirectory;
  private chalk;
  private tree;
  private answers;

  async run({ feature, utils, args, flags }) {
    this.chalk = utils.color();
    this.spinner = utils.spinner();
    this.tree = require("tree-node-cli");
    this.execa = require("execa");
    this.answers = await feature.prompt([
      {
        name: "project-name",
        message: "Name of the project",
        type: "input",
        validate: (answer: any) => !!answer || "Enter project name",
        when: (answers: any) => {
          answers["project-name"] = args.pname;
          return !args.pname;
        },
      },
      {
        name: "cmd-name",
        message: "Name of the command",
        type: "input",
        default: (values: object) => values["project-name"],
        validate: (answer: string) => !!answer || "Enter command name",
        when: (answers: any) => {
          answers["cmd-name"] = answers["project-name"];
          return !flags.force;
        },
      },
      {
        name: "is-ts-project",
        message: "Is typescript project",
        type: "confirm",
        default: true,
        when: (answers: any) => {
          answers["is-ts-project"] = true;
          return !flags.force;
        },
      },
      {
        name: "current-directory",
        message: "Select directory (relative path)",
        type: "input",
        default: process.cwd(),
        filter: (path: string) => resolve(path),
        validate: (dir: string) => {
          if (!existsSync(dir)) {
            mkdirSync(dir);
          }
          return true;
        },
        when: (answers: any) => {
          answers["current-directory"] = process.cwd();
          return !flags.force;
        },
      },
    ]);

    this.clearPreviousLines();
    await this.scaffold(feature);
    this.displayProjectTree();
    this.installDeps();
    this.displayNotes();
  }

  private async scaffold(feature) {
    const fileGenerationSpinner = this.spinner({
      text: "Generating files...",
      discardStdin: false,
    }).start();
    const templateDir = this.answers["is-ts-project"] ? "ts-basic" : "js-basic";
    await feature
      .generateFiles({
        data: {
          name: this.answers["project-name"],
          cmdName: this.answers["cmd-name"],
          version: feature.pkg.version,
        },
        source: resolve(__dirname, "../templates", templateDir),
        destination: this.answers["current-directory"],
      })
      .then(() => {
        fileGenerationSpinner.succeed(
          `${this.chalk.green("success")} 🎉  Boilerplate generated`,
        );
      });
    this.projectDirectory = `${this.answers["current-directory"]}/${this.answers["project-name"]}`;
  }

  private displayProjectTree() {
    const projectStructureSpinner = this.spinner({
      text: "Generating tree view...",
      discardStdin: false,
    }).start();

    const treeData = this.tree(this.projectDirectory, {
      allFiles: true,
      maxDepth: 3,
      dirsFirst: true,
      exclude: [/node_modules/],
    });
    projectStructureSpinner.succeed(
      `${this.chalk.green("success")} Project structure view loaded`,
    );
    console.log(`\n ${this.chalk.gray(treeData)} \n`);
  }

  private installDeps() {
    const installSpinner = this.spinner({
      text: "Installing dependencies...",
      discardStdin: false,
    }).start();
    try {
      this.execa.sync("npm", ["install"], {
        cwd: this.projectDirectory,
      });
      installSpinner.succeed(
        `${this.chalk.green("success")} Dependencies installed`,
      );
    } catch (e) {
      console.log("Error:", e.message);
      process.exit(0);
    }
  }

  private displayNotes() {
    const heading = this.chalk.magenta;
    const cmd = this.chalk.yellow;
    const desc = this.chalk.gray;
    const link = this.chalk.cyan;
    const success = this.chalk.green;
    const ext = this.answers["is-ts-project"] ? "ts" : "js";
    const SPACE = this.answers["is-ts-project"] ? 5 : 0;
    const relativePathToProject = relative(
      process.cwd(),
      this.projectDirectory,
    );
    const indexFile = `${relativePathToProject}/src/index.${ext}`;

    let message = `\n${heading("Getting started:")}\n`;
    message += ` Edit  ${this.chalk.bold.white(indexFile)} file\n`;

    message += `\n${heading("Next steps:")}\n`;
    message += ` ${cmd("cd")} ${relativePathToProject}\n`;

    message += ` ${cmd("npm link")}`;
    message += `${" ".repeat(SPACE)} - ${desc("Link your module bin")}\n`;

    message += ` ${cmd("npm test")}`;
    message += `${" ".repeat(SPACE)} - ${desc("Run tests")}\n`;

    if (this.answers["is-ts-project"]) {
      message += ` ${cmd("npm run build")} - ${desc("Build files")}\n\n`;
    } else {
      message += `\n`;
    }

    message += `${heading("Help:")}\n`;
    message += `  ${cmd("lesy help")}\n\n`;

    message += `${heading("Project directory:")}\n`;
    message += `  ${link(this.projectDirectory)}\n\n`;

    message += `${heading("Documentation:")}\n`;
    message += `  ${link("https://github.com/lokesh-coder/lesyjs")}\n\n`;

    message += `${heading("Issues:")}\n`;
    message += `  ${link("https://github.com/lokesh-coder/lesyjs/issues")}\n\n`;

    message += `${success("Happy coding :)")}\n`;
    console.log(message);
  }

  private clearPreviousLines() {
    process.stdout.moveCursor(0, -5);
    process.stdout.cursorTo(0, 0); // y axis necessary?
    process.stdout.clearScreenDown();
  }
}
