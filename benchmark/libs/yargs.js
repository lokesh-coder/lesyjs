module.exports = (yargs) => {
  yargs
    .command(
      "greet",
      "greeting",
      () => {},
      (argv) => {},
    )
    .parse(["greet"]);
};
