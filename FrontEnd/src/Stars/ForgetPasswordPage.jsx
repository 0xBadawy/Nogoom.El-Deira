import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../../src/assets/Images/Logo/Deira-logo2.png";
import LoginImage from "../../src/assets/Images/LoginStar.jpg";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Configuration/axiosInstance";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  const { resetPassword } = useAuth(); // Ensure your AuthContext has this method
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false); // State to toggle between form and success message

  const navigate = useNavigate();


  const Text = {
    title: "استعادة كلمة المرور",
    email: "البريد الالكتروني",
    reset: "إعادة تعيين كلمة المرور",
    backToLogin: "الرجوع لتسجيل الدخول",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/forgotpassword", data);
       toast.success("تم إرسال رابط إعادة تعيين كلمة المرور بنجاح!");
      navigate("/verify-code");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="grid grid-cols-1 mx-auto md:grid-cols-1"
      style={{ direction: "rtl" }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
          <img src={Logo} alt="logo" className="w-52 pb-20 mx-auto" />
          <h2 className="text-2xl font-bold text-center mb-6">{Text.title}</h2>

          {!isSent ? (
            <>
              {/* Display error message */}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">{" خطأ! "}</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    {Text.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    placeholder="email@example.com"
                    {...register("email", {
                      required: "البريد الإلكتروني مطلوب.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "يرجى إدخال بريد إلكتروني صالح.",
                      },
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600"
                >
                  {loading ? "جاري الإرسال..." : Text.reset}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-md shadow-md mt-4">
              <h3 className="font-bold text-lg mb-2">
                {"تم إرسال الرابط بنجاح!"}
              </h3>
              <p className="mb-2">
                {"تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني."}
              </p>
              <p className="mb-2">
                {
                  "إذا لم تجد البريد، يُرجى التحقق من قسم البريد العشوائي (Spam)."
                }
              </p>

              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="code"
                  >
                    {"رمز إعادة تعيين كلمة المرور"}
                  </label>
                  <input
                    type="text"
                    id="code"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    placeholder="رمز إعادة تعيين كلمة المرور"
                    {...register("code", {
                      required: "رمز إعادة تعيين كلمة المرور مطلوب.",
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.code?.message}
                  </p>
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600"
                  >
                    {loading ? "جاري التحقق..." : "تحقق"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="text-center mt-6">
            <Link to="/login" className="text-blue-500 hover:underline">
              {Text.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
