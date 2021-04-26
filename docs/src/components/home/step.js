import React from "react";
const Step = ({ icon, step, title }) => {
  return (
    <div className="flex items-center mb-3">
      <i className={`ri-${icon} text-primary text-2xl`} />
      <div className="ml-2 leading-snug">
        <span className="text-xs font-semibold tracking-tight text-gray-400 uppercase">
          Step {step}:
        </span>
        <h4 className="font-bold tracking-tight text-gray-700 font-base text-heading dark:text-gray-300">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default Step;
