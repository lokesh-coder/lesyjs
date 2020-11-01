const helpContent = `
# Changing configuration
If you would like to change page title, app name you can do it from Pilot plugin config. In your plugins property add or modify these values,

\`\`\`ts
const commands = [\`\${__dirname}/commands\`];
const plugins = [
  "@lesy/lesy-plugin-prompt",
  "@lesy/lesy-plugin-help",
  [
    "@lesy/lesy-plugin-pilot",
    { docTitle: "Lesy | Dashboard", appName: "Lesy Dashboard" },
  ],
];

export { commands, plugins };
\`\`\`

Your app command name and version is automatically fetched from \`package.json\` file.

\`\`\`json
{
  "name": "lesy",
  "version": "1.0.0",
  "main": "dist/index.js",
  "bin": {
    "lesy": "bin/cmd"
  },
}

\`\`\`

<br/>
<br/>

# Adding projects to workspace

You can add multiple lesy apps in to the workspace efforlessly. By default all globally installed lesy apps will be shown in workspace screen.

\`\`\`
npm install --global some-lesy-project
\`\`\`

If you have already installed lesy cli, then you can open the pilot from cli app, and it will list down all globally installed lesy apps. This is the same behaviour even if you run your own app.

<br/>
<br/>

# Hiding commands in Pilot UI

In your command, if you set \`isVisible\` to \`false\`, it will be hidden in UI. To know more about command properties [check this out](https://lesyjs.io/docs/core/commands#anatomy-of-command)

<br/>
<br/>

# Grouping commands

In your commands, if you assign a name to \` group\` property, they will be grouped under same name

`;

export { helpContent };
