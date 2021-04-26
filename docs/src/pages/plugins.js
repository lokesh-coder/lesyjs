import React from "react";
import Heading from "../components/common/heading";
import LinkButton from "../components/common/link-button";
import PackageCard from "../components/plugins/package-card";
import GeneralLayout from "../layouts/general.layout";

const pluginList = [
  {
    name: "Pilot UI dashboard",
    desc:
      "Execute and run commands from GUI. No extra work needed, just add this plugin, and your UI is ready",
    pkg: "@lesy/lesy-plugin-pilot",
    icon: "dashboard-3-line",
    link: "/plugins/official/pilot-dashboard",
    img: "/images/plugin-intros/pilot.png",
  },
  {
    name: "Artist UI",
    desc:
      "Format and programatically update screen contents with in-built elements like columns, spinner, progress bar., etc",
    pkg: "@lesy/lesy-plugin-artist",
    icon: "paint-brush-line",
    link: "/plugins/official/artist",
    img: "/images/plugin-intros/artist.png",
  },
  {
    name: "Automatic help",
    desc:
      "Adds help command and displays necessary info when --help flag or help command is executed",
    pkg: "@lesy/lesy-plugin-help",
    icon: "questionnaire-line",
    link: "/plugins/official/auto-help",
    img: "/images/plugin-intros/help.png",
  },
  {
    name: "Scaffold generator",
    desc: "Generate files/project boilerplate with handlebars templating",
    pkg: "@lesy/lesy-plugin-generator",
    icon: "folder-open-line",
    link: "/plugins/official/scaffold-generator",
    img: "/images/plugin-intros/generator.png",
  },
  {
    name: "Prompter",
    desc: "Interactive prompts with questions and selection options",
    pkg: "@lesy/lesy-plugin-prompt",
    icon: "question-answer-line",
    link: "/plugins/official/prompt",
    img: "/images/plugin-intros/prompter.png",
  },
  {
    name: "Local store",
    desc:
      "Manage key-value config locally and access them via command and programatically",
    pkg: "@lesy/lesy-plugin-store",
    icon: "database-2-line",
    link: "/plugins/official/local-store",
    img: "/images/plugin-intros/store.png",
  },
  {
    name: "Configuration files",
    desc:
      "Extends the support for config by allowing own customized json, yaml, js files",
    pkg: "@lesy/lesy-plugin-config",
    icon: "file-code-line",
    link: "/plugins/official/config-files",
    img: "/images/plugin-intros/config.png",
  },
  {
    name: "Arguments validator",
    desc: "Prompt for required args if it is not supplied",
    pkg: "@lesy/lesy-plugin-validator",
    icon: "apps-2-line",
    link: "/plugins/official/arg-validator",
    img: "/images/plugin-intros/validator.png",
  },
];

const PluginsPage = () => {
  return (
    <GeneralLayout title="Plugins">
      <div className="container">
        <Heading
          title="Official plugins"
          desc="Spice up your app with cool extensions"
        />
        <div className="px-5 my-10 lg:grid-cols-3 lg:gap-16 lg:grid lg:px-0">
          {pluginList.map(plugin => {
            return (
              <div className="mb-5 lg:mb-0">
                <PackageCard {...plugin} />
              </div>
            );
          })}
        </div>
        <Heading
          title="Know more"
          desc="Learn to create, publish, list plugins"
        />
        <div className="mb-20">
          <LinkButton icon="plug-line" to="/">
            What is Plugin?
          </LinkButton>
          <LinkButton icon="lightbulb-flash-line" to="/">
            Create plugin
          </LinkButton>
          <LinkButton icon="list-check-2" to="/">
            Showcase your plugins here
          </LinkButton>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default PluginsPage;
