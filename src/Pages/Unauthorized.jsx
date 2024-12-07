import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <AiOutlineWarning className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          الوصول مرفوض
        </h1>
        <p className="text-gray-600 text-center mb-6">
          ليس لديك الصلاحية للوصول إلى هذه الصفحة.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            الصفحة الرئيسية
          </button>
          <button
            onClick={() => navigate("/login", { state: { from } })}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
