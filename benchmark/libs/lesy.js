module.exports = async (lesy) =>
  await lesy({
    loadDefaultPlugins: false,
    commands: [{ name: "greet", run: () => console.log("lesy: hello world") }],
  }).parse(["greet"]);
