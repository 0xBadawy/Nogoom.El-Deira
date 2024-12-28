import { useForm } from "react-hook-form";
import { useDashboard } from "../../Context/DashboardContext";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast, { Toaster } from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";

const Contact = () => {
  const [data, setData] = useState({});
  const { contact, updateContact } = useDashboard();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: data,
  });

  useEffect(() => {
    setData(contact);
    console.log(contact)
    setValue("phone", contact.phone);
    setValue("email", contact.email);
    setValue("whatsapp", contact.whatsapp);
    setValue("facebook", contact.facebook);
    setValue("twitter", contact.twitter);
    setValue("instagram", contact.instagram);
    setValue("linkedin", contact.linkedin);
    setValue("snapchat", contact.snapchat);
    setValue("tiktok", contact.tiktok);
    setValue("googlePlay", contact.googlePlay);
    setValue("appStore", contact.appStore);
  }, [contact]);

  const onSubmit = (data) => {
     confirmAlert({
       title: "تأكيد الحفظ",
       message: "هل تريد بالتأكيد حفظ التعديلات؟",
       buttons: [
         {
           label: "نعم",
           onClick: () => {
            
              updateContact(data);
             toast.success("تم حفظ التعديلات بنجاح");
           },
         },
         {
           label: "إلغاء",
           onClick: () => {
             toast.error("تم إلغاء العملية");
           },
         },
       ],
     });
  };

  return (
    <div className="grow p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 dark:text-white">بيانات التواصل</h2>
      <p className="dark:text-white"> تعديل بيانات التواصل فى الموقع </p>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-3">
            {/* Phone */}
            <div className="col-span-6 md:col-span-2">
              <label htmlFor="phone" className="text-gray-900 dark:text-white ">
                رقم الهاتف
                <input
                  type="text"
                  {...register("phone")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* Email */}
            <div className="col-span-6 md:col-span-2">
              <label htmlFor="email" className="text-gray-900 dark:text-white ">
                البريد الإلكترونى
                <input
                  type="email"
                  {...register("email")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* WhatsApp */}

            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="whatsapp"
                className="text-gray-900 dark:text-white "
              >
                واتساب
                <input
                  type="text"
                  {...register("whatsapp")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* Facebook */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="facebook"
                className="text-gray-900 dark:text-white "
              >
                فيسبوك
                <input
                  type="text"
                  {...register("facebook")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* Twitter */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="twitter"
                className="text-gray-900 dark:text-white "
              >
                تويتر
                <input
                  type="text"
                  {...register("twitter")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* Instagram */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="instagram"
                className="text-gray-900 dark:text-white "
              >
                انستجرام
                <input
                  type="text"
                  {...register("instagram")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* LinkedIn */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="linkedin"
                className="text-gray-900 dark:text-white "
              >
                لينكد إن
                <input
                  type="text"
                  {...register("linkedin")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* Snapchat */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="snapchat"
                className="text-gray-900 dark:text-white "
              >
                سناب شات
                <input
                  type="text"
                  {...register("snapchat")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* TikTok */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="tiktok"
                className="text-gray-900 dark:text-white "
              >
                تيك توك
                <input
                  type="text"
                  {...register("tiktok")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>
            {/* google play */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="googlePlay"
                className="text-gray-900 dark:text-white "
              >
                جوجل بلاى
                <input
                  type="text"
                  {...register("googlePlay")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>

            {/* App Store */}
            <div className="col-span-6 md:col-span-2">
              <label
                htmlFor="appStore"
                className="text-gray-900 dark:text-white "
              >
                اب ستور
                <input
                  type="text"
                  {...register("appStore")}
                  className="p-2 border w-full border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
                />
              </label>
            </div>
            <div className="col-span-6">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg w-full"
              >
                حفظ
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Contact;
