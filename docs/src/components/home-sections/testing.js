import React from "react";
import FeatureSection from "../feature-section";

const TestingSection = () => {
  return (
    <FeatureSection
      heading="Testing made easier and simple"
      subheading="Writing Unit test and integration test are fun in lesy"
    >
      <div className="flex justify-center">
        <img
          src="/images/lesy-testing-code.svg"
          className="w-2/4"
          alt="testing-img"
        />
      </div>
    </FeatureSection>
  );
};

export default TestingSection;
