export default function prompt(feature: any) {
  feature.promptConfig = {
    customPrompt: null,
  };
  Object.defineProperty(feature, "prompt", {
    get: () => {
      const { customPrompt } = feature.promptConfig;
      if (customPrompt) {
        return customPrompt;
      }
      const inquirer = require("inquirer");
      return inquirer.prompt;
    },
  });
}
