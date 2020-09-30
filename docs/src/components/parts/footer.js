import React from "react";

const data = [
  {
    title: "Code",
    links: [
      { name: "Github", link: "https://github.com/lokesh-coder/lesyjs" },
      { name: "Node package", link: "https://www.npmjs.com/package/lesy" },
    ],
  },
  {
    title: "Repository",
    links: [
      { name: "Issues", link: "https://github.com/lokesh-coder/lesyjs/issues" },
      {
        name: "Plugins",
        link: "https://lesyjs.io/docs/library/official-plugins",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        name: "Releases",
        link: "https://github.com/lokesh-coder/lesyjs/releases",
      },
      {
        name: "License",
        link:
          "https://github.com/lokesh-coder/lesyjs/blob/master/packages/cli/LICENCE",
      },
    ],
  },
  {
    title: "Updates",
    links: [
      { name: "Twitter", link: "https://twitter.com/lesyjs" },
      { name: "Spectrum", link: "https://spectrum.chat/lesyjs" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="container mx-auto flex py-16 flex-col lg:flex-row px-10 lg:px-0">
      <div className="w-full lg:w-6/12 flex items-center lg:justify-start mb-10 lg:mb-0">
        <h3 className="text-gray-400 font-heading font-bold text-2xl flex justify-center">
          <div className="bg-gray-400 w-10 h-10 text-center rounded-full inline-flex justify-center items-center mr-3">
            <img src="/images/lesy-head.png" class="w-6" alt="lesy icon" />
          </div>
          <div>Lesy CLI Framework</div>
        </h3>
      </div>
      <div className="w-full lg:w-6/12 flex flex-wrap lg:flex-no-wrap">
        {data.map((d) => (
          <div className="w-6/12 lg:w-4/12">
            <h5 className="lowercase text-primary text-base lg:text-xl font-heading font-bold lg:mb-3 ">
              {d.title}
            </h5>
            {d.links.map((l) => (
              <a
                href={l.link}
                className="text-gray-500 block text-sm leading-6"
              >
                {l.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
