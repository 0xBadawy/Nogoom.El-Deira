import React from 'react';
import PropTypes from 'prop-types';

const ContactLinks = ({ contacts }) => {
  return (
    <div className="absolute top-[40%] right-5 lg:right-10 rounded-l-3xl flex flex-col gap-2 z-10">
      {contacts.map((contact) => (
        <a
          key={contact.id}
          href={`${contact.id === 1 ? 'tel:' : contact.id === 2 ? 'mailto:' : 'https://wa.me/'}${contact.value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-white/90 backdrop-blur-sm 
                   rounded-full mx-1 hover:w-fit hover:px-4 transition-all ease-in-out duration-500 hover:shadow-lg"
        >
          {contact.icon}
          <p className="hidden group-hover:inline-block ml-2 text-sm font-bold text-gray-700 
                     transition-all ease-in-out duration-500 whitespace-nowrap">
            {contact.value}
          </p>
        </a>
      ))}
    </div>
  );
};

ContactLinks.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default ContactLinks;