import React from "react";
import FeatureSection from "../feature-section";
import Features from "../parts/features";

const CommandsSection = () => {
  return (
    <FeatureSection
      heading="Powerful command parsing"
      subheading="Whether it is a simple command or a multi-level complex one, it got covered"
    >
      <Features />
    </FeatureSection>
  );
};

export default CommandsSection;
