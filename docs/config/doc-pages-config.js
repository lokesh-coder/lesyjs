const pageSectionNames = {
  "get-started": "Get started",
  core: "Core",
  library: "Library",
  develop: "Develop",
  recipies: "Recipies",
  docs: "Plugins",
};

const mainScreenMenuLinks = [
  "main/get-started/overview.md",
  "main/get-started/installation.md",
  "main/get-started/concepts.md",
  "main/core/commands.md",
  "main/core/middlewares.md",
  "main/core/features.md",
  "main/core/plugins.md",
  "main/core/config.md",
  "main/core/testing.md",
  "main/core/even-more.md",
  "main/library/official-plugins.md",
  "main/library/helpers.md",
  "main/develop/api.md",
  "main/develop/release-notes.md",
  "main/develop/roadmap.md",
  "main/develop/credits.md",
];

const devScreenMenuLinks = [
  "dev/recipies/performance.md",
  "dev/recipies/sample2.md",
];

const pluginsScreenMenuLinks = [
  "plugins/docs/generator.md",
  "plugins/docs/configfiles.md",
  "plugins/docs/configstore.md",
  "plugins/docs/help.md",
  "plugins/docs/pilot.md",
  "plugins/docs/prompt.md",
  "plugins/docs/validator.md",
];

module.exports = {
  mainScreenMenuLinks,
  devScreenMenuLinks,
  pageSectionNames,
  pluginsScreenMenuLinks,
};
