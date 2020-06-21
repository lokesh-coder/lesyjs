import React from "react";
import { Link } from "gatsby";
import clsx from "clsx";

const FooterNav = ({ prevPage, nextPage, jumpPage, allPages, index }) => {
  if (nextPage && nextPage.frontmatter.skip) {
    nextPage = allPages[index + 2].node;
  }

  if (prevPage && prevPage.frontmatter.skip) {
    prevPage = allPages[index - 2].node;
  }
  return (
    <div
      className={clsx("flex my-10 ", {
        "justify-start": prevPage,
        "justify-end": nextPage,
        "justify-between": nextPage && prevPage,
      })}
    >
      {prevPage && (
        <Link
          to={prevPage.frontmatter.path}
          className={clsx(
            "text-decoration-none flex items-center leading-normal",
          )}
        >
          <i class="ri-arrow-left-line text-primary mr-3"></i>
          <div className="inline-flex flex-col">
            <span className="text-xs">Previous</span>
            <span className="font-semibold">{prevPage.fields.title}</span>
          </div>
        </Link>
      )}

      {jumpPage && (
        <Link
          to={jumpPage.frontmatter.path}
          className={clsx(
            "text-decoration-none flex items-center leading-normal",
          )}
        >
          <div className="inline-flex flex-col text-center">
            <span className="text-xs">Jump to</span>
            <span className="font-semibold">{jumpPage.fields.title}</span>
          </div>
          <i class="ri-guide-line text-primary ml-3"></i>
        </Link>
      )}

      {nextPage && (
        <Link
          to={nextPage.frontmatter.path}
          className={clsx(
            "text-decoration-none flex items-center justify-end leading-normal",
          )}
        >
          <div className="inline-flex flex-col text-right">
            <span className="text-xs">Next</span>
            <span className="font-semibold">{nextPage.fields.title}</span>
          </div>
          <i class="ri-arrow-right-line text-primary ml-3"></i>
        </Link>
      )}
    </div>
  );
};

export default FooterNav;
