import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { groupBy } from "lodash-es";
import Brand from "./visuals/brand";

const MenuLinks = ({ allContent }) => {
  return (
    <ul className="level-1">
      {allContent.map((c) => {
        return (
          <li>
            <Link
              to={`/docs${c.node.frontmatter.path}`}
              activeClassName="active"
              partiallyActive={true}
            >
              <i className={`ri-${c.node.frontmatter.icon}`}></i>
              <span>{c.node.fields.title}</span>
              {c.node.frontmatter.skip && <i class="ri-anchor-fill"></i>}
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

  if (allContent[0] && allContent[0].node.fields.screen == "main") {
    isMainscreen = true;
  }

  let pages = Object.keys(pagesObj).map((k) => ({
    section: k,
    pages: pagesObj[k],
  }));

  return (
    <div
      className={`bg-white border-r border-gray-300 fixed w-full lg:w-1/4 overflow-auto h-screen `}
    >
      <div className="fixed top-0 bg-white z-10 hidden lg:block sticky">
        <Brand />
      </div>
      {!isMainscreen && (
        <Link className="sidebar--backbtn" to="/docs/get-started/overview">
          <i class="ri-arrow-left-line"></i> Back to main menu
        </Link>
      )}
      <div className="sidebar--menu mt-3">
        <ul className="level-0">
          {pages.map((page) => {
            return (
              <li>
                <div className="heading">{page.section}</div>
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
