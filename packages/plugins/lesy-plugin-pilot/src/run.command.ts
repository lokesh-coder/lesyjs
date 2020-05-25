import execa from "execa";

export default {
  name: "run",
  description: "run shell command",
  aliases: [],
  args: {
    command: {
      type: "string",
    },
  },
  visibleInList: false,

  async run({ args, utils }) {
    const chalk = utils.color();
    console.log(`${chalk.green("running")} > ${chalk.gray(args.command)}`);
    const [main, ...others] = args.command.split(" ");
    try {
      const res = await execa(main, others, {
        env: { extendEnv: true, FORCE_COLOR: true },
      } as any);
      console.log(res.stdout);
    } catch (e) {
      console.log(`${chalk.red("Error")} > ${chalk.gray(e.message)}`);
      throw e;
    }
  },
};
