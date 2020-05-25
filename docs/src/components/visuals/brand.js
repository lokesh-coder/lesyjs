import React from "react";
import { Link } from "gatsby";

const Brand = ({ onSidebarToggle = () => {} }) => {
  return (
    <div className="border-b px-0 lg:px-6 py-5 border-gray-300 flex items-center justify-between">
      <div className="flex">
        <img src="/svg/lesy-head.svg" width="30" className="mr-3" />
        <div className="leading-tight">
          <h1 className="text-blue-700 text-xl font-bold text-subheading font-heading">
            Lesy{" "}
            <span className="text-xs font-medium text-gray-600">v1.0.0</span>
          </h1>
          <h3 className="text-sm text-gray-500">CLI Framework</h3>
        </div>
      </div>
      <div className="flex">
        <span
          className="text-xl mr-3 text-gray-500 hover:text-primary lg:hidden"
          onClick={onSidebarToggle}
        >
          <i class="ri-menu-4-fill"></i>
        </span>
        <Link
          to="/"
          title="Home"
          className="text-xl mr-3 text-gray-500 hover:text-primary"
        >
          <i class="ri-home-4-line"></i>
        </Link>
        <a
          href="https://github.com"
          title="Github repo"
          className="text-xl text-gray-500 hover:text-primary"
        >
          <i class="ri-github-line"></i>
        </a>
      </div>
    </div>
  );
};

export default Brand;
