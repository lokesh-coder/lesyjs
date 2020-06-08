export interface HelpConfig {
  customHelpCommand: string;
  description: string;
  aliases: string[];
  usageLabel: string;
  argumentsLabel: string;
  flagsLabels: string;
  subCommandsLabels: string;
  commandsLabel: string;
  infoLabel: string;
  aliasesLabel: string;
  optionsLabel: string;
  emptyDescription: string;
  sectionSeperator: string;
  sectionWidth: number;
  argumentStr: string;
  commandStr: string;
  optionsStr: string;
}
