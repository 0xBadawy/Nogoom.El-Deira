import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Configuration/Firebase";
import { useForm } from "react-hook-form";
import { useDashboard } from "../../Context/DashboardContext";
import { toast } from "sonner";
import FormField from "./FormField";
import axiosInstance from "../../Configuration/axiosInstance";
import PageLoader from "../../Components/PageLoader";

const WebsiteData = () => {
  const { register, handleSubmit, reset } = useForm();
  const { getHomeData } = useDashboard();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageData, setImageData] = useState({
    image1: { file: null, preview: null, url: "" },
    image2: { file: null, preview: null, url: "" },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/dashboard/defult");
        const initialData = response.data;

        setImageData((prev) => ({
          image1: { ...prev.image1, url: initialData.image1 },
          image2: { ...prev.image2, url: initialData.image2 },
        }));

        reset(initialData);
      } catch (error) {
        toast.error("فشل في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [getHomeData, reset]);

  const handleImageUpload = async (file, imageName) => {
    if (!file) return null;
    const storageRef = ref(storage, `images/${imageName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleImagePreview = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      setImageData((prev) => ({
        ...prev,
        [imageKey]: {
          ...prev[imageKey],
          file,
          preview: URL.createObjectURL(file),
        },
      }));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const uploadData = { ...data };

      if (imageData.image1.file) {
        uploadData.image1 = await handleImageUpload(
          imageData.image1.file,
          "image1"
        );
      }
      if (imageData.image2.file) {
        uploadData.image2 = await handleImageUpload(
          imageData.image2.file,
          "image2"
        );
      }
      console.log(uploadData);
       await axiosInstance.post("/dashboard/update", uploadData);
      toast.success("تم تحديث البيانات بنجاح");
      reset();
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث البيانات");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSections = {
    mainInfo: [
      { id: "mainTitle", label: "العنوان الرئيسي للموقع" },
      { id: "subTitle", label: "العنوان الفرعي للموقع" },
     
    ],
    mainInfo2: [
       { id: "adTitle", label: "عنوان الإعلان للموقع" },
      { id: "adDescription", label: "وصف الإعلان للموقع", type: "textarea" },
    ],

    statistics: [
      { id: "campaignCount", label: "عدد الحملات" },
      { id: "clientCount", label: "عدد العملاء" },
      { id: "satisfactionRate", label: "معدل الرضا" },
      { id: "viewCount", label: "عدد المشاهدات" },
    ],
    starAds: [
      { id: "starAd1", label: "إعلان النجوم 1" },
      { id: "starAd2", label: "إعلان النجوم 2" },
      { id: "starAd3", label: "إعلان النجوم 3" },
      { id: "starAd4", label: "إعلان النجوم 4" },
    ],
    contact: [
      { id: "phone", label: "رقم الهاتف" },
      { id: "email", label: "البريد الإلكتروني" },
      { id: "whatsapp", label: "واتساب" },
    ],
    socialMedia: [
      { id: "facebook", label: "رابط فيسبوك" },
      { id: "instagram", label: "رابط إنستجرام" },
      { id: "twitter", label: "رابط تويتر" },
      { id: "snapchat", label: "رابط سناب شات" },
      { id: "linkedin", label: "رابط لينكد إن" },
      { id: "youtube", label: "رابط يوتيوب" },
      { id: "tiktok", label: "رابط تيك توك" },
    ],
    stores: [
      { id: "googlePlay", label: "رابط جوجل بلاي" },
      { id: "appStore", label: "رابط آب ستور" },
      { id: "hideSection", label: "إخفاء القسم" },
    ],
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg">
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            بيانات الموقع
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {Object.entries(formSections).map(([section, fields]) => (
              <div key={section} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">
                  {section === "mainInfo" && "القسم رقم 1"}
                  {section === "mainInfo2" && "القسم رقم 2"}
                  {section === "starAds" && " القسم رقم 4"}
                  {section === "statistics" && "القسم رقم 3"}
                  {section === "contact" && "معلومات الاتصال"}
                  {section === "socialMedia" && "وسائل التواصل الاجتماعي"}
                  {section === "stores" && "متاجر التطبيقات"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fields.map((field) => (
                    <>
                      {field.id === "hideSection" ? (
                        <div key={field.id} className="flex items-center">
                          <input
                            type="checkbox"
                            {...register(field.id)}
                            className="text-indigo-600 rounded border-gray-300 dark:border-gray-500 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={field.id}
                            className="text-sm text-gray-700 dark:text-gray-200 ml-2"
                          >
                            {field.label}
                          </label>
                        </div>
                      ) : (
                        <div key={field.id} className="space-y-2">
                      <FormField
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        register={register}
                        className="w-full truncate"
                      />
                    </div>
                      )}
                    
                    </>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">
                سياسة الخصوصية
              </h3>
              <div>
                <textarea
                  {...register("privacy")}
                  className="w-full min-h-[300px] p-3 border rounded-lg resize-y dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["image1", "image2"].map((imageKey, index) => (
                <div key={imageKey} className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    تحميل الصورة {index + 1}
                  </label>
                  <div className="space-y-4">
                    {imageData[imageKey].url && (
                      <img
                        src={imageData[imageKey].url}
                        alt={`الصورة الحالية ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    {imageData[imageKey].preview && (
                      <img
                        src={imageData[imageKey].preview}
                        alt={`معاينة الصورة ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImagePreview(e, imageKey)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md mx-auto block py-3 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 transition duration-200"
            >
              {isSubmitting ? "جاري التحديث..." : "حفظ التغييرات"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebsiteData;
