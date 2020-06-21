import React from "react";

const Blade = ({ icon, themes, desc }) => {
  return (
    <div className="flex items-center p-4 tile">
      <i
        className={`${icon} text-gray-500 p-3 text-2xl mb-2 inline-block leading-none mr-2`}
      />
      <p className="text-sm m-0">{desc}</p>
    </div>
  );
};

export default Blade;
