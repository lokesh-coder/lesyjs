const pageSectionNames = {
  "get-started": "Get started",
  core: "Core",
  library: "Library",
  develop: "Develop",
  recipies: "Recipies",
  docs: "Plugins",
};

const mainScreenMenuLinks = [
  "screen:main/get-started/overview.md",
  "screen:main/get-started/installation.md",
  "screen:main/get-started/concepts.md",
  "screen:main/core/commands.md",
  "screen:main/core/middlewares.md",
  "screen:main/core/features.md",
  "screen:main/core/plugins.md",
  "screen:main/core/config.md",
  "screen:main/core/testing.md",
  "screen:main/core/even-more.md",
  "screen:main/library/official-plugins.md",
  "screen:main/library/helpers.md",
  "screen:main/develop/api.md",
  "screen:main/develop/release-notes.md",
  "screen:main/develop/roadmap.md",
  "screen:main/develop/credits.md",
];

const devScreenMenuLinks = [
  "screen:dev/recipies/performance.md",
  "screen:dev/recipies/sample2.md",
];

const pluginsScreenMenuLinks = [
  "screen:plugins/docs/generator.md",
  "screen:plugins/docs/configfiles.md",
  "screen:plugins/docs/configstore.md",
  "screen:plugins/docs/help.md",
  "screen:plugins/docs/pilot.md",
  "screen:plugins/docs/prompt.md",
  "screen:plugins/docs/validator.md",
];

module.exports = {
  mainScreenMenuLinks,
  devScreenMenuLinks,
  pageSectionNames,
  pluginsScreenMenuLinks,
};
