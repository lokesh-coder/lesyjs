const routes = {
  docs: {
    "getting-started": {
      label: "Getting started",
      ctx: { icon: "ri-apps-2-line" },
      children: [
        {
          label: "Introduction",
          path: "introduction",
        },
        {
          label: "Installation and setup",
          path: "installation",
        },
        {
          label: "Overview",
          path: "overview",
        },
      ],
    },
    components: {
      label: "Core components",
      ctx: { icon: "ri-settings-6-line" },
      children: [
        {
          label: "Commands",
          path: "commands",
        },
        {
          label: "Middlewares",
          path: "middlewares",
        },
        {
          label: "Features",
          path: "features",
        },
        {
          label: "Plugins",
          path: "plugins",
        },
        {
          label: "Configuration",
          path: "configuration",
        },
        {
          label: "Validators",
          path: "validators",
        },
      ],
    },
    testing: {
      label: "Testing",
      ctx: { icon: "ri-bug-line" },
      children: [
        {
          label: "Unit & intergration test",
          path: "testbed",
        },
      ],
    },
    extensions: {
      label: "Extensions",
      ctx: { icon: "ri-plug-line" },
      children: [
        {
          label: "Plugins",
          path: "plugins-overview",
        },
        {
          label: "Libraries",
          path: "libraries-overview",
        },
      ],
    },
    // resources: {
    //   label: "Tools and resources",
    //   ctx: { icon: "ri-shopping-bag-2-line" },
    //   children: [
    //     {
    //       label: "Lesy CLI",
    //       path: "lesy-cli",
    //     },
    //     {
    //       label: "Starter template",
    //       path: "starter-template",
    //     },
    //   ],
    // },
    development: {
      label: "Development",
      ctx: { icon: "ri-tools-line" },
      children: [
        {
          label: "Project overview",
          path: "project-overview",
        },
        {
          label: "Local setup",
          path: "local-setup",
        },
        {
          label: "Indepth concepts",
          path: "indepth-concepts",
        },
      ],
    },
    codebase: {
      label: "Codebase",
      ctx: { icon: "ri-braces-line" },
      children: [
        {
          label: "Release notes",
          path: "release-notes",
        },
        {
          label: "Roadmap",
          path: "roadmap",
        },
        {
          label: "Contributing",
          path: "contributing",
        },
        {
          label: "License",
          path: "license",
        },
      ],
    },
  },
  tutorial: {
    "todo-app": {
      label: "Build todo app",
      ctx: { icon: "ri-booklet-line" },
      children: [
        {
          label: "#0 - Overview",
          path: "overview",
        },
        {
          label: "#1 - Add database",
          path: "step-1-add-database",
        },
        {
          label: "#2 - Create commands",
          path: "step-2-create-commands",
        },
        {
          label: "#3 - Add todo stats at footer",
          path: "step-3-add-todo-stats",
        },
        {
          label: "#4 - Display help",
          path: "step-4-display-help",
        },
        {
          label: "#5 - Web interface",
          path: "step-5-web-interface",
        },
        {
          label: "#6 - Dynamic todo",
          path: "step-6-dynamic-todo",
        },
        {
          label: "#7 - Testing",
          path: "step-7-testing",
        },
        {
          label: "#8 - Wrap up",
          path: "wrapup-and-release",
        },
      ],
    },
  },
  plugins: {
    official: {
      label: "Official plugins",
      ctx: { icon: "ri-plug-2-line" },
      children: [
        {
          label: "Pilot dashboard",
          path: "pilot-dashboard",
        },
        {
          label: "Artist",
          path: "artist",
        },
        {
          label: "Scaffold generator",
          path: "scaffold-generator",
        },
        {
          label: "Local store",
          path: "local-store",
        },
        {
          label: "Config files",
          path: "config-files",
        },
        {
          label: "Arg validator",
          path: "arg-validator",
        },
        {
          label: "Auto help",
          path: "auto-help",
        },
        {
          label: "Prompt",
          path: "prompt",
        },
        {
          label: "Sidekick",
          path: "sidekick",
        },
      ],
    },
  },
  libraries: {
    standalone: {
      label: "Standalone libraries",
      ctx: { icon: "ri-suitcase-3-line" },
      children: [
        {
          label: "Artist UI",
          path: "artist-UI",
        },
        {
          label: "Object validator",
          path: "object-validator",
        },
      ],
    },
  },
};

const redirected = [
  {
    from: "/docs/",
    to: "/docs/getting-started/introduction",
  },
  {
    from: "/tutorial/",
    to: "/tutorial/todo-app/overview",
  },
];

module.exports = { routes, redirected };
