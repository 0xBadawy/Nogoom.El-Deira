import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const NavLinks = ({ links, isMobile = false, isScrolled }) => {
  const location = useLocation();

  return (
    <div
      style={{ direction: "ltr" }}
      className={`${
        isMobile
          ? "flex flex-col space-y-4"
          : "flex flex-row-reverse justify-center space-x-1 md:space-x-2"
      }`}
    >
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`
            ${
              isScrolled
                ? "md:text-gray-800 md:after:bg-primary "
                : "md:text-white md:after:bg-white"
            }
            font-bold text-primary hover:text-primaryHover 
            px-4 py-2 rounded-lg transition-all duration-300
            relative after:content-[''] after:absolute after:bottom-0 
            after:left-0 after:w-full after:h-0.5 
            after:scale-x-0 hover:after:scale-x-100 after:transition-transform
            after:duration-300 ${
              location.pathname === path ? "after:scale-x-100" : ""
            }
            ${isMobile ? "text-center text-lg" : ""}
          `}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

NavLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMobile: PropTypes.bool,
};
