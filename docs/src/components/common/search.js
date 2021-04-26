import React from "react";
import { createPortal } from "react-dom";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";

import { Link } from "gatsby";

function Hit({ hit, children }) {
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  );
}

const Search = ({ cl = "" }) => {
  const searchButtonRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState("/");

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = React.useCallback(
    event => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <div>
      <button
        type="button"
        className="items-center flex-1 hidden px-2 py-2 mr-2 text-sm font-medium text-gray-400 border border-gray-200 rounded-lg sm:flex group hover:text-gray-600 dark:bg-gray-800 focus:outline-none hover:border-gray-300 dark:border-gray-700"
        ref={searchButtonRef}
        onClick={onOpen}
      >
        <span className="px-4 py-5 text-gray-500 md:py-4 md:px-2 sm:hidden ">
          <i className="text-2xl ri-search-line"></i>
        </span>
        <i className="mr-2 text-lg leading-4 ri-search-line"></i>
        <span className="flex-1 mr-2 text-left">Search docs</span>
        <span className="hidden sm:block text-gray-400 text-sm leading-4 px-1.5 border border-gray-300 rounded-md dark:border-gray-700">
          <span className="sr-only">Press </span>
          <kbd className="text-xs ">
            <abbr title="Command" className="no-underline">
              ⌘
            </abbr>
          </kbd>
          <span className="sr-only"> and </span>
          <kbd className="text-xs">K</kbd>
          <span className="sr-only"> to search</span>
        </span>
      </button>
      <button
        className="px-4 py-5 text-gray-500 md:py-4 md:px-2 sm:hidden "
        ref={searchButtonRef}
        onClick={onOpen}
      >
        <i className="text-2xl ri-search-line"></i>
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            appId="LD8DXL07NU"
            apiKey="4b5f97f3b0ca5d92b1db2b0dc4958d44"
            indexName="lesy2"
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            hitComponent={Hit}
            transformItems={items => {
              return items.map(item => {
                const a = document.createElement("a");
                a.href = item.url;

                const hash = a.hash === "#content-wrapper" ? "" : a.hash;

                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                };
              });
            }}
          />,
          document.body
        )}
    </div>
  );
};

export default Search;
