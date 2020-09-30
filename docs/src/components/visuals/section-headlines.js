import React from "react";

const SectionHeadlines = ({ title, subtitle }) => {
  const heading = title.replace(
    /_(.+)_/,
    "<span class='text-primary'>$1</span>",
  );
  return (
    <div className="flex flex-col items-center pt-16">
      <h2
        className="text-heading font-heading font-extrabold text-5xl text-center leading-tight"
        dangerouslySetInnerHTML={{ __html: heading }}
      ></h2>
      <p className="text-center text-lg my-6 lg:w-2/4">{subtitle}</p>
    </div>
  );
};

export default SectionHeadlines;
