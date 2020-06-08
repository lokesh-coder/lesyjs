export default {
  name: "command name",
  description: `only hyphen is allowed in command name and aliases`,
  aliases: ["str with space", "no space"],
  group: "Demo",
  run: () => {
    console.log("command name sample");
  },
};
