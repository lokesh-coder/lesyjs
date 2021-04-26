import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const DocTOC = ({ items }) => {
  let level = 0;
  const getItems = items => {
    if (!items) return null;
    level += 1;
    const rootItemCls =
      level === 1 ? "font-medium pb-1 text-gray-600 dark:text-gray-300" : "";
    return items.map(item => {
      return (
        <div className="py-1 text-sm">
          <Link to={item.url} className={`${rootItemCls} block`}>
            {item.title}
          </Link>
          {item.items && (
            <div className="px-3 mb-2">{getItems(item.items)}</div>
          )}
        </div>
      );
    });
  };
  if (!items) return null;

  return (
    <div className="mt-5 toc">
      <div className="mb-5 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-400">
        On this page
      </div>
      {getItems(items)}
    </div>
  );
};

DocTOC.propTypes = {
  items: PropTypes.array.isRequired,
};

export default DocTOC;
