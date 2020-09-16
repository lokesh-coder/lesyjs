module.exports = (program) => {
  program.command("greet").action(function () {});

  program.parse(["./", "./", "greet"]);
};
