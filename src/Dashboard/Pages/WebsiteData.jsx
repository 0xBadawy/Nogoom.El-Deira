import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Configuration/Firebase";
import { useForm } from "react-hook-form";
import { useDashboard } from "../../Context/DashboardContext";
import { toast } from "sonner";
import FormField from "./FormField";
// import { ClipLoader } from "react-spinners";

const WebsiteData = () => {
  const { register, handleSubmit, reset } = useForm();
  const { getHomeData, addHomeData } = useDashboard();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await getHomeData();
      if (initialData.image1Url) setImage1Url(initialData.image1Url);
      if (initialData.image2Url) setImage2Url(initialData.image2Url);
      reset(initialData);
    };
    fetchInitialData();
  }, [getHomeData, reset]);

  const handleImageUpload = async (file, imageName) => {
    if (!file) return null;
    const storageRef = ref(storage, `images/${imageName}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (image1) {
        data.image1Url = await handleImageUpload(image1, "image1");
      }
      if (image2) {
        data.image2Url = await handleImageUpload(image2, "image2");
      }

      await addHomeData(data);
      toast.success("تم تحديث البيانات بنجاح");
      reset();
    } catch (error) {
      toast.error("حدث خطأ أثناء رفع الصور");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewImage = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="grow p-8 dark:bg-gray-800">
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          بيانات الموقع
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* قسم البيانات الرئيسية */}
            <div>
              <FormField
                id="main_title"
                label={"العنوان الرئيسي للموقع"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="subtitle"
                label={"العنوان الفرعي للموقع"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="ad_title"
                label={"عنوان الإعلان للموقع"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="ad_description"
                type="textarea"
                label={"وصف الإعلان للموقع"}
                register={register}
              />
            </div>
            {/* قسم النجوم */}
            <div>
              <FormField
                id="star_ad_1"
                label={"إعلان النجوم 1"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="star_ad_2"
                label={"إعلان النجوم 2"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="star_ad_3"
                label={"إعلان النجوم 3"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="star_ad_4"
                label={"إعلان النجوم 4"}
                register={register}
              />
            </div>
            {/* قسم الإحصائيات */}
            <div>
              <FormField
                id="campaigns_count"
                label={"عدد الحملات"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="clients_count"
                label={"عدد العملاء"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="satisfaction_rate"
                label={"معدل الرضا"}
                register={register}
              />
            </div>
            <div>
              <FormField
                id="views_count"
                label={"عدد المشاهدات"}
                register={register}
              />
            </div>


        



  {/* قسم تحميل الصور */}
  <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                تحميل الصورة الأولى
              </label>
              {image1Url && <img src={image1Url} alt="الصورة الحالية 1" className="w-32 h-32 mt-2 object-cover rounded-md" />}
              {previewImage1 && <img src={previewImage1} alt="معاينة الصورة الأولى" className="w-32 h-32 mt-2 object-cover rounded-md" />}
              <input type="file" accept="image/*" onChange={(e) => handlePreviewImage(e, setImage1, setPreviewImage1)} className="mt-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                تحميل الصورة الثانية
              </label>
              {image2Url && <img src={image2Url} alt="الصورة الحالية 2" className="w-32 h-32 mt-2 object-cover rounded-md" />}
              {previewImage2 && <img src={previewImage2} alt="معاينة الصورة الثانية" className="w-32 h-32 mt-2 object-cover rounded-md" />}
              <input type="file" accept="image/*" onChange={(e) => handlePreviewImage(e, setImage2, setPreviewImage2)} className="mt-2" />
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 mt-6 rounded-lg hover:bg-indigo-700 flex justify-center items-center">
            {isLoading ? "تحميل.... ": "تسجيل"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebsiteData;
