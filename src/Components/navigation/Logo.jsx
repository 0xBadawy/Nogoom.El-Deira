import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Logo = ({ primaryLogo, whiteLogo, isScrolled = false }) => {
  return (
    <Link
      to="/home"
      className="transition-transform duration-300 hover:scale-105"
    >
      <img
        src={isScrolled ? primaryLogo : whiteLogo}
        alt="Logo"
        className="w-44 transition-opacity duration-300"
      />
    </Link>
  );
};

Logo.propTypes = {
  primaryLogo: PropTypes.string.isRequired,
  whiteLogo: PropTypes.string.isRequired,
  isScrolled: PropTypes.bool
};