import React from "react";
import Heading from "../components/common/heading";
import GeneralLayout from "../layouts/general.layout";
import chartData from "/static/data/perf.json";

const BenchmarkPage = () => {
  const data = chartData.results;
  return (
    <GeneralLayout title="Community">
      <div className="container">
        <Heading title="Benchmark" desc="Performance stats" />
        <div className="mt-10 lg:flex lg:flex-wrap">
          <table class="table-fixed w-full">
            <thead>
              <tr>
                {Object.keys(data[0]).map(item => {
                  return (
                    <td class="px-4 py-2 text-primary font-bold capitalize">
                      {item}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map(stats => {
                return (
                  <tr>
                    {Object.values(stats).map(item => {
                      return (
                        <td className="px-4 py-2 font-medium capitalize border border-light-blue-500 text-light-blue-600">
                          {item}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default BenchmarkPage;
