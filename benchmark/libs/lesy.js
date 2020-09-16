module.exports = async (lesy) =>
  await lesy({
    loadDefaultPlugins: false,
    commands: [{ name: "greet", run: () => {} }],
  }).parse(["greet"]);
