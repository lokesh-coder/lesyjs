import React from "react";
import { Link } from "gatsby";
const Card = ({ icon, title, linkName, link, children, classNames }) => {
  return (
    <div className={`flex lg:flex-col items-center ${classNames}`}>
      <img src={icon} width="50" className="mr-5 lg:mr-0" alt="card" />
      <div className="lg:text-center">
        <h3 className="text-lg font-bold font-heading text-heading my-4">
          {title}
        </h3>
        <p className="text-sm text-gray-500 lg:text-center">{children}</p>
        <Link
          to={link}
          className="text-blue-500 text-sm font-medium flex items-center lg:justify-center my-5 leading-none"
        >
          {linkName} <i class="ri-arrow-right-s-line"></i>
        </Link>
      </div>
    </div>
  );
};

export default Card;
