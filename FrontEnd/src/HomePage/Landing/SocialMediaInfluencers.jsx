import React, { useState, useEffect } from "react";
import { GoStarFill } from "react-icons/go";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";

const SocialMediaInfluencers = () => {
  const [location, setLocation] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { IsLogedIn } = useAuth();
  // Simulating location fetch
  useEffect(() => {
    setLocation("الحاجز");
  }, []);

  let selectedArea = localStorage.getItem("selectedArea") || "السعودية";

  if (selectedArea === "all" || selectedArea === null) {
    selectedArea = "السعودية";
  }

  useEffect(() => {
    const checkSignUpStatus = async () => {
      const status = await IsLogedIn();
      setIsSignedUp(status);
    };
    checkSignUpStatus();
  }, [IsLogedIn]);

  const handleSignUpClick = () => {
    const targetRoute = isSignedUp ? "/profile" : "/signup";
    window.location.href = targetRoute; // Fallback for web
  };



  
    const [data, setData] = useState();
    const { websiteData } = useData();
  
    useEffect(() => {
      setData(websiteData);
      console.log("websiteData cty ", websiteData);
    }, [websiteData]);
  
  return (
    <div
      className="bg-gradient-to-br from-purple-900 to-indigo-700 w-[95%] max-w-3xl py-10 px-8 mt-10 mx-auto rounded-3xl shadow-xl text-center relative"
      style={{ direction: "rtl" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-0 w-24 h-24 bg-yellow-300 opacity-30 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
        {data?.starAd1}
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-100 mb-6">{data?.starAd2}</p>
      <p className="text-lg text-gray-200 mb-8">
        انضم إلى <span className="font-bold">{`نجوم ${selectedArea}`}</span> وكن
        جزءًا من مجتمع المؤثرين الرائدين! 💫
      </p>

      {/* Sign-Up Button */}
      <button
        onClick={handleSignUpClick}
        className="bg-yellow-400 text-black py-3 px-8 rounded-full text-lg font-medium shadow-md hover:scale-105 transition-transform hover:bg-yellow-500"
      >
        {isSignedUp ? (
          "🎉 تم التسجيل! أهلاً بك في النجوم"
        ) : (
          <div className="flex items-center gap-2">
            {<GoStarFill color="#8a2ae3" size={20} />}
            سجل الآن
          </div>
        )}
      </button>

      {!isSignedUp && (
        <p className="text-sm font-bold text-gray-300 mt-6">{data?.starAd4}</p>
      )}
    </div>
  );
};

export default SocialMediaInfluencers;
