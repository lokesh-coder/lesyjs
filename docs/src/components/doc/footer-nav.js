import React from "react";
import { Link } from "gatsby";
import clsx from "clsx";

const DocFooterNav = ({ prev, next, parent }) => {
  const hasPrev = prev?.slug;
  const hasNext = next?.slug;
  const root = parent.path;
  const prevRoot = prev?.parent.path;
  const nextRoot = next?.parent.path;
  const prevParentPage = root === prevRoot ? null : prevRoot;
  const nextParentPage = root === nextRoot ? null : nextRoot;
  return (
    <div
      className={clsx(
        "flex my-10 border-t border-gray-100 pt-10 dark:border-gray-600",
        {
          "justify-start": hasPrev,
          "justify-end": hasNext,
          "justify-between": hasNext && hasPrev,
        }
      )}
    >
      {hasPrev && (
        <Link
          to={`/${prev.slug}`}
          className={clsx(
            "text-decoration-none flex items-center leading-normal group"
          )}
        >
          <i className="ri-arrow-left-line text-primary mr-3"></i>
          <div className="inline-flex flex-col">
            <span className="text-xs text-gray-500 ">
              Previous
              {prevParentPage && (
                <span className="capitalize"> &middot; {prevParentPage} </span>
              )}
            </span>
            <span className="font-medium text-gray-700 group-hover:text-primary dark:text-gray-300">
              {prev.name}
            </span>
          </div>
        </Link>
      )}

      {hasNext && (
        <Link
          to={`/${next.slug}`}
          className={clsx(
            "text-decoration-none flex items-center justify-end leading-normal group"
          )}
        >
          <div className="inline-flex flex-col text-right">
            <span className="text-xs text-gray-500">
              {nextParentPage && (
                <span className="capitalize">{nextParentPage} &middot; </span>
              )}
              Next
            </span>
            <span className="font-medium text-gray-700 group-hover:text-primary dark:text-gray-300">
              {next.name}
            </span>
          </div>
          <i className="ri-arrow-right-line text-primary ml-3"></i>
        </Link>
      )}
    </div>
  );
};

export default DocFooterNav;
