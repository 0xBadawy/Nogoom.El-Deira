import React from 'react';
import LogoImage from "../assets/Images/Logo/Deira-logo2.png"; // Replace with your logo path

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 z-50">
      <div className="flex flex-col items-center space-y-6 animate-fade-in">
        {/* Logo with subtle glow */}
       <div   className="w-32 h-32 mb-4 animate-bounce-slow shadow-lg rounded-full p-1 bg-white">

       <img
          src={LogoImage}
          alt="Logo"
          className="w-20 h-20 mt-5 mx-auto "
        />

       </div>
        {/* Enhanced Loading Spinner */}
        <div className="relative">
          <div className="w-14 h-14 border-4 border-blue-500 border-opacity-30 rounded-full animate-spin-slow"></div>
          <div className="absolute top-0 left-0 w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-fast"></div>
        </div>

        {/* Loading Text with animation */}
        <p className="mt-4 text-lg text-blue-600 font-semibold animate-pulse">
          يتم تحميل التطبيق...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
