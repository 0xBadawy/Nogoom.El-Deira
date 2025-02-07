import React from 'react';
import PropTypes from 'prop-types';

const SocialLinks = ({ links }) => {
  return (
    <div className="absolute top-[33%] left-5 lg:left-10 rounded-l-3xl flex flex-col gap-2 z-10" style={{direction:"ltr"}}> 
      {links.map((link) => (
        <a
          key={link.id}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-white/90 backdrop-blur-sm 
                     rounded-full mx-1 hover:w-fit hover:px-4 ${link.color} 
                     transition-all ease-in-out duration-500 hover:shadow-lg`}
        >
          {link.icon}
          <p className="hidden group-hover:inline-block ml-2 text-sm font-bold text-gray-700 
                      transition-all ease-in-out duration-500 whitespace-nowrap">
            {link.name}
          </p>
        </a>
      ))}
    </div>
  );
};

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      eName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SocialLinks;