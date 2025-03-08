import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { confirmAlert } from "react-confirm-alert";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import axiosInstance from "../../Configuration/axiosInstance";

const AddEmployees = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { signUp } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const password = watch("password"); // لمراقبة قيمة كلمة المرور

  const handleFirebaseError = (errorCode) => {
    if (errorCode.includes("auth/email-already-in-use")) {
      return "هذا البريد الإلكتروني مستخدم بالفعل.";
    } else if (errorCode.includes("auth/weak-password")) {
      return "كلمة المرور ضعيفة جدًا. يجب أن تحتوي على 6 أحرف على الأقل.";
    } else {
      return "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى.";
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (formData) => {
    // return

    // if (!/^\d{10,11}$/.test(formData.phone)) {
    //   toast.error(
    //     "يجب أن يكون رقم الهاتف مكوناً من 10 أو 11 رقماً ويتكون من أرقام فقط"
    //   );
    //   return;
    // }

    if (!/^[a-zA-Z0-9]{3,15}$/.test(formData.username)) {
      toast.error(
        "يجب أن يكون اسم الموظف مكوناً من 3 إلى 15 حرفاً ويمكن أن يحتوي على حروف وأرقام فقط"
      );
      return;
    }

    if (formData.password !== formData["confirm-password"]) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    if (confirm("هل انت متأكد من إضافة هذا الموظف") == true) {
      try {
        await handleUserSubmission(formData);
        // toast.success("تم إضافة الموظف بنجاح!");
      } catch (error) {
        toast.error("حدث خطأ أثناء إضافة الموظف.");
      }
    } else {
      toast.error("تم إلغاء العملية");
    }
  };

  const handleUserSubmission = async (formData) => {
    setError(null);
    console.log("Form Data:", formData);

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/add_user", formData);
      console.log("Response:", response);
      if (response.data.status === "error") {
        toast.error(response.data.message);
        setError(response.data.message);
        return;
      }

      toast.success("تم إضافة الموظف بنجاح!");
    } catch (error) {
      console.log("Error:", error);
      if (error.response.data.message === "Email already exists") {
        toast.error("الموظف موجود بالفعل");
        setError("الموظف موجود بالفعل");
      } else {
        setError("حدث خطأ أثناء إضافة الموظف.");
        toast.error("حدث خطأ أثناء إضافة الموظف.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-10 md:p-6 p-2 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">إضافة موظف</h2>
      {error && (
        <p className="text-red-500 text-center mt-2 bg-red-100 p-2 rounded-lg font-semibold">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">الاسم</label>
          <input
            type="text"
            {...register("name", { required: "الاسم مطلوب" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل الاسم"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            {...register("email", {
              required: "البريد الإلكتروني مطلوب",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "أدخل بريد إلكتروني صالح",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل البريد الإلكتروني"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        {/* اسم الموظف */}
        {/* 
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            اسم الموظف
          </label>
          <input
            type="text"
            {...register("username", { required: "اسم الموظف مطلوب" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل اسم الموظف"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div> */}

        {/* الهاتف */}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {" "}
            رقم الهاتف
          </label>
          <input
            type="number"
            {...register("phone", { required: "رقم الهاتف مطلوب" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل رقم الهاتف"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* حقل كلمة المرور */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "كلمة المرور مطلوبة",
                minLength: {
                  value: 8,
                  message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل كلمة المرور"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute left-2 top-2 text-gray-500"
            >
              {showPassword ? "إخفاء" : "إظهار"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* confirm password */}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirm-password", {
                required: "كلمة المرور مطلوبة",
                minLength: {
                  value: 8,
                  message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل كلمة المرور"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute left-2 top-2 text-gray-500"
            >
              {showPassword ? "إخفاء" : "إظهار"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            الصلاحيات
          </label>
          <select
            {...register("role", { required: "الصلاحيات مطلوبة" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر الصلاحيات</option>
            <option value="admin">
              <span>مدير</span> (كل الصلاحيات)
            </option>
            <option value="editor">
              <span>محرر</span>
              (كل الصلاحيات عدا الموظفين والمحفظة)
            </option>
            <option value="viewer">
              {" "}
              <span>مشاهد</span> (الدخول والمتابعة فقط)
            </option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}

        <div className="flex flex-row">
          <button
            type="submit"
            disabled={loading}
            className="w-fit px-20 mx-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ البيانات"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddEmployees;
