import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-2">
      <div className="max-w-lg w-full p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex items-center justify-center mb-8">
          <AiOutlineWarning className="h-16 w-16 text-red-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          الوصول مرفوض
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          ليس لديك الصلاحية للوصول إلى هذه الصفحة. يرجى تسجيل الدخول للوصول
          إليها.
        </p>
        <div className="flex flex-col gap-3  justify-center ">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
          >
            الصفحة الرئيسية
          </button>
          <div className="flex flex-row gap-3  justify-center ">
            <button
              onClick={() => navigate("/login", { state: { from } })}
              className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              تسجيل الدخول
            </button>

            <button
              onClick={() => navigate("/signup", { state: { from } })}
              className="bg-blue-600 w-full  text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              انشاء حساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
