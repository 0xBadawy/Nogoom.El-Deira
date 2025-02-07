import React from 'react';
import PropTypes from 'prop-types';

const PrivacySection = ({ title, children }) => {
  return (
    <section className="mb-8 text-right">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </section>
  );
};

PrivacySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default PrivacySection;