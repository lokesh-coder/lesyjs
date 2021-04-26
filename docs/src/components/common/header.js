import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import logouri from "@lesy/brand/logo-outline-animated.svg";
import Search from "./search";
import clsx from "clsx";
import ThemeSwitch from "./theme-switch";

const Header = () => {
  const headerLinks = [
    {
      name: "Home",
      link: "/",
      mobileOnly: true,
    },
    {
      name: "Docs",
      link: "/docs/",
    },
    {
      name: "Tutorial",
      link: "/tutorial/",
    },
    {
      name: "Plugins",
      link: "/plugins",
    },
    {
      name: "Libraries",
      link: "/libraries",
    },
    {
      name: "Community",
      link: "/community",
    },
  ];

  const HeaderNav = () => {
    const [isMenuOpen, changeMenuVisibility] = useState(false);
    const toggleMenu = () => changeMenuVisibility(!isMenuOpen);
    return (
      <>
        <div
          className={clsx(
            "fixed top-0 left-0 w-full h-full bg-gray-500 opacity-50 md:hidden overflow-hidden",
            { hidden: !isMenuOpen }
          )}
          onClick={toggleMenu}
        ></div>
        <nav className="relative z-50 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="relative flex md:mx-auto md:max-w-7xl">
            <div className="flex items-center">
              <button
                className="p-4 text-gray-500 md:hidden focus:outline-none"
                onClick={toggleMenu}
              >
                <i
                  className={clsx("text-2xl", {
                    "ri-menu-fill": !isMenuOpen,
                    "ri-close-fill": isMenuOpen,
                  })}
                ></i>
              </button>
              <Link
                className="items-center hidden px-5 md:py-4 md:flex md:w-full md:justify-center"
                to="/"
              >
                <img
                  src={logouri}
                  alt="Lesy doc"
                  width="35"
                  className="mr-2"
                  alt="brand"
                />
                <h1 className="text-2xl font-bold leading-6 tracking-tighter text-gray-700 dark:text-gray-300">
                  lesy js
                </h1>
              </Link>
              <nav
                className={clsx(
                  "absolute bg-gray-50 top-20 w-full md:relative md:top-0 md:bg-transparent z-50 dark:!bg-gray-800 shadow-2xl md:shadow-none -mt-1 border-t border-gray-300 dark:border-gray-700",
                  {
                    "hidden md:block": !isMenuOpen,
                    block: isMenuOpen,
                  }
                )}
              >
                <ul className="flex flex-wrap text-center md:flex-nowrap">
                  {headerLinks.map(link => (
                    <li className="w-1/2 md:w-auto" key={link.name}>
                      <Link
                        to={link.link}
                        className={`block px-5 py-3 font-medium text-gray-500  md:px-3 md:py-5 hover:text-gray-900  text-tiny dark:text-gray-400 dark:hover:text-gray-300  ${
                          link.mobileOnly ? "md:hidden" : ""
                        }`}
                        activeClassName="!text-gray-700 dark:!text-gray-200 nav-link-active"
                        partiallyActive={!link.mobileOnly}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex items-center justify-center flex-1">
              <Link className="md:hidden" to="/">
                <img src={logouri} width="40" />
              </Link>
            </div>
            <div className="flex items-center">
              <Search cl="py-5 px-4 md:py-4 md:px-2 " />
              <ThemeSwitch>
                {(handler, Icon) => {
                  return (
                    <button
                      onClick={handler}
                      className="px-4 py-5 text-gray-500 md:py-4 md:px-2 focus:outline-none"
                    >
                      <Icon />
                    </button>
                  );
                }}
              </ThemeSwitch>
              <a
                href="https://github.com/lokesh-coder/lesyjs"
                className="px-4 py-5 md:py-4 md:px-2"
              >
                <i className="text-2xl text-gray-500 ri-github-fill"></i>
              </a>
              <a
                href="https://twitter.com/lesyjs"
                className="px-4 py-5 md:py-4 md:px-2"
              >
                <i className="text-2xl text-gray-500 ri-twitter-fill"></i>
              </a>
            </div>
          </div>
        </nav>
      </>
    );
  };
  return <HeaderNav />;
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
