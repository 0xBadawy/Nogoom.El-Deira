import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FaKey } from "react-icons/fa";
import Logo from "../../src/assets/Images/Logo/Deira-logo2.png";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Configuration/axiosInstance";
import { useNavigate } from "react-router-dom";



const ConfirmPasswordCode = () => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "/auth/verifypasswordresetcode",
        data
      );
      toast.success("تم التحقق بنجاح! يمكنك الآن إعادة تعيين كلمة المرور.");
      navigate("/new-password");
    } catch (error) {
      if (error.response?.data?.message === "Invalid reset code or expired") {
        setError("الرمز غير صحيح أو منتهي الصلاحية");
      } else {
        setError("حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img src={Logo} alt="logo" className="w-40 mx-auto pb-6" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          استعادة كلمة المرور
        </h2>

        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg shadow-md text-center">
          <h3 className="font-bold text-lg">تم إرسال الرابط بنجاح!</h3>
          <p className="text-sm">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. إذا لم
            تجده، تحقق من قسم البريد العشوائي (Spam).
          </p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="mt-6 space-y-4">
          <div className="relative">
            <label
              htmlFor="resetCode"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              رمز إعادة تعيين كلمة المرور
            </label>
            <div className="relative">
              <input
                type="text"
                id="resetCode"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                placeholder="أدخل الرمز"
                {...register("resetCode", {
                  required: "رمز إعادة تعيين كلمة المرور مطلوب.",
                })}
              />
              <FaKey className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.resetCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.resetCode.message}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-600 bg-red-100 border border-red-400 p-2 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-500 transition-all duration-300 disabled:bg-gray-400"
          >
            {loading ? "جاري التحقق..." : "تحقق"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-indigo-600 hover:underline text-sm font-semibold"
          >
            الرجوع لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordCode;
