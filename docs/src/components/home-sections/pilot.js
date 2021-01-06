import React from "react";
import FeatureSection from "../feature-section";
import Preview from "../parts/preview";

const PilotSection = () => {
  return (
    <FeatureSection
      heading="Run commands from Pilot UI"
      subheading="Pilot is a plugin for lesy, which lets you to view and run commands from any lesy projects. It is a fully functional dashboard with console viewer, prompt modal and runner"
    >
      <Preview />
    </FeatureSection>
  );
};

export default PilotSection;
