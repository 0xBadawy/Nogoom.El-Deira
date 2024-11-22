import React, { useState, useEffect } from "react";

const SocialMediaInfluencers = () => {
  const [location, setLocation] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Simulating location fetch
  useEffect(() => {
    setLocation("الحاجز");
  }, []);

  const handleSignUpClick = () => {
    setIsSignedUp(true);
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-400 w-[95%] max-w-3xl py-10 px-8 mt-10 mx-auto rounded-3xl shadow-xl text-center relative" style={{direction:"rtl"}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-0 w-24 h-24 bg-yellow-300 opacity-30 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
        🎉 هل أنت مؤثر على السوشيال ميديا؟
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-100 mb-6">
        سجل الآن واحصل على <span className="font-semibold">٥٠ ريال</span> في
        محفظتك! 🌟
      </p>
      <p className="text-lg text-gray-200 mb-8">
        انضم إلى <span className="font-bold">{`نجوم ${location}`}</span> وكن
        جزءًا من مجتمع المؤثرين الرائدين! 💫
      </p>

      {/* Sign-Up Button */}
      <button
        onClick={handleSignUpClick}
        className="bg-yellow-400 text-black py-3 px-8 rounded-full text-lg font-medium shadow-md hover:scale-105 transition-transform hover:bg-yellow-500"
      >
        {isSignedUp ? "🎉 تم التسجيل! أهلاً بك في النجوم" : "⭐ سجل الآن"}
      </button>

      {/* Additional Info */}
      {!isSignedUp && (
        <p className="text-sm text-gray-300 mt-6">
          انضم إلى منصة مليئة بالفرص وساهم في صنع الفرق!
        </p>
      )}

      {/* Confetti Effect on Success */}
      {isSignedUp && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce mx-1"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-150 mx-1"></div>
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300 mx-1"></div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaInfluencers;
