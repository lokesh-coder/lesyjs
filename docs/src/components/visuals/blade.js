import React from "react";

const Blade = ({ icon, title, themes, desc }) => {
  return (
    <div className="p-4">
      <div className="flex items-center">
        <i
          className={`${icon} ${themes} p-2 rounded text-3xl mb-2 inline-block leading-none mr-2`}
        />
        <h3 className="font-heading font-bold">{title}</h3>
      </div>
      <p className="text-sm m-0 ">{desc}</p>
    </div>
  );
};

export default Blade;
