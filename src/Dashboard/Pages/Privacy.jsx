import React, { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

const Privacy = () => {
const { updatePrivacy, getPrivacy } = useDashboard();
const [lastUpdate,setLastUpdate] = useState(null);
const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
} = useForm();

useEffect(() => {
    const fetchPrivacyData = async () => {
        const privacyData = await getPrivacy();
        setValue("privacy", privacyData.privacy);
        setLastUpdate(privacyData.updatedAt);
    };
    fetchPrivacyData();
}, [getPrivacy, setValue]);

const submitForm = (data) => {



     confirmAlert({
     title: "تأكيد الحفظ",
     message: "هل تريد بالتأكيد حفظ التعديلات؟",
     buttons: [
       {
         label: "نعم",
         onClick: () => {
    updatePrivacy(data);
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


}

  return (
    <div className="grow md:p-8 p-2  dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">سياسة الخصوصية</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-screen overflow-x-auto">
        <form
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex flex-col">
            <label htmlFor="privacy" className="text-lg">
              سياسة الخصوصية
            </label>
            <textarea
              {...register("privacy", { required: true })}
              className="border border-gray-300 p-2 rounded-lg mt-2"
              style={{ minHeight: "300px" }}
              defaultValue={getPrivacy().privacy}
            ></textarea>
            {errors.privacy && (
              <span className="text-red-500">هذا الحقل مطلوب</span>
            )}
          </div>
            <p className="text-sm text-gray-500 mt-2">
اخر تحديث {
    lastUpdate?.toDate().toLocaleString()
}                        </p>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4"
          >
            حفظ
          </button>
        </form>




      </div>
    
    
          <Toaster position="top-center" reverseOrder={false} />

    </div>
  );
};

export default Privacy;
