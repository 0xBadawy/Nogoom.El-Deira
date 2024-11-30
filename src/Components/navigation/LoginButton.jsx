import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginButton = ({ onLogin, isScrolled }) => {
  return (
    <Link
      to="/login"
      onClick={onLogin}
      className={`px-6 py-2 font-bold rounded-full
                transition-colors duration-300
                border-2 border-transparent flex items-center justify-center
                ${
                  isScrolled
                    ? "bg-primary text-white hover:bg-secondaryHover hover:border-primaryHover"
                    : "bg-white text-primary hover:bg-primaryHover hover:text-white hover:border-white"
                }`}
    >
      تسجيل الدخول
    </Link>
  );
};

LoginButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isScrolled: PropTypes.bool.isRequired,
};
