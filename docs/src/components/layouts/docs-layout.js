import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import { Link } from "gatsby";
import Brand from "../visuals/brand";

const DocsLayout = ({ children, content, allContent }) => {
  const [isHidden, toggleSidebar] = useState(true);
  useEffect(() => {
    const method = isHidden ? "remove" : "add";
    document.body.classList[method]("overflow-hidden");
  }, [isHidden]);

  if (!content) return <></>;

  return (
    <div className="flex">
      <div
        className={` lg:block lg:w-1/5 z-10 mt-20 lg:m-0 ${
          isHidden ? "hidden" : "block "
        }`}
      >
        <Sidebar content={content} allContent={allContent} />
      </div>
      <div className="w-full lg:w-3/5 px-6 lg:px-48">
        <div className="lg:hidden">
          <Brand
            onSidebarToggle={() => {
              toggleSidebar(!isHidden);
            }}
          />
        </div>
        <div className="my-8 lg:my-16 flex items-center justify-between">
          <div className="flex items-center">
            <i
              className={`ri-${content.frontmatter.icon} text-primary text-2xl mr-2`}
            />
            <h1 className="font-heading font-extrabold text-4xl text-blue-800">
              {content.frontmatter.title}
            </h1>
          </div>
          <div>
            {content.frontmatter.repo && (
              <a
                href={content.frontmatter.repo}
                target="_blank"
                rel="noreferrer"
              >
                <i className={`ri-github-fill text-gray-500 text-2xl mr-2`} />
              </a>
            )}
            {content.frontmatter.npm && (
              <a
                href={content.frontmatter.npm}
                target="_blank"
                rel="noreferrer"
              >
                <i className={`ri-npmjs-line text-gray-500 text-2xl mr-2`} />
              </a>
            )}
          </div>
        </div>

        <main className="content light-syntax text-gray-700">{children}</main>
      </div>
      <div className="w-1/5 hidden lg:block">
        <ul class="mt-32 px-4">
          {content.toc.items && (
            <div className="uppercase font-bold text-xs text-gray-600 mb-5">
              On this page
            </div>
          )}
          {content.toc.items &&
            content.toc.items.map((c) => {
              return (
                <Link
                  to={content.frontmatter.path + c.url}
                  className="text-gray-600 text-sm block leading-7"
                >
                  {c.title}
                </Link>
              );
            })}
        </ul>
      </div>
      <div className="fixed bottom-0 my-2 w-full flex justify-center z-30 lg:hidden">
        <button
          className="mx-auto px-5 py-1 bg-gray-200 text-primary rounded-md focus:outline-none"
          onClick={() => {
            toggleSidebar(!isHidden);
          }}
        >
          <i
            class={`ri-${
              isHidden ? "menu-4-fill" : "close-circle-line"
            } text-xl`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default DocsLayout;
