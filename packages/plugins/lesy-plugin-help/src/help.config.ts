import { HelpConfig } from "./help.model";

const defaultConfig: HelpConfig = {
  customHelpCommand: "help",
  description: "Display Help",
  aliases: ["h"],
  usageLabel: "Usage",
  argumentsLabel: "Arguments",
  flagsLabels: "Options",
  subCommandsLabels: "Sub commands",
  commandsLabel: "Commands",
  infoLabel: "Info",
  aliasesLabel: "Aliases",
  optionsLabel: "Options",
  emptyDescription: "-",
  sectionSeperator: " - ",
  sectionWidth: 40,
  argumentStr: "<argument>",
  commandStr: "<command>",
  optionsStr: "[...options]",
};
export { defaultConfig };
