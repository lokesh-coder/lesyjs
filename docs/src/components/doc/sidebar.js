import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import clsx from "clsx";

const groupBySections = items => {
  const sectionNames = [];
  const sections = [];
  items.forEach(({ section, name, slug }) => {
    if (!sectionNames.includes(section.name)) {
      sectionNames.push(section.name);
      sections.push({
        links: [{ name, slug }],
        section,
      });
    } else {
      const secLinks = sections[sectionNames.length - 1].links;
      secLinks.push({ name, slug });
      sections[sectionNames.length - 1] = {
        links: secLinks,
        section,
      };
    }
  });
  return sections;
};

const Section = ({ name, icon, links, isActive }) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <li>
      <h5
        layout
        className="flex text-gray-900 cursor-pointer select-none dark:text-gray-300"
        onClick={toggleOpen}
      >
        <i className={`${icon} mr-3 text-lg text-primary`} />
        <div className="flex-1">{name}</div>
        <i
          className={clsx(
            "ri-arrow-right-s-line text-lg text-gray-400 transition-all transform origin-center",
            { "rotate-90 text-gray-900 dark:text-primary": isOpen }
          )}
        ></i>
      </h5>
      <div className="mb-5">
        {isOpen && (
          <div
            className={clsx(`mt-3 ml-9 overflow-hidden transition-all`)}
            initial={{
              height: 500,
            }}
            exit={{ height: 0 }}
          >
            {links.map(({ slug, name }) => {
              return (
                <Link
                  to={`/${slug}`}
                  className="flex items-center leading-9 text-gray-500 hover:text-gray-800 group dark:text-gray-400 dark:hover:text-gray-300"
                  activeClassName="active !text-primary dark:text-primary"
                  partiallyActive={true}
                >
                  <span className="flex-1 ">{name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
};

const DocSidebar = ({ items, activePageSection }) => {
  const sections = groupBySections(items);
  return (
    <ul className="px-8 pt-8 font-medium text-tiny">
      {sections.map(({ section, links }) => {
        return (
          <Section
            name={section.name}
            icon={section.data.icon}
            links={links}
            isActive={activePageSection.name === section.name}
            key={section.name}
          />
        );
      })}
    </ul>
  );
};

DocSidebar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default DocSidebar;
