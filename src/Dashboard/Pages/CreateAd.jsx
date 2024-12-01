import React from "react";
import { useForm } from "react-hook-form";

const CreateAd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Ad Data:", data);
    // هنا يمكن إرسال البيانات إلى الخادم باستخدام fetch أو axios
  };

  return (
    <div className="p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-white">إضافة إعلان جديد</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-800 dark:text-white mb-2"
            htmlFor="title"
          >
            عنوان الإعلان
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "عنوان الإعلان مطلوب" })}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-800 dark:text-white mb-2"
            htmlFor="description"
          >
            وصف الإعلان
          </label>
          <textarea
            id="description"
            {...register("description", { required: "الوصف مطلوب" })}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-800 dark:text-white mb-2"
            htmlFor="price"
          >
            السعر (بالجنيه)
          </label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "السعر مطلوب",
              min: { value: 1, message: "يجب أن يكون السعر أكبر من 0" },
            })}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-800 dark:text-white mb-2"
            htmlFor="category"
          >
            التصنيف
          </label>
          <select
            id="category"
            {...register("category", { required: "التصنيف مطلوب" })}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="">اختر تصنيفًا</option>
            <option value="apartment">شقة</option>
            <option value="villa">فيلا</option>
            <option value="office">مكتب</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          إضافة الإعلان
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
    