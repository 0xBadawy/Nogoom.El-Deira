import React from 'react';
import PropTypes from 'prop-types';

const PrivacyList = ({ items }) => {
  return (
    <ul className="list-disc list-inside space-y-3 pr-4">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">{item}</li>
      ))}
    </ul>
  );
};

PrivacyList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrivacyList;