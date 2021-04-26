import clsx from "clsx";
import React from "react";
import LinkButton from "../common/link-button";
import Icon from "../common/icon";

const TwoFoldCard = ({
  text1,
  text2,
  text3,
  imgSrc,
  icon,
  link,
  align = "right",
}) => {
  return (
    <div
      className={clsx("lg:flex py-10", {
        "flex-row-reverse": align === "left",
      })}
    >
      <div className="p-5">
        <img src={imgSrc} className="max-w-full lg:max-w-1/3" />
      </div>
      <div className="p-5 ">
        <Icon
          name={icon}
          size="3xl"
          className="inline-block w-10 h-10 mb-5 leading-4 rounded-full bg-primarylight text-primary dark:bg-gray-900 dark:text-blue-300"
        />
        <div className="text-xs font-semibold uppercase text-primary dark:text-blue-300">
          {text1}
        </div>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-700 dark:text-gray-300">
          {text2}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{text3}</p>
        <LinkButton to={link} icon="arrow-right-s-line">
          View Docs
        </LinkButton>
      </div>
    </div>
  );
};

export default TwoFoldCard;
