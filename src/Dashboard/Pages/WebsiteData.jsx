import React, { useEffect, useState } from "react";
import Card from "../Card";

import { FaHome, FaEye, FaEyeSlash, FaCog } from "react-icons/fa";
import FormField from "./FormField";
import { useForm } from "react-hook-form";
import { useDashboard } from "../../Context/DashboardContext";
import { toast } from "sonner";

// import { useDataContext } from "../../context/DataContext";

const WebsiteData = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { getHomeData, addHomeData } = useDashboard();

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await getHomeData();
      reset(initialData);
    };
    fetchInitialData();
  }, [getHomeData, reset, setValue]);

  const onSubmit = async (data) => {
    await addHomeData(data);
    toast.success("تم تحديث البيانات بنجاح");
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

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 mt-6 rounded-lg hover:bg-indigo-700"
            >
              {"تسجيل"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebsiteData;
