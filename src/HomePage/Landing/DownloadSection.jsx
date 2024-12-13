import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Image from "../../assets/Image4.png";
import Image2 from "../../assets/Images/Image1.png";

const DownloadSection = () => {
  return (
    <div
      className="bg-gradient-to-r from-blue-50 to-green-50 relative w-[95%] py-14 mt-10 md:px-32 px-10 rounded-3xl shadow-xl mx-auto flex flex-col md:flex-row items-center gap-10 overflow-hidden"
      style={{ fontFamily: "Cairo" }}
    >
      {/* النصوص وروابط التحميل */}
      <div className="text-center md:text-right flex-1 z-10">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-6">
          حمل تطبيق الديرة للإعلانات
        </h2>
        <p className="text-2xl text-gray-600 mb-8">الديرة.. كل شيء بالديرة</p>
        <div
          className="flex justify-center flex-col md:flex-row md:justify-start gap-6"
          style={{ direction: "ltr" }}
        >
          <a
            href="#"
            className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-900 transition-transform transform hover:scale-110"
          >
            <FaApple className="text-3xl mr-3" />
            <span className="text-lg">تحميل من أبل ستور</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-700 transition-transform transform hover:scale-110"
          >
            <FaGooglePlay className="text-3xl mr-3" />
            <span className="text-lg">تحميل من غوغل بلاي</span>
          </a>
        </div>
      </div>

      {/* صورة التطبيق */}
      <div className="flex- 1 relative z-10">
        <img
          src={Image2}
          alt="تطبيق الديرة"
          className="max-w-96 rounded-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* عناصر تزيينية إضافية */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-200 rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute top-1/3 left-1/3 w-[120%] h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-green-300 transform -rotate-12 opacity-30"></div>
    </div>
  );
};

export default DownloadSection;
