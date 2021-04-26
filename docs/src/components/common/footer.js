import React from "react";
import { Link } from "gatsby";

const Footer = () => {
  const socialLinks = [
    {
      icon: "discord-line",
      link:
        "https://discord.com/channels/720063177156591646/720063177156591649",
    },
    {
      icon: "npmjs-line",
      link: "https://www.npmjs.com/package/lesy",
    },
    {
      icon: "github-fill",
      link: "https://github.com/lesyjs",
    },
    {
      icon: "stack-overflow-line",
      link: "https://stackoverflow.com/questions/tagged/lesyjs",
    },
    {
      icon: "twitter-line",
      link: "https://twitter.com/lesyjs",
    },
    {
      icon: "facebook-circle-line",
      link: "https://www.facebook.com/lesyjs",
    },
    {
      icon: "reddit-line",
      link: "https://www.reddit.com/r/lesyjs/",
    },
  ];
  const sections = [
    {
      title: "learn",
      icon: "book-2-line",
      links: [
        {
          name: "documentation",
          link: "/docs/getting-started/introduction",
        },
        {
          name: "installation",
          link: "/docs/getting-started/installation",
        },
      ],
    },
    {
      title: "get started",
      icon: "fire-line",
      links: [
        {
          name: "quick start tutorial",
          link: "/tutorial/todo-app/overview",
        },
        {
          name: "lesy CLI",
          link: "/docs/resources/lesy-cli",
        },
        {
          name: "Playground",
          link:
            "https://codesandbox.io/s/lesy-pilot-playground-hzjgw?fontsize=14&hidenavigation=1&view=preview",
        },
      ],
    },
    {
      title: "Development",
      icon: "braces-line",
      links: [
        {
          name: "respository",
          link: "https://github.com/lokesh-coder/lesyjs",
        },
        {
          name: "issues and discussion",
          link: "https://github.com/lokesh-coder/lesyjs/discussions",
        },
        {
          name: "developer guide",
          link: "/docs/development/project-overview",
        },
      ],
    },
    {
      title: "Explore",
      icon: "stack-line",
      links: [
        {
          name: "official plugins",
          link: "/plugins",
        },
        {
          name: "standalone libraries",
          link: "/libraries",
        },
        {
          name: "branding",
          link: "/branding",
        },
      ],
    },
  ];

  return (
    <footer className="py-10 border-t bg-light dark:bg-gray-700 dark:border-gray-600">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col justify-between order-2 my-5 text-center lg:order-none lg:w-4/12 lg:my-0 lg:text-left">
            <div className="flex items-center justify-center mb-5 lg:mb-6 opacity-80 lg:justify-start">
              <i className="text-4xl text-gray-600 dark:text-gray-400 lesy-icon-logo-line" />
              <div className="text-2xl font-bold tracking-tighter text-gray-600 dark:text-gray-400">
                lesy framework
              </div>
            </div>
            <div>
              <div>
                {socialLinks.map(s => {
                  return (
                    <a
                      href={s.link}
                      className="pr-3 text-xl text-gray-400 hover:text-primary"
                      key={s.link}
                    >
                      <i className={`ri-${s.icon}`} />
                    </a>
                  );
                })}
              </div>
              <div className="text-xs font-medium text-gray-400">
                Lesy © 2021 - Carefully handcrafted with{" "}
                <span className="text-primary">♥</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap order-1 lg:w-8/12 lg:flex-nowrap">
            {sections.map(section => {
              return (
                <div
                  className="w-2/4 mb-5 lg:w-1/4 lg:mb-0"
                  key={section.title}
                >
                  <div className="flex items-center mb-2 text-xs font-bold text-gray-800 uppercase dark:text-gray-300">
                    <i
                      className={`ri-${section.icon} mr-2 font-normal text-lg text-gray-500 dark:text-gray-400`}
                    ></i>
                    {section.title}
                  </div>
                  <div className="pl-6">
                    {section.links.map(({ name, link }) => {
                      return (
                        <Link
                          to={link}
                          className="block text-sm font-medium leading-6 text-gray-500 capitalize hover:text-gray-800 dark:hover:text-gray-300 dark:text-gray-400"
                          key={name}
                        >
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
