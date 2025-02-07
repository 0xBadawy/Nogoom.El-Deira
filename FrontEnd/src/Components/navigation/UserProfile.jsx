import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

export const UserProfile = ({ user, onLogout, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setIsOpen(false));

  if (!user.isAuthenticated) {
    return null;
  }

  
  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center h-10 p-1 bg-white rounded-full 
          border-black border-2 hover:border-primary transition-colors duration-300
          ${isMobile ? "w-full justify-center" : "w-full gap-2"}
        `}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <span className="font-bold text-gray-800">{user.name}</span>
        <IoIosArrowDown
          size={25}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`
          bg-white rounded-lg shadow-lg py-2 z-50
          border border-gray-200 transform origin-top scale-y-100 transition-transform
          ${isMobile ? "w-full mt-2" : "absolute right-0 mt-2 w-48"}
        `}
        >
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 
                     transition-colors duration-200"
          >
            تسجيل الخروج
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
             navigate("/profile");
            }}
            className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 
                     transition-colors duration-200"
          >
            الملف الشخصي
          </button>

        {
          user.role!=="star" && (
            <button
              onClick={() => {
                setIsOpen(false);
               navigate("/dashboard");
              }}
              className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 
                       transition-colors duration-200"
            >
              لوحة التحكم للمشرف
            </button>
          )
        }
          
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};
