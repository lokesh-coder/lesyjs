const commands = [`${__dirname}/commands`];
const plugins = [
  "@lesy/lesy-plugin-generator",
  "@lesy/lesy-plugin-prompt",
  "@lesy/lesy-plugin-help",
  [
    "@lesy/lesy-plugin-pilot",
    { docTitle: "Lesy | Dashboard", appName: "Lesy Dashboard" },
  ],
];

export { commands, plugins };
