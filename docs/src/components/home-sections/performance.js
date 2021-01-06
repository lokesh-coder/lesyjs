import React from "react";
import FeatureSection from "../feature-section";
import data from "../../../../benchmark/results/perf.json";
import Chart from "../../components/visuals/chart.js";

const PerformanceSection = () => {
  return (
    <FeatureSection
      heading="Lesy is just faster"
      subheading="Lesy does lot of work, but never compromised on performance"
    >
      <div className="flex justify-center">
        <div className="w-2/4">
          <Chart data={data} />
        </div>
      </div>
    </FeatureSection>
  );
};

export default PerformanceSection;
