import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../Context/AuthContext";
import Logo from "../../src/assets/Images/Logo/Deira-logo2.png";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectPath = location.state?.path || "/";

  const [error, setError] = useState(null);
  const Text = {
    title: "تسجيل الدخول ادارة الموقع" ,
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/dashboard")
    } catch (error) {
      console.error("Error during login:", error);
      setError("فشل تسجيل الدخول. الرجاء المحاولة مرة أخرى.");

      // Handle specific Firebase error codes
      if (error.code === "auth/user-not-found") {
        toast.error("البريد الإلكتروني غير مسجل");
      } else if (error.code === "auth/wrong-password") {
        toast.error("كلمة المرور غير صحيحة");
      } else {
        toast.error("فشل تسجيل الدخول. الرجاء المحاولة مرة أخرى.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ direction: "rtl" }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img src={Logo} alt="logo" className="w-40 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-center mb-6">{Text.title}</h2>

        {/* Display error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <strong className="font-bold">خطأ!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {Text.email}
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="email@example.com"
              {...register("email")}
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              {Text.password}
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="********"
              {...register("password")}
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            {Text.login}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
        
          <div>
            <Link to="/forget-password" className="text-blue-500 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="text-center">
              <Link to="/" className="text-blue-500 hover:underline">
                {" تصفح الموقع كزائر بدون تسجيل الدخول"}
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;