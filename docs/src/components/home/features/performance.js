import React from "react";
import Chart from "../chart";
import SplitCard from "../split-card";
import chartData from "../../../../static/data/perf.json";

const PerfFeature = () => {
  return (
    <div className="py-5 bg-gray-100 dark:bg-gray-700">
      <SplitCard
        text1="Lesy is just _faster_ and performant"
        text2="Though lesy does too many things, it is still faster by executing only necessary code."
        link="/benchmark"
      >
        <div className="w-full py-6 md:mx-8">
          <Chart data={chartData} />
        </div>
      </SplitCard>
    </div>
  );
};

export default PerfFeature;
