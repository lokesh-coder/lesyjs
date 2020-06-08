import React from "react";
import Blade from "../visuals/blade";

const data = [
  {
    icon: "ri-file-list-3-line",
    themes: "bg-red-200 text-red-700",
    desc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam expedita  ",
  },
  {
    icon: "ri-terminal-window-line",
    themes: "bg-indigo-200 text-indigo-700",
    desc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam expedita  ",
  },
  {
    icon: "ri-page-separator",
    themes: "bg-blue-200 text-blue-700",
    desc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam expedita  ",
  },
  {
    icon: "ri-question-line",
    themes: "bg-pink-200 text-pink-700",
    desc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam expedita  ",
  },
  {
    icon: "ri-shopping-bag-3-line",
    themes: "bg-teal-200 text-teal-700",
    desc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam expedita  ",
  },
  {
    icon: "ri-settings-3-line",
    themes: "bg-purple-200 text-purple-700",
    desc:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam expedita  ",
  },
];

const Features = () => {
  return (
    <div className="container mx-auto py-24 pb-10 lg:pb-24 mt-12">
      <div className="bg-secondary w-5/6 lg:w-2/6 rounded-lg text-white font-medium pl-10 pr-40 py-6 happy mb-20 mx-auto">
        Some cool features that you should try today!
      </div>
      <div className="flex flex-wrap">
        {data.map(d => (
          <div className="lg:w-2/6 mb-12 px-6">
            <Blade {...d} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Features;
