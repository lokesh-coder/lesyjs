import React from "react";

const Reel = () => {
  const data = [
    {
      icon: "command",
      text: "Smart parser",
    },
    {
      icon: "middleware",
      text: "Middlewares",
    },
    {
      icon: "plugins",
      text: "Plugins",
    },
    {
      icon: "pilot",
      text: "Web interface",
    },
    {
      icon: "artist",
      text: "Visual elements",
    },
    {
      icon: "performance",
      text: "Faster",
    },
    {
      icon: "more",
      text: "and more",
    },
  ];

  return (
    <div className="flex items-start my-28 ">
      {data.map(({ icon, text }) => {
        return (
          <div className="flex flex-col items-center justify-center flex-1 px-5">
            <img
              src={`/images/home-icons/${icon}.png`}
              width="30"
              className="mb-2"
            />
            <div className="text-xs font-semibold text-center uppercase text-secondary">
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Reel;
