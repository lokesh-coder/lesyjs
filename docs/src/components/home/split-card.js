import clsx from "clsx";
import React from "react";
import LinkButton from "../common/link-button";

const SplitCard = ({ align = "right", children, text1, text2, link = "/" }) => {
  const heading = text1.replace(
    /_(.+)_/,
    '<span class="text-primary">$1</span>'
  );
  return (
    <div className="">
      <div
        className={clsx("lg:flex py-10 container", {
          "flex-row-reverse": align === "left",
        })}
      >
        <div className="flex items-center md:p-5 lg:w-1/2">{children}</div>
        <div className="flex items-center order-2 px-6 py-5 md:px-24 lg:w-1/2">
          <div>
            <h2
              className="text-3xl font-medium tracking-tighter text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: heading }}
            ></h2>
            <p
              className="leading-6 text-gray-600 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: text2 }}
            ></p>
            <LinkButton to={link} icon="arrow-right-s-line">
              Learn more
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitCard;
