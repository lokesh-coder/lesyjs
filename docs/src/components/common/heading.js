import React from "react";

const Heading = ({ title, desc }) => {
  return (
    <div className="my-16 text-center ">
      <h1 className="text-5xl font-bold tracking-tighter text-gray-700 dark:text-gray-300">
        {title}
      </h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
};

export default Heading;
