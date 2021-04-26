import React, { useEffect } from "react";
import Prism from "prismjs";

import GeneralLayout from "../layouts/general.layout";
import Example from "../components/home/example";
import { Link } from "gatsby";
import Ft from "../components/home/features";
import OtherFeatures from "../components/home/others-features";
// import MiddlewareFeature from "../components/home/features/middlewares";

const features = [
  "Sub commands",
  "Plugin support",
  "Auto help",
  "Web interface",
  "Typescript",
  "Middleware architecture",
  "Better testing",
  "Configurable",
  "Lightweight",
  "Even more",
];

const IndexPage = props => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <GeneralLayout title="Lesy JS | CLI Framework">
      <section className="container lg:my-24">
        <div className="lg:flex">
          <div className="flex items-center w-full py-12 lg:w-8/12 lg:py-0">
            <div className="px-4 lg:pr-48">
              <h1 className="text-4xl font-extrabold leading-none tracking-tighter text-gray-700 text-heading lg:text-6xl dark:text-gray-300">
                Build modern command line apps with{" "}
                <span className="text-primary">Lesy js</span>
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Lesy is a super flexible and lightweight CLI framework to build
                damn good command line apps without too much boilerplate.
              </p>
              <section className="mb-8 text-sm text-gray-400 dark:text-gray-500">
                {features.map(f => (
                  <span key={f}>{f} &middot; </span>
                ))}
              </section>
              <div>
                <Link
                  className="inline-flex items-center px-4 py-2 mr-3 font-medium text-white rounded-md bg-secondary text-md hover:bg-primary"
                  to="/docs/getting-started/introduction"
                >
                  Get started{" "}
                  <i className="ml-2 text-lg ri-arrow-right-line"></i>
                </Link>
                <Link
                  className="inline-flex items-center px-4 py-2 font-medium text-gray-600 border border-gray-300 rounded-md text-md hover:bg-gray-200 dark:border-gray-500 dark:text-gray-400 dark:hover:text-gray-600 dark:hover:border-transparent"
                  to="https://github.com/lokesh-coder/lesyjs"
                >
                  Github repo
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full px-4 lg:w-4/12">
            <div className="w-full">
              <Example
                icon="terminal-window-line"
                step="1"
                title="Generate a new project"
                lang="shell"
                role="~/terminal"
              />
              <Example
                icon="terminal-box-line"
                step="2"
                title="Write your first command"
                lang="js"
                role="editor"
                role="~/my-cli/src/hello.js"
              />
              <Example
                icon="fire-line"
                step="3"
                title="Execute the command"
                role="~/my-cli"
                lang="shell"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container">
        <Reel />
      </section> */}

      <section className="mb-20">
        <Ft.Command />
        <Ft.Middlware />
        <Ft.Plugin />
        <Ft.Pilot />
        <Ft.Artist />
        <Ft.Testing />
        <Ft.Perf />
      </section>

      <section>
        <OtherFeatures className="mb-20" />
      </section>
    </GeneralLayout>
  );
};

export default IndexPage;
