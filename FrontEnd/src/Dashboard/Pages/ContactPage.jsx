import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosInstance from "../../Configuration/axiosInstance";
import FormField from "./FormField";

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/contact");
        reset(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContactData();
  }, [reset]);

  const onSubmit = async (data) => {
     setIsLoading(true);
    try {
      const res = await axiosInstance.post("/dashboard/update-contact", data);
       toast.success("تم تحديث بيانات الاتصال بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث البيانات");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grow p-8 dark:bg-gray-800">
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          بيانات الاتصال
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField id="phone" label="رقم الهاتف" register={register} />
            <FormField
              id="email"
              label="البريد الإلكتروني"
              register={register}
            />
            <FormField id="whatsapp" label="واتساب" register={register} />
            <FormField id="facebook" label="رابط فيسبوك" register={register} />
            <FormField
              id="instagram"
              label="رابط إنستجرام"
              register={register}
            />
            <FormField id="twitter" label="رابط تويتر" register={register} />
            <FormField
              id="snapchat"
              label="رابط سناب شات"
              register={register}
            />
            <FormField
              id="linkedin"
              label="رابط لينكد إن"
              register={register}
            />
            <FormField id="youtube" label="رابط يوتيوب" register={register} />
            <FormField id="tiktok" label="رابط تيك توك" register={register} />
            <FormField
              id="telegram"
              label="رابط تيليجرام"
              register={register}
            />
            <FormField
              id="googlePlay"
              label="رابط جوجل بلاي"
              register={register}
            />
            <FormField id="appStore" label="رابط آب ستور" register={register} />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 mt-6 rounded-lg hover:bg-indigo-700 flex justify-center items-center"
          >
            {isLoading ? "تحميل..." : "تحديث البيانات"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
