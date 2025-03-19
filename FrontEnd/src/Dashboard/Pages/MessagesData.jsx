import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Configuration/firebase";
import axiosInstance from "../../Configuration/axiosInstance";
import RatingInput from "./RatingInput";

const MessagesData = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);

  const fetchMessage = async () => {
    try {
      const response = await axiosInstance.get("/messages");
      console.log(response.data.data);
      setMessage(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    console.log(data, mediaUrl);

    // Send the data to the backend

    const post = async () => {
      try {
        const response = await axiosInstance.post("/messages", data);
        console.log(response.data);
        toast.success("تم إضافة الراعي بنجاح");
        reset();
        setMediaUrl("");
        fetchMessage();
      } catch (error) {
        console.error(error);
        toast.error("حدث خطأ أثناء إضافة الراعي");
      }
    };
    post();
  };

  const handelDelete = async (id) => {
    const confirm = window.confirm("هل أنت متأكد من الحذف ");
    if (!confirm) return;
    try {
      const response = await axiosInstance.delete(`/messages/${id}`);
      console.log(response.data);
      toast.success("تم الحذف بنجاح");
      fetchMessage();
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-b lue-50 to-gray -100 pt-16 pb-12">
      <div className="max-w- 6xl mx-auto px-4">
        {/* Add Sponsor Card */}
        <div className="p-4 max-w-xl mx-auto bg-white rounded-3xl shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl border border-gray-100 mb-12">
          <div className="flex items-center justify-center mb-2"></div>
          <h1 className="text-3xl font-bold text-center text-gray-900 tracking-tight">
            إضافة تعليق جديد
          </h1>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                className="block w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-right"
                placeholder="أدخل الاسم هنا"
                {...register("name", { required: true })}
                dir="rtl"
              />
              {errors.name && (
                <span className="text-red-500 text-sm font-medium animate-pulse flex justify-end">
                  هذا الحقل مطلوب
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                التعليق
              </label>
              <textarea
                type="text"
                id="description"
                className="block w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-right"
                placeholder="أدخل التعليق هنا"
                {...register("description", { required: true })}
                dir="rtl"
              />
              {errors.description && (
                <span className="text-red-500 text-sm font-medium animate-pulse flex justify-end">
                  هذا الحقل مطلوب
                </span>
              )}
            </div>

            {/* <div className="space-y-2">
              <label
                htmlFor="rating"
                className="block text-sm font-semibold text-gray-700"
              >
                التقييم
              </label>
              <input
                type="number"
                min="0"
                max="5"
                id="rating"
                className="block w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-right"
                placeholder="أدخل التقييم هنا"
                {...register("rating", { required: true })}
                dir="rtl"
              />
              {errors.rating && (
                <span className="text-red-500 text-sm font-medium animate-pulse flex justify-end">
                  هذا الحقل مطلوب
                </span>
              )}
            </div> */}

            <RatingInput register={register} errors={errors} setValue={setValue} />

            <div className="space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded-lg p-4 font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    جارٍ تحميل التعليق...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    إضافة التعليق
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sponsors List Section */}
        <div className="mx-auto px-4 mb-12  ">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-px w-16 bg-b lue-200"></div>
            <h1 className="text-3xl font-bold text-center text-gray-900 tracking-tight">
              قائمة التعليقات
            </h1>
            <div className="h-px w-16 bg- blue-200"></div>
          </div>

          <div className="mt-6 flex flex-row flex-wrap justify-center gap-6">
            {message.map((sponser) => (
              <div
                key={sponser._id}
                className="flex items-center flex-col md:flex-row justify-between md:p-6 p-2 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 w-full md:w-96"
              >
                <div className="flex flex-col md:flex-row items-center space-x-5 rtl:space-x-reverse">
                  <div className="ml-4 space-y-1">
                    <h1 className="text-lg font-semibold text-gray-900 tracking-tight overflow-hidden">
                      {sponser.name || "Unknown"}
                    </h1>

                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < sponser.rating
                              ? "fill-current"
                              : "stroke-current"
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({sponser.rating || 0})
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      {sponser.description || "لا يوجد وصف"}
                    </p>
                  </div>
                </div>

                <button
                  className="bg-red-50 text-red-600 rounded-lg px-4 py-2 font-semibold hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-200 focus:outline-none transition-all duration-200 active:scale-95"
                  onClick={() => handelDelete(sponser._id)}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 inline-block ml-1 rtl:mr-1 rtl:ml-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    حذف
                  </span>
                </button>
              </div>
            ))}

            {message.length === 0 && (
              <div className="text-center py-12 px-8 bg-white rounded-xl shadow-md border border-gray-100 w-full max-w-lg">
                <div className="mb-4 flex justify-center">
                  <div className="bg-blue-50 p-4 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-700">
                  لا يوجد تعليقات حاليًا
                </p>
                <p className="text-base text-gray-500 mt-2">
                  أضف تعليقات جدد لعرضهم هنا
                </p>
                <button
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                  className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  إضافة تعليق جديد
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesData;
