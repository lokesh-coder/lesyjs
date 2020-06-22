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

const features = [
  "Sub commands",
  "Plugin support",
  "Auto help",
  "Typescript",
  "Middleware architecture",
  "Better testing",
  "Easy and Faster",
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
          <div className="px-4 lg:px-12 lg:px-24">
            <div className="lg:absolute top-0 flex justify-center">
              <img
                src="/images/lesy-head.png"
                className="w-8 py-5"
                alt="lesy icon"
              />
            </div>
            <span className="text-sm text-orange-700 font-500">
              Little cute Node module
            </span>
            <h1 className="text-heading text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-none">
              CLI Framework
            </h1>
            <p className="mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              suscipit distinctio saepe pariatur nisi, dolorum culpa maiores.
              Amet, optio! Cum corrupti a itaque eos aspernatur aperiam fugiat
              fugit perspiciatis dolorum.
            </p>
            <section className="text-sm text-subtext mb-8">
              {features.map((f) => (
                <span key={f}>{f} &middot;</span>
              ))}
            </section>
            <div className="text-center lg:text-left">
              <Link
                className="bg-teal-500 text-white py-3 px-6 rounded-full font-medium inline-flex text-sm items-center mr-3 hover:bg-teal-600"
                to="/docs/get-started/overview"
              >
                <i className="ri-book-mark-fill text-lg mr-2"></i> Documentation
              </Link>
              <Link
                className="bg-gray-100 text-gray-600 py-3 px-6 rounded-full font-medium inline-flex text-sm items-center hover:bg-gray-200"
                to="/"
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
              title="Install lesy CLI globally"
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
        <Preview />
      </div>

      <div>
        <Highlights />
      </div>
      <div className="bg-gray-200">
        <Features />
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
