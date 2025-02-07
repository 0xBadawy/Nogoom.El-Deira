import React from 'react';
import PropTypes from 'prop-types';

const PrivacyHeader = ({ title, description }) => {
  return (
    <section className="mb-8 text-right">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
      <p className="leading-7 text-gray-700">{description}</p>
    </section>
  );
};

PrivacyHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default PrivacyHeader;