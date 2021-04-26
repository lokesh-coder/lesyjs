import React, { useEffect, useState } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

import DocSidebar from "../components/doc/sidebar";
import DocTOC from "../components/doc/toc";
import DocFooterNav from "../components/doc/footer-nav";
import SEO from "../components/common/seo";
import LinkButton from "../components/common/link-button";

const Sidebar = ({ sidebarItems, activePageSection }) => {
  const [isVisible, setVisibility] = useState(false);
  const toggleVisibility = () => setVisibility(!isVisible);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 z-50 w-3/4 h-screen lg:w-2/5 xl:w-1/5 lg:min-h-screen lg:sticky lg:top-0",
          { "hidden lg:block": !isVisible }
        )}
      >
        <div className="absolute inset-x-0 z-50 hidden h-10 pointer-events-none lg:block bg-gradient-to-b from-white dark:from-gray-800"></div>
        <div
          className="fixed z-10 w-full h-full bg-gray-100 opacity-60 lg:hidden"
          onClick={toggleVisibility}
        ></div>
        <div className="relative z-20 h-full pb-10 mt-0 overflow-scroll bg-white shadow-2xl lg:border-r lg:border-gray-200 lg:block lg:m-0 dark:bg-gray-800 dark:border-gray-600 lg:bg-transparent lg:shadow-none">
          <DocSidebar
            items={sidebarItems}
            activePageSection={activePageSection}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-50 hidden h-16 pointer-events-none lg:block bg-gradient-to-t from-white dark:from-gray-800"></div>
      </div>
      <button
        className={clsx(
          "fixed bottom-0 right-0 z-50 flex items-center justify-center w-16 h-16 p-5 m-5 bg-gray-700 rounded-full opacity-50 focus:outline-none lg:hidden hover:opacity-100 dark:bg-gray-900",
          { "!opacity-100": isVisible }
        )}
        onClick={toggleVisibility}
      >
        <i
          className={clsx(" text-2xl text-gray-300 ", {
            "ri-menu-5-line": !isVisible,
            "ri-close-fill": isVisible,
          })}
        ></i>
      </button>
    </>
  );
};

const DocLayout = ({
  sidebarItems,
  tocItems,
  data,
  nav,
  activePageSection,
  releases,
  parent,
}) => {
  const { title, summary, content, icon } = data;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        id="lesy-doc-main"
        className="flex flex-1 text-gray-600 page-content dark:bg-gray-700 dark:text-gray-300"
      >
        <SEO title={`${title} | ${parent}`} />

        <Sidebar
          sidebarItems={sidebarItems}
          activePageSection={activePageSection}
        />

        <div className="flex-1 w-full px-6 lg:w-3/5 lg:px-24 xl:px-48">
          <div className="my-10 doc-header">
            <div className="flex items-center">
              <i className={`ri-${icon} mr-2 text-primary text-2xl`} />
              <h1 className="text-5xl font-bold tracking-tighter text-gray-900 dark:text-gray-300">
                {title}
              </h1>
            </div>
          </div>

          <div className="doc-content">
            <MDXProvider components={{ LinkButton }}>
              <MDXRenderer releases={releases}>{content}</MDXRenderer>
            </MDXProvider>
          </div>

          <div>
            <DocFooterNav {...nav} />
          </div>
        </div>
        <div className="sticky z-10 hidden px-5 pb-6 mt-10 overflow-scroll lg:w-96 xl:w-72 lg:block lg:max-h-screen top-5">
          <DocTOC items={tocItems} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocLayout;
