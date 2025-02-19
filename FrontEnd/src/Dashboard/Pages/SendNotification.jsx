

import React, { useEffect, useState } from "react";
import CheckboxListName from "../../Components/CheckboxListName";
import { useDashboard } from "../../Context/DashboardContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GovernmentData } from "../../Stars/SignUp/data";

const SendNotification = () => {
  const [selectStars, setSelectStars] = useState([]);
  const [starsList, setStarsList] = useState([]);
  const { allUsers, SendNotification } = useDashboard();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedGovern, setSelectedGovern] = useState("all");

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
    if (data.message == "") {
      toast.error("لا يمكن ارسال رسالة فارغة");
      return;
    }

    if (selectStars.length == 0) {
      toast.error("يجب اختيار نجم على الاقل")
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

  useEffect(() => {
    let filteredStars = allUsers.filter((user) => user.role === "star");

    if (selectedGovern !== "all") {
      filteredStars = filteredStars.filter((star) => {
        return star.area?.includes(selectedGovern); // تأكد من أن منطقة المستخدم ضمن المنطقة المحددة
      });
    }

    if (selectedRegion !== "all") {
      filteredStars = filteredStars.filter((star) => star.govern === selectedRegion);
    }

    setStarsList(filteredStars.map((star) => ({ name: star.name, Uid: star.Uid })));
  }, [allUsers, selectedRegion, selectedGovern]);






  return (
    <div className=" flex items-center justify-center md:p-4 p-2">
      <div className=" w-full bg-white rounded-lg shadow-lg md:p-8 p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">إرسال إشعار</h1>








        <div className="flex gap-4 mb-4">
          {/* قائمة المنطقة */}
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedGovern("all"); // إعادة تعيين المحافظة عند تغيير المنطقة
            }}
            className="border rounded px-2 py-1"
          >
            <option value="all">كل المناطق</option>
            {GovernmentData.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>

          {/* قائمة المحافظة */}
          <select
            value={selectedGovern}
            onChange={(e) => setSelectedGovern(e.target.value)}
            className="border rounded px-2 py-1"
            disabled={selectedRegion === "all"}
          >
            <option value="all">كل المحافظات</option>
            {selectedRegion !== "all" &&
              GovernmentData.find(
                (region) => region.name === selectedRegion
              )?.subGovernments.map((govern) => (
                <option key={govern} value={govern}>
                  {govern}
                </option>
              ))}
          </select>
        </div>



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




          {
            starsList.length > 0 ? (
              <div>
                <CheckboxListName
                  text="اختر النجوم"
                  selected={handleStarSelection}
                  items={starsList}
                />
              </div>







            ) :
              <div>
                <h6 className="mt-10  font-semibold text-black">اختيار النجوم</h6>
                <div className="p-4 bg-red-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600"> لا يوجد نجوم متاحين فى المنطفة او المحافظات المحددة </p>
                </div>
              </div>
          }






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