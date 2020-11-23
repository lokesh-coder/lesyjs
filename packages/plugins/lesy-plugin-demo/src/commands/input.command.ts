export default {
  name: "dummyInput",
  description: `simple text input command`,
  aliases: ["di", "inp"],
  group: "Demo",
  run: async ({ feature }) => {
    console.log("feat", feature);
    const answers = await feature.prompt([
      {
        name: "dummy-input",
        message: "Type something",
        type: "input",
      },
    ]);
    console.log(`you typed: ${answers["dummy-input"]}`);
  },
};
