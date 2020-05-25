export default {
  on: "PRE_VALIDATE",
  async run({ runningCommand: cmd, args, feature }) {
    console.log("***", feature);
    const missingValues = [];
    let newArgs = cmd.args;
    Object.keys(cmd.args).forEach((key: any) => {
      if (!args[key]) {
        missingValues.push(key);
      }
    });
    if (missingValues.length > 0) {
      const questions = [];
      missingValues.forEach((ques: any) => {
        questions.push({
          message: ques,
          type: "input",
          name: ques,
        });
      });
      if (!feature.prompt) {
        console.info(
          "@lesy/lesy-plugin-prompt plugin is missing. Please install and add it to plugins array",
        );
        return;
      }
      const ans = await feature.prompt(questions);
      newArgs = { ...args, ...ans };
    }
    return { cmd, args: newArgs };
  },
};
