import React from "react";
import Icon from "../common/icon";
import LinkButton from "../common/link-button";

const PackageCard = ({ name, desc, pkg, icon, link, img }) => {
  return (
    <div className="p-5 overflow-hidden transition-all transform shadow bg-gray-50 hover:shadow-2xl rounded-xl dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 hover:scale-110">
      <div className="flex items-center mb-5">
        <i
          className={`p-2 mr-3 text-xl text-gray-400 bg-gray-100 rounded-full ri-${icon} leading-4 dark:bg-gray-800`}
        />
        <div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
            {name}
          </h2>
          <div className="text-sm text-gray-400">{pkg}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl">
        <img src={img} />
      </div>
      <p className="h-20 text-base text-gray-600 line-clamp-3 dark:text-gray-300">
        {desc}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <a href="/" className="inline-flex">
            <Icon
              name="github-fill"
              size="2xl"
              className="px-2 py-1 hover:text-primary"
              col="gray-400"
            />
          </a>
          <a href="/" className="inline-flex">
            <Icon
              name="npmjs-line"
              size="2xl"
              className="px-2 py-1 hover:text-primary"
              col="gray-400"
            />
          </a>
        </div>
        <LinkButton to={link} icon="book-2-line">
          Read the docs
        </LinkButton>
      </div>
    </div>
  );
};
export default PackageCard;
