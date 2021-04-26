import clsx from "clsx";
import React, { useState, useEffect } from "react";
import SplitCard from "../split-card";

const CommandFeature = () => {
  const features = [
    {
      icon: "file-copy-2-line",
      title: "Multiple formats",
      desc:
        "Commands can be a simple object, class or function. And with efficient file discovery, just provide file path or directory for lookup",
    },
    {
      icon: "terminal-line",
      title: "Deeply nested sub commands",
      desc:
        "With just an one line change, run unlimited multi level nested sub commands",
    },
    {
      icon: "flashlight-line",
      title: "Run programatically",
      desc:
        "For apps like bots, or for complex use case, parse, find and run commands externally",
    },
    {
      icon: "braces-line",
      title: "Async execution",
      desc: "Commands are fully suported for async run",
    },
    {
      icon: "menu-add-line",
      title: "... and more",
      desc: "Powerful flag parsing, inbuild utilities, ...",
    },
  ];

  const [highlight, setHighlight] = useState(true);

  const onMouseEnter = () => {
    setHighlight(false);
  };

  const onMouseLeave = () => {
    setHighlight(true);
  };

  const FeatureCard = ({ icon, title, desc, active }) => {
    return (
      <div
        className={clsx(
          "flex items-center px-6 py-3 mb-2 rounded-lg hover:bg-white hover:shadow-lg dark:hover:bg-gray-800",
          {
            ["shadow-lg bg-white dark:bg-gray-800"]: active,
          }
        )}
      >
        <i className={`ri-${icon} text-primary pr-4 text-xl leading-4`} />
        <div>
          <h3 className="font-semibold tracking-tight text-gray-600 text-md dark:text-gray-300">
            {title}
          </h3>
          <p className="my-0 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700">
      <SplitCard
        text1="Smart _arg parser_ and command architecture"
        text2="By keeping all the complex logic under the carpet, lesy surfaces intuitive commands API and powerful mechanism to run them flawlessly. Not just that, commands also packed with tons of cool features."
        link="/docs/components/commands"
      >
        <div
          className="py-6 bg-transparent rounded-lg md:mx-12 "
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {features.map((data, i) => {
            return (
              <FeatureCard {...data} active={highlight && i === 1} key={i} />
            );
          })}
        </div>
      </SplitCard>
    </div>
  );
};

export default CommandFeature;
