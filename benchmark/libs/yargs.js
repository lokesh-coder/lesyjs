module.exports = yargs => {
  yargs
    .command(
      "greet",
      "greeting",
      () => {},
      argv => {
        console.log("yargs: hello world");
      },
    )
    .parse(["greet"]);
};
