import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const Chart = ({ data }) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        theme={{
          fontFamily: "inherit",
          fontSize: "13",
          color: "inherit",
        }}
        data={data.results}
        keys={["ops"]}
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colorBy="index"
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "theme", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Libraries",
          legendPosition: "middle",
          legendOffset: 44,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ops/sec",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "theme", modifiers: [["darker", 1.6]] }}
      />
    </div>
  );
};
export default Chart;
