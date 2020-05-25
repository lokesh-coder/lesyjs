import React from "react";

const data = [
  {
    title: "Code",
    links: [
      { name: "Github", link: "/" },
      { name: "NPM", link: "/" },
    ],
  },
  {
    title: "Repository",
    links: [
      { name: "Issues", link: "/" },
      { name: "plugins", link: "/" },
    ],
  },
  {
    title: "Project",
    links: [
      { name: "Changelog", link: "/" },
      { name: "License", link: "/" },
    ],
  },
  {
    title: "Updates",
    links: [
      { name: "Twitter", link: "/" },
      { name: "Spectrum", link: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="container mx-auto flex py-16 flex-col lg:flex-row px-10 lg:px-0">
      <div className="w-full lg:w-6/12 flex items-center lg:justify-start mb-10 lg:mb-0">
        <h3 className="text-gray-400 font-heading font-bold text-2xl">
          Lesy CLI Framework
        </h3>
      </div>
      <div className="w-full lg:w-6/12 flex">
        {data.map(d => (
          <div className="w-4/12 lg:text-right">
            <h5 className="uppercase text-gray-600 text-sm font-medium">
              {d.title}
            </h5>
            {d.links.map(l => (
              <a href={l.link} className="text-gray-500 block">
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
