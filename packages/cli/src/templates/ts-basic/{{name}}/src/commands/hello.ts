export default {
  name: "hello",
  aliases: ["h", "hi", "ola"],
  args: { name: {} },
  run: ({ args }) => console.log(`Hello ${args.name || "Stranger"}!`),
};
