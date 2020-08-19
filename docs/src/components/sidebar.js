import React from "react";
import { Link } from "gatsby";
import groupBy from "lodash/groupBy";
import Brand from "./visuals/brand";

const MenuLinks = ({ allContent }) => {
  return (
    <ul className="level-1">
      {allContent.map((c) => {
        const { frontmatter: fm, fields } = c.node;
        return (
          <li className="mb-1">
            <Link
              to={`${fm.path}`}
              className="text-gray-600 font-medium flex text-base hover:text-gray-800 group"
              activeClassName="active text-primary"
              partiallyActive={true}
            >
              <i
                className={`mr-3 text-lg text-gray-600 active:text-primary group-hover:text-gray-800 ri-${fm.icon}`}
              ></i>
              <span className="flex-1">{fields.title}</span>
              {fm.skip && <i class="ri-anchor-fill"></i>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Sidebar = ({ allContent }) => {
  let isMainscreen = false;

  let pagesObj = groupBy(allContent, (item) => {
    return item.node.fields.section;
  });

  if (allContent[0] && allContent[0].node.fields.screen === "main") {
    isMainscreen = true;
  }

  let pages = Object.keys(pagesObj).map((k) => ({
    section: k,
    pages: pagesObj[k],
  }));

  return (
    <div
      className={`bg-light border-r border-gray-300 fixed w-full lg:w-1/5 overflow-auto h-screen `}
    >
      <div className="fixed top-0 bg-white z-10 hidden lg:block sticky">
        <Brand />
      </div>
      {!isMainscreen && (
        <Link
          className="p-4 text-sm border-b border-gray-300 flex justify-center text-gray-600 no-underline transition-all hover:bg-secondary hover:text-white"
          to="/docs/get-started/overview"
        >
          <i class="ri-arrow-left-line mr-2"></i> Back to main menu
        </Link>
      )}
      <div className="py-3 px-10 flex">
        <ul className="level-0 w-full">
          {pages.map((page) => {
            return (
              <li className="mb-2">
                <div className="text-xs uppercase font-semibold text-gray-800 my-3">
                  {page.section}
                </div>
                <MenuLinks allContent={page.pages} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
