import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsApple } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import handleFirebaseError from "../Validations/Errors";
import Logo from "../../src/assets/Images/Logo/Deira-logo2.png";
import LoginImage from "../../src/assets/Images/LoginStar.jpg";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {login,logOut} =useAuth();
  const redirectPath = location.state?.path || "/";

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const Text = {
    title: "تسجيل الدخول",
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
    // console.log(data);
    login(data.email,data.password)
    .then(()=>{
      navigate(redirectPath);
    })
   
  };

  return (
    <div
      className="grid grid-cols-1 mx-auto  md:grid-cols-2"
      style={{ direction: "rtl" }}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shado w-md">
          <img src={Logo} alt="logo" className="w-52 pb-20  mx-auto " />
          <h2 className="text-2xl font-bold text-center mb-6">{Text.title}</h2>

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
                type="text"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="email@example.com"
                {...register("email")}
              />
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                {Text.password}
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="********"
                {...register("password")}
              />
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            </div>
            {/* <button type="submit">Login</button> */}

            <button
              // disabled={loading}
              type="submit"
              // onClick={confirm}
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600"
            >
              {Text.login}
            </button>
          </form>

          {/* Login using social media */}
          <div className="grid gap-3 mt-10">
            {/* <GoogleButton onClick={HandelsignInWithGoogle} /> */}
            <button className="bg-white hidden shadow-sm w-full border-gray-800 font-semibold h-10 hover:bg-gray-100 text-gray-800 border-[1px] rounded-xl">
              <div className="flex flex-row-reverse mx-auto items-center justify-center gap-3">
                <FcGoogle size={27} />
                <span>Log in with Google</span>
              </div>
            </button>
            {/*Create acount */}
            <div className="text-center">
              <span>ليس لديك حساب؟</span>
              <Link to="/signup" className="text-blue-500 hover:underline">
                {" تسجيل جديد "}
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
      <div className="w-full h-screen hidden md:block ">
        <img
          className="w-full max-h-screen object-cover"
          src={LoginImage}
          alt="login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
