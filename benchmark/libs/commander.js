module.exports = program => {
  program.command("greet").action(function() {
    console.log("commander: Hello world");
  });

  program.parse(["./", "./", "greet"]);
};
