import React from "react";

const OtherFeatures = () => {
  const data = [
    {
      icon: "settings-3-line",
      title: "Configurable",
      desc:
        "Whether it is a simple global/local config or from config file, its just easy",
      colors: ["#FCEFEE", "#FA7C86"],
    },
    {
      icon: "briefcase-line",
      title: "Toolkit",
      desc:
        "Add new features  and share between commands and middlewares using toolkit",
      colors: ["#FBEED7", "#F39E30"],
    },
    {
      icon: "text",
      title: "Typescript",
      desc:
        " Write in typescript with full types support without any additional setup",
      colors: ["#FDEEF5", "#F62575"],
    },
    {
      icon: "terminal-line",
      title: "Lesy CLI",
      desc: "Scaffold new project and run Pilot web UI",
      colors: ["#E8F2FC", "#6066FA"],
    },
    {
      icon: "plug-line",
      title: "Plugins plugin",
      desc: "Allow plugin support to own or community plugins",
      colors: ["#E6F8EF", "#1ABA51"],
    },
    {
      icon: "shopping-bag-3-line",
      title: "Inbuilt utils",
      desc: "Bundled with inbuilt utils to work with colors and spinner",
      colors: ["#DAF7F8", "#11A8D5"],
    },
  ];
  return (
    <div className="container">
      <div className="mb-16 text-center">
        <h2 className="px-6 text-4xl font-bold tracking-tighter text-gray-700 dark:text-gray-300">
          Lesy has more for you
        </h2>
        <p className="mt-0 leading-6 text-gray-600 dark:text-gray-400">
          If you are still hungry, here's some more features you might like
        </p>
      </div>
      <div className="flex flex-wrap">
        {data.map(({ icon, title, desc, colors }) => {
          return (
            <div className="mb-12 lg:w-2/6 md:px-6" key={title}>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <i
                    className={`ri-${icon} bg-red-200 text-red-700  rounded-full text-3xl inline-block leading-none mr-2 dark:!bg-transparent`}
                    style={{ backgroundColor: colors[0], color: colors[1] }}
                  ></i>
                  <h3 className="font-semibold tracking-tight text-gray-600 text-md dark:text-gray-300">
                    {title}
                  </h3>
                </div>
                <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherFeatures;
