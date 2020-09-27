import React from "react";
import Blade from "../visuals/blade";

const data = [
  {
    icon: "ri-file-list-3-line",
    title: "Commands",
    themes: "bg-red-200 text-red-700",
    desc:
      "Flexible command formats and auto discovery. Limitless nested sub commands and dynamic command execution.",
  },
  {
    icon: "ri-terminal-window-line",
    title: "Typescript or JavaScript",
    themes: "bg-indigo-200 text-indigo-700",
    desc:
      "Write in typescript with full types support without any additional setup.",
  },
  {
    icon: "ri-page-separator",
    title: "Plugins",
    themes: "bg-blue-200 text-blue-700",
    desc:
      "Lesy is build with powerful plugin architecture. Add cool features to your app with plugins.",
  },
  {
    icon: "ri-question-line",
    themes: "bg-pink-200 text-pink-700",
    title: "Auto help",
    desc:
      "Fully customizable beautiful automatic help generation with help plugin",
  },
  {
    icon: "ri-shopping-bag-3-line",
    title: "Middlewares",
    themes: "bg-teal-200 text-teal-700",
    desc:
      "Sync and Async middlewares if you want to change the flow or behaviour of the app",
  },
  {
    icon: "ri-settings-3-line",
    title: "Configurable",
    themes: "bg-purple-200 text-purple-700",
    desc:
      "Whether it is a simple global/local config or from config file, its just easy",
  },
];

const Features = () => {
  return (
    <div className="container mx-auto py-10 pb-10 lg:pb-24 mt-12">
      <div className="flex flex-wrap">
        {data.map((d) => (
          <div className="lg:w-2/6 mb-12 px-6">
            <Blade {...d} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Features;
