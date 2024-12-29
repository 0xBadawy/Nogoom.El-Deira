import React, { useEffect, useState } from "react";
import CheckboxListName from "../../Components/CheckboxListName";
import { useDashboard } from "../../Context/DashboardContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SendNotification = () => {
  const [selectStars, setSelectStars] = useState([]);
  const [starsList, setStarsList] = useState([]);
  const { allUsers, SendNotification } = useDashboard();

  useEffect(() => {
    const stars = allUsers.filter((user) => user.role === "star");
    setStarsList(stars.map((star) => ({ name: star.name, Uid: star.Uid })));
  }, [allUsers]);

  const handleStarSelection = (item, isSelected) => {
    setSelectStars((prevState) => {
      if (isSelected) {
        if (!prevState.includes(item)) {
          return [...prevState, item];
        }
      } else {
        return prevState.filter((selectedItem) => selectedItem !== item);
      }
      return prevState;
    });
  };

  const onSubmit = (data) => {
    const adData = {
      ...data,
      stars: selectStars,
      readed: false,
      time: new Date(),
    };
      if(data.message==""){
      toast.error("لا يمكن ارسال رسالة فارغة");
      return;
    }

    SendNotification(adData);
    reset();
    toast.success("تم ارسال اشعار بنجاح!");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className=" flex items-center justify-center md:p-4 p-2">
      <div className=" w-full bg-white rounded-lg shadow-lg md:p-8 p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">إرسال إشعار</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div>
            <CheckboxListName
              text="اختر النجوم"
              selected={handleStarSelection}
              items={starsList}
            />
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
