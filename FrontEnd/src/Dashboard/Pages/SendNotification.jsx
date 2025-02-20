import React, { useEffect, useState } from "react";
import CheckboxListName from "../../Components/CheckboxListName";
import { useDashboard } from "../../Context/DashboardContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GovernmentData } from "../../Stars/SignUp/data";
import UserSelector from "../../Components/UserSelector2";
import axiosInstance from "../../Configuration/axiosInstance";

const SendNotification = () => {
  const [selectStars, setSelectStars] = useState([]);
  const [starsList, setStarsList] = useState([]);
  const { allUsers, SendNotification } = useDashboard();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedGovern, setSelectedGovern] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onSubmit = (data) => {
    const adData = {
      message: data.message,
      stars: selectedUsers,
      title: "إشعار جديد",
    };
    console.log("adData : ", adData);

    const sendData = async () => {
      try {
        const response = await axiosInstance.post(
          "/notifications/group-notifications",
          adData
        );
        console.log("response : ", response);
      } catch (error) {
        console.log("error : ", error);
      }
    };

    sendData();

    // if (data.message == "") {
    //   toast.error("لا يمكن ارسال رسالة فارغة");
    //   return;
    // }

    // if (selectStars.length == 0) {
    //   toast.error("يجب اختيار نجم على الاقل");
    //   return;
    // }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("selectedUsers : ", selectedUsers);
  }, [selectedUsers]);

  return (
    <div className=" flex items-center justify-center md:p-4 p-2">
      <div className=" w-full bg-white rounded-lg shadow-lg md:p-8 p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">إرسال إشعار</h1>

        <UserSelector
          initialSelectedUsers={[]}
          onSelectionChange={setSelectedUsers}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  mt-6">
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الرسالة
            </label>
            <textarea
              {...register("message")}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="اكتب الرسالة هنا..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            ارسال اشعار
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendNotification;
