import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavLinks = ({ links, isScrolled }) => {
  const location = useLocation();

  return (
    <div
      className={`flex flex-row justify-center space-x-1 md:space-x-2 ${
        isScrolled ? "scrolled-class" : ""
      }`}
    >
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`
            font-bold ${
              !isScrolled ? "text-white" : "text-primary"
            } hover:text-gray-300
            px-4 py-2 rounded-lg transition-all duration-300
            relative after:content-[''] after:absolute after:bottom-0 
            after:left-0 after:w-full after:h-0.5 after:bg-white 
            after:scale-x-0 hover:after:scale-x-100 after:transition-transform
            after:duration-300 ${
              location.pathname === path ? "after:scale-x-100" : ""
            }
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
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  isScrolled: PropTypes.bool
};