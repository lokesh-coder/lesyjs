import React from "react";
import Blade from "../visuals/blade";

const data = [
  {
    title: "Pilot UI dashboard",
    link: "/docs/plugins/pilot-ui",
    package: "@lesy/lesy-plugin-pilot",
    icon: "dashboard-3",
    desc:
      "Execute and run commands from GUI. No extra work needed, just add this plugin, and your UI is ready",
  },
  {
    title: "Artist UI",
    link: "/docs/plugins/artist-ui",
    package: "@lesy/lesy-plugin-artist",
    icon: "paint-brush",
    desc:
      "Format and programatically update screen contents with in-built elements like columns, spinner, progress bar., etc",
  },
  {
    title: "Automatic help",
    link: "/docs/plugins/help",
    package: "@lesy/lesy-plugin-help",
    icon: "questionnaire",
    desc:
      "Adds help command and displays necessary info when --help flag or help command is executed",
  },
  {
    title: "Scaffold generator",
    link: "/docs/plugins/scaffold-generator",
    package: "@lesy/lesy-plugin-generator",
    icon: "folder-open",
    desc: "Generate files/project boilerplate with handlebars templating",
  },
  {
    title: "Prompter",
    link: "/docs/plugins/prompt",
    package: "@lesy/lesy-plugin-prompt",
    icon: "question-answer",
    desc: "Interactive prompts with questions and selection options",
  },
  {
    title: "Local store",
    link: "/docs/plugins/config-store",
    package: "@lesy/lesy-plugin-store",
    icon: "database-2",
    desc:
      "Manage key-value config locally and access them via command and programatically",
  },
  {
    title: "Configuration file",
    link: "/docs/plugins/config-files",
    package: "@lesy/lesy-plugin-config",
    icon: "file-code",
    desc:
      "Extends the support for config by allowing own customized json, yaml, js files",
  },
  {
    title: "Arguments validator",
    link: "/docs/plugins/arg-validator",
    package: "@lesy/lesy-plugin-validator",
    icon: "apps-2",
    desc: "Prompt for required args if it is not supplied",
  },
];

const PluginsList = () => {
  return (
    <div className="container mx-auto py-10 pb-10 lg:pb-24 mt-12">
      <div className="flex flex-wrap">
        {data.map((d) => (
          <div className="lg:w-2/6 px-6 flex items-start mb-10">
            <i class={`ri-${d.icon}-line text-gray-400 text-2xl mr-4`}></i>
            <div>
              <h3 className="text-primary text-md font-semibold font-subheading">
                {d.title}
              </h3>
              <p className="mb-0 text-gray-800 mt-0">{d.desc}</p>
              <a
                href={d.link}
                className="text-gray-600 font-medium text-sm flex items-center"
              >
                {d.package} <i class="ri-arrow-drop-right-line"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PluginsList;
