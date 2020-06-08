const path = require("path");
const stripAnsi = require("strip-ansi");

export class LesyTestBed {
  logs = [];
  add(m) {
    this.logs.push(m);
  }
  constructor(private data) {
    this.data = data;
  }
  async run(params) {
    process.stdout["_orig_write"] = process.stdout.write;
    process.stdout["_dup_write"] = process.stdout.write;
    (process.stdout as any).write = (data: string) => {
      this.add(data.replace(/\n*\s*(console\.).*/gi, "\r").trim());
      process.stdout["_orig_write"](data);
    };
    process.on("exit", () => {
      console.log("exiting process");
      (process.stdout as any).write = process.stdout["_dup_write"];
    });
    try {
      await require("@lesy/compiler")({
        isTypescriptApp: true,
        loadDefaultPlugins: false,
        customTsConfig: `${__dirname}/custom.tsConfig.json`,
        root: path.resolve(__dirname, "../"),
        ...this.data,
      }).parse(params);
      (process.stdout as any).write = process.stdout["_dup_write"];
      return stripAnsi(this.logs.join("\n"));
    } catch (error) {
      console.log(error.stderr);
    }
  }
}
