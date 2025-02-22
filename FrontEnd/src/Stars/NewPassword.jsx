import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FaKey, FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../../src/assets/Images/Logo/Deira-logo2.png";
import axiosInstance from "../Configuration/axiosInstance";
import { useNavigate } from "react-router-dom";
const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/resetpassword", data);
      toast.success("تم تغيير كلمة المرور بنجاح!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message === "Password reset code not verified")
        setError("لم يتم التحقق من رمز إعادة تعيين كلمة المرور.");
      else setError("حدث خطأ، يرجى المحاولة مرة أخرى.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img src={Logo} alt="logo" className="w-40 mx-auto pb-6" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          إعادة تعيين كلمة المرور
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 pr-10"
                placeholder="أدخل بريدك الإلكتروني"
                {...register("email", { required: "البريد الإلكتروني مطلوب." })}
              />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              كلمة المرور الجديدة
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 pr-10"
                placeholder="أدخل كلمة المرور الجديدة"
                {...register("password", {
                  required: "كلمة المرور مطلوبة.",
                  minLength: {
                    value: 8,
                    message: "يجب أن تكون كلمة المرور أطول من 8 أحرف.",
                  },
                  pattern: {
                    value: /.*[A-Za-z].*/,
                    message: "يجب أن تحتوي كلمة المرور على حرف واحد على الأقل.",
                  },
                })}
              />
              <FaLock className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 pr-10"
                placeholder="أعد إدخال كلمة المرور"
                {...register("confirmPassword", {
                  required: "يرجى تأكيد كلمة المرور.",
                  validate: (value) =>
                    value === watch("password") || "كلمة المرور غير متطابقة.",
                })}
              />
              <FaKey className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
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
            {loading ? "جاري التحقق..." : "إعادة تعيين كلمة المرور"}
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

export default NewPassword;
