import React from "react";
import FeatureSection from "../feature-section";
import PluginsList from "../parts/plugins-list";

const PluginsSection = () => {
  return (
    <FeatureSection
      heading="Extend lesy with plugins"
      subheading="Plugins are the best possible way to extend, tweak or resuse the functionality "
    >
      <PluginsList />
    </FeatureSection>
  );
};

export default PluginsSection;
