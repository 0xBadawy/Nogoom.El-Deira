import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginButton = ({ onLogin, isMobile = false, isScrolled }) => {
  useEffect(() => {
    console.log(isScrolled);
  }, [isScrolled]);
  return (
    <Link
      to="/login"
      onClick={onLogin}
      className={`
        ${
          isScrolled
            ? "text-white bg-primary"
            : "text-primary bg-white hover:bg-gray-200"
        }
        px-6 py-2   font-bold rounded-full
        transition-colors duration-300
        border-2 border-transparent 
        flex items-center justify-center
        ${isMobile ? "w-full" : ""}
      `}
    >
     تسجيل | تسجيل دخول
    </Link>
  );
};

LoginButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};
