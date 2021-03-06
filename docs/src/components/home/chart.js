import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const Chart = ({ data }) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        theme={{
          textColor: "var(--chart-text)",

          labels: {
            text: {
              fontWeight: "bold",
              fontSize: 13,
            },
          },
          grid: {
            line: {
              stroke: "var(--chart-lines)",
            },
          },
          axis: {
            legend: {
              text: {
                fontSize: 15,
              },
            },
            ticks: {
              text: {
                fontSize: 13,
                fill: "var(--chart-ticks)",
                textTransform: "capitalize",
              },
            },
          },
          //   fontFamily: "inherit",
          //   fontSize: "13",
          //   color: "inherit",
        }}
        data={data.results}
        keys={["ops"]}
        indexBy="name"
        margin={{ top: 50, right: 10, bottom: 100, left: 100 }}
        padding={0.3}
        groupMode="grouped"
        colorBy="index"
        colors={["#ea8685", "#f3a683", "#786fa6", "#596275"]}
        labelTextColor="var(--chart-label)"
        borderRadius={4}
        borderColor={{ from: "theme", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Libraries →",
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ops/sec  →",
          legendPosition: "middle",
          legendOffset: -70,
          format: value =>
            Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value),
        }}
      />
    </div>
  );
};
export default Chart;
