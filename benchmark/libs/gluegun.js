module.exports = async (greet) => {
  const movieCLI = greet("greetings")
    .command({
      name: "greet",
      run: () => {},
    })
    .src(__dirname)
    .exclude([
      "meta",
      "strings",
      "print",
      "filesystem",
      "semver",
      "system",
      "prompt",
      "http",
      "template",
      "patching",
    ])
    .create();

  await movieCLI.run(["greet"]);
};
