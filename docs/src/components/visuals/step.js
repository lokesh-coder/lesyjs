import React from "react";
const Step = ({ icon, step, title }) => {
  return (
    <div className="flex items-center mb-3">
      <i className={`ri-${icon} text-primary text-2xl`} />
      <div className="ml-2 leading-snug">
        <span className="uppercase font-semibold font-heading text-xs tracking-tight">
          Step {step}:
        </span>
        <h4 className="font-base font-bold font-heading text-subheading tracking-tight">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default Step;
