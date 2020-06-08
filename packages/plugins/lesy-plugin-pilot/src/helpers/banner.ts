const boxen = require("boxen");

export const printAddressBanner = (chalk, local, network) => {
  let message = chalk.green(`Pilot is running...\n\n`);
  message += `${chalk.yellow.bold("- Local  ")} ${local}\n`;
  message += `${chalk.yellow.bold("- Network")} ${network}`;
  console.log(
    boxen(message, {
      padding: 1,
      borderColor: "green",
      margin: 1,
      dimBorder: true,
    }),
  );
};
