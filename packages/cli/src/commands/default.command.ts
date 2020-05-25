export default {
  name: "default",
  run: ({ utils, feature }) => {
    const chalk = utils.color();
    let message = `Lesy CLI Framework - v${feature.pkg.version}\n`;
    message += `Super easy tool to create CLI applications\n\n`;
    message += `Get started by running ${chalk.bold.green(
      "lesy new [project-name]",
    )}\n`;
    console.log(message);
  },
};
