const commands = [`${__dirname}/commands`];
const plugins = [
  "@lesy/lesy-plugin-generator",
  "@lesy/lesy-plugin-prompt",
  "@lesy/lesy-plugin-help",
  [
    "@lesy/lesy-plugin-pilot",
    {
      docTitle: "Lesy CLI | Dashboard",
      appName: "Lesy CLI",
    },
  ],
];

export { commands, plugins };
