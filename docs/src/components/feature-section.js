import React from "react";

const FeatureSection = ({ heading, subheading, children }) => {
  return (
    <div className="container mx-auto pb-20">
      <div className="text-center  lg:px-56">
        <h3 className="text-heading text-3xl lg:text-5xl font-extrabold tracking-tighter font-banner leading-none">
          {heading}
        </h3>
        <p className="mb-8 text-xl">{subheading}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default FeatureSection;
