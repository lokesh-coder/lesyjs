import React from "react";

const data = [
  {
    icon: "ri-star-line",
    text: "21 stars",
  },
  {
    icon: "ri-git-branch-line",
    text: "9 forks",
  },
  {
    icon: "ri-group-line",
    text: "3 contributors",
  },
  {
    icon: "ri-calendar-line",
    text: "2 nov 19",
  },
  {
    icon: "ri-download-cloud-line",
    text: "67 downloads",
  },
];

const Stats = () => {
  return (
    <div className="container mx-auto py-5 flex justify-between flex-col lg:flex-row px-5 lg:px-0">
      <section className="text-gray-500 flex items-center mb-10 lg:mb-0 text-xs lg:text-base">
        {data.map(d => (
          <span className="mr-2 lg:mr-5 flex flex-col lg:flex-row items-center">
            <i className={`${d.icon} text-primary text-lg mr-1`}></i> {d.text}
          </span>
        ))}
      </section>
      <button className="bg-primary text-white py-3 px-6 rounded-full font-medium lg:inline-flex text-sm items-center text-center">
        Get started
      </button>
    </div>
  );
};

export default Stats;
