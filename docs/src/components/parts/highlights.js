import React from "react";
import Card from "../visuals/card";

const data = [
  {
    icon: "./svg/file-icon.svg",
    title: "Flexible",
    desc:
      "Lorem ipsum dolor sit amet consectetur abc adipisicing elit. Iusto id non a distinctio, saepe sequi recusandae. ",
    link: "/",
    linkName: "Learn more",
  },
  {
    icon: "./svg/plugin-icon.svg",
    title: "Plugins",
    desc:
      "Lorem ipsum dolor sit amet consectetur abc adipisicing elit. Iusto id non a distinctio, saepe sequi recusandae. ",
    link: "/",
    linkName: "View plugins",
  },
  {
    icon: "./svg/rocket-icon.svg",
    title: "Faster",
    desc:
      "Lorem ipsum dolor sit amet consectetur abc adipisicing elit. Iusto id non a distinctio, saepe sequi recusandae. ",
    link: "/",
    linkName: "View benchmark",
  },
];

const Highlights = () => {
  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col lg:flex-row">
        {data.map(f => (
          <Card {...f} classNames="mx-12">
            {f.desc}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
