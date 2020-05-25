/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebar";
import { Link } from "gatsby";
import Brand from "./visuals/brand";

const Layout = ({ children, content, allContent }) => {
  const [isHidden, toggleSidebar] = useState(true);
  useEffect(() => {
    const method = isHidden ? "remove" : "add";
    document.body.classList[method]("overflow-hidden");
  }, [isHidden]);
  if (!content) return <></>;

  return (
    <div className="flex">
      <div
        className={` lg:block lg:w-3/12 z-10 mt-20 lg:m-0 ${
          isHidden ? "hidden" : "block "
        }`}
      >
        <Sidebar content={content} allContent={allContent} />
      </div>
      <div className="w-full lg:w-7/12 px-6 lg:px-40">
        <div className="lg:hidden">
          <Brand
            onSidebarToggle={() => {
              console.log("foo");
              toggleSidebar(!isHidden);
            }}
          />
        </div>
        <div className="my-6 pb-6 border-b border-gray-300 flex items-center">
          <i
            className={`ri-${content.frontmatter.icon} text-primary text-2xl mr-2`}
          />
          <h1 className="font-heading font-extrabold text-4xl text-blue-800">
            {content.frontmatter.title}
          </h1>
        </div>

        <main className="content light-syntax text-gray-700">{children}</main>
      </div>
      <div className="w-2/12 hidden lg:block">
        <ul class="mt-32 px-4">
          {content.toc.items && (
            <div className="uppercase font-bold text-xs text-gray-600 mb-5">
              On this page
            </div>
          )}
          {content.toc.items &&
            content.toc.items.map(c => {
              return (
                <Link
                  to={content.fields.slug + c.url}
                  className="text-gray-600 text-sm block leading-7"
                >
                  {c.title}
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.object.isRequired,
  allContent: PropTypes.object.isRequired,
};

export default Layout;
