import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../Configuration/axiosInstance";

const EditEmployees = ({ userData, onUserUpdated }) => {
  const {
    register, 
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { signUp, updateUser } = useAuth(); // `updateUser` is assumed to be a method in your auth context for updating user data.
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFirebaseError = (errorCode) => {
    if (errorCode.includes("auth/email-already-in-use")) {
      return "هذا البريد الإلكتروني مستخدم بالفعل.";
    } else if (errorCode.includes("auth/weak-password")) {
      return "كلمة المرور ضعيفة جدًا. يجب أن تحتوي على 6 أحرف على الأقل.";
    } else {
      return "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى.";
    }
  };

  // Load user data if provided (for editing).
  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
      });
    } else {
      reset(); // Clear the form for adding a new user.
    }
  }, [userData, setValue, reset]);

  const onSubmit = async (formData) => {
    const isUpdate = !!userData; // Determine if we are updating or adding.
    const confirmMessage = isUpdate
      ? "هل أنت متأكد من تحديث بيانات المستخدم؟"
      : "هل انت متأكد من إضافة هذا المستخدم؟";
  
    const userConfirmed = confirm(confirmMessage);
  
    if (userConfirmed) {
      try {
        await handleUserSubmission(formData, isUpdate);
        alert("تمت العملية بنجاح!"); // Optional success message
        // reload 

        window.location.reload();

      } catch (error) {
        console.error("حدث خطأ أثناء العملية:", error);
        alert("حدث خطأ أثناء العملية."); // Optional error message
      }
    } else {
      toast.error("تم إلغاء العملية");
    }
  };
  

  const handleUserSubmission = async (formData, isUpdate) => {
      const response  = await axiosInstance.put(`/user/update_user/${userData._id}`, formData);
      console.log("Response:", response);
      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
      onUserUpdated(response.data.data);

  };

  return (
    <div className="mx-auto mt-10 md:p-6 p-2 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">
        {userData ? "تحديث بيانات الموظف" : "إضافة موظف"}
      </h2>
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

        {/* Username Field */}
        {/* <div>
          <label className="block text-gray-700 font-medium mb-1">
            اسم المستخدم
          </label>
          <input
            type="text"
            {...register("username", { required: "اسم المستخدم مطلوب" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل اسم المستخدم"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div> */}

        {/* Phone Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            رقم الهاتف
          </label>
          <input
            type="text"
            {...register("phone", { required: "رقم الهاتف مطلوب" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل رقم الهاتف"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Password Field */}
        {!userData && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

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
            <option value="admin">مدير</option>
            <option value="editor">محرر</option>
            <option value="manager">مشاهد</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {loading
            ? "جارٍ الحفظ..."
            : userData
            ? "تحديث البيانات"
            : "حفظ البيانات"}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default EditEmployees;
