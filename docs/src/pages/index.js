import React, { useEffect } from "react";
import { Link, graphql } from "gatsby";

import SEO from "../components/seo";
import Prism from "prismjs";

import "../styles/main.scss";
import "../styles/tailwind.css";

import Example from "../components/visuals/example";
import ParticlesBg from "../components/visuals/particles-bg";
import Preview from "../components/parts/preview";
import Highlights from "../components/parts/highlights";
import Features from "../components/parts/features";
import Stats from "../components/parts/stats";
import Footer from "../components/parts/footer";
import NewsletterSection from "../components/parts/newsletter";
import SectionHeadlines from "../components/visuals/section-headlines";

const features = [
  "Sub commands",
  "Plugin support",
  "Auto help",
  "Typescript",
  "Middleware architecture",
  "Better testing",
  "Configurable",
  "Lightweight",
  "Even more",
];

const IndexPage = ({ data }) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <div className="text-body">
      <SEO title="Home" />
      <ParticlesBg />
      <div className="container lg:flex mx-auto min-h-screen relative z-10">
        <div className="w-full lg:w-8/12 flex items-center py-12 lg:py-0">
          <div className="px-4 lg:px-24 text-center">
            <div className="lg:absolute top-0 flex justify-center">
              <img
                src="/images/lesy-head.png"
                className="w-8 py-5"
                alt="lesy icon"
              />
            </div>

            <h1 className="text-center text-heading text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-none">
              Build modern command line apps with{" "}
              <span className="text-primary">Lesy js</span>
            </h1>
            <p className="mb-8 text-center lg:px-10">
              Lesy is a super flexible and lightweight CLI framework to build
              damn good command line apps without too much boilerplate.
            </p>
            <section className="text-sm text-subtext mb-8 lg:px-10">
              {features.map((f) => (
                <span key={f}>{f} &middot; </span>
              ))}
            </section>
            <div className="text-center">
              <Link
                className="bg-secondary text-white py-2 px-4 rounded-md font-medium inline-flex text-sm items-center mr-3 hover:bg-secondary"
                to="/docs/get-started/overview"
              >
                <i className="ri-book-mark-fill text-lg mr-2"></i> Documentation
              </Link>
              <Link
                className="bg-gray-200 text-gray-600 py-2 px-4 rounded-md font-medium inline-flex text-sm items-center hover:bg-gray-300"
                to="https://github.com/lokesh-coder/lesyjs"
              >
                <i className="ri-github-fill mr-2 text-lg"></i> Repository
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 flex items-center justify-center">
          <div>
            <Example
              icon="terminal-window-line"
              step="1"
              title="Generate a new project"
              lang="shell"
            />
            <Example
              icon="terminal-box-line"
              step="2"
              title="Write your first command"
              lang="js"
              role="editor"
            />
            <Example icon="fire-line" step="3" title="Execute the command" />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 overflow-hidden">
        <SectionHeadlines
          title="Run commands from _Pilot_ UI"
          subtitle="Pilot is a plugin for lesy, which lets you to view and run commands from any lesy projects. It is a fully functional dashboard with console viewer, prompt modal and runner"
        />
        <Preview />
      </div>

      <div>
        <Highlights />
      </div>
      <div>
        <SectionHeadlines
          title="Easy, Classy, Bossy, _Lesy_"
          subtitle="Whether you are building a tiny teeny app or complex one, process shouldn't be hard."
        />
        <Features />
      </div>
      <div className="bg-gray-200">
        <NewsletterSection />
      </div>
      <div className="bg-dark-200">
        <Stats />
      </div>
      <div className="bg-dark-100">
        <Footer />
      </div>
    </div>
  );
};

export const query = graphql`
  query HomePageQuery {
    githubData {
      github: data {
        repository {
          releases {
            edges {
              node {
                descriptionHTML
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
