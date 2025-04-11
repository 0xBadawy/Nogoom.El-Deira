import React from 'react';
import LogoImage from "../assets/Images/Logo/Deira-logo2.png";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 z-50">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo container with elegant animation and shadow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-75 blur-md group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
          <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-xl animate-float">
            <img
              src={LogoImage}
              alt="Logo"
              className="w-28 h-28 object-contain transition-all duration-300"
            />
          </div>
        </div>
        
        {/* Improved Loading Spinner */}
        <div className="relative w-16 h-16">
          {/* Multiple spinner layers for depth effect */}
          <div className="absolute inset-0 w-full h-full border-4 border-blue-200 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 w-full h-full border-4 border-blue-300 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute inset-0 w-full h-full border-4 border-blue-400 border-t-transparent border-b-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 w-full h-full border-4 border-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>

        {/* Loading Text with typewriter effect */}
        <div className="text-center">
          <p className="text-xl text-blue-700 font-bold">
            يتم تحميل التطبيق...
          </p>
          <p className="mt-2 text-blue-500 text-sm font-medium">
            يرجى الانتظار قليلاً حتى يتم تحميل المحتوى
          </p>
        </div>
      </div>
    </div>
  );
};

// Add these custom animations to your global CSS or tailwind.config.js
const customAnimations = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-spin {
  animation: spin 2s linear infinite;
}
`;

export default PageLoader;