import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivacyFooter = ({ lastUpdated }) => {
  return (
    <footer className="mt-12 text-center text-gray-600 border-t pt-6">
      <p className="text-sm">
        آخر تحديث: {lastUpdated} | هل لديك أسئلة؟{' '}
        <Link
          to="/contact"
          className="text-primary hover:text-primaryHover transition-colors duration-300"
        >
          تواصل معنا
        </Link>
      </p>
    </footer>
  );
};

PrivacyFooter.propTypes = {
  lastUpdated: PropTypes.string.isRequired
};

export default PrivacyFooter;