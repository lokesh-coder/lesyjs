import React from "react";
import clsx from "clsx";

const Icon = ({ name, size = "base", col = "gray-500", className = "" }) => {
  return (
    <i
      className={clsx(`ri-${name} text-${size} ${className}`, {
        [`text-${col}`]: col,
      })}
    />
  );
};

export default Icon;
