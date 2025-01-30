import React, { useEffect, useState } from "react";
import CheckboxListName from "../../Components/CheckboxListName";
import { useDashboard } from "../../Context/DashboardContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SendNotification = () => {
  const [selectStars, setSelectStars] = useState([]);
  const [starsList, setStarsList] = useState([]);
  const { allUsers, SendNotification } = useDashboard();
  const [governFilter, setGovernFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState([]);

  // Extract unique governorates and areas for the filter
  const governList = [...new Set(allUsers.map((user) => user.govern))];
  const areaList = [...new Set(allUsers.flatMap((user) => user.area))];

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

    if (data.message === "") {
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

  const handleFilterUsers = () => {
    const filteredStars = allUsers.filter((user) => {
      const matchGovern = !governFilter || user.govern === governFilter;
      const matchArea = areaFilter.length === 0 || areaFilter.some((area) => user.area.includes(area));
      return user.role === "star" && matchGovern && matchArea;
    });

    setStarsList(filteredStars.map((star) => ({ name: star.name, Uid: star.Uid })));
  };

  return (
    <div className=" flex items-center justify-center md:p-4 p-2">
      <div className=" w-full bg-white rounded-lg shadow-lg md:p-8 p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">إرسال إشعار</h1>

        {/* Filter Section */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اختر المحافظة</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
              value={governFilter}
              onChange={(e) => setGovernFilter(e.target.value)}
            >
              <option value="">جميع المحافظات</option>
              {governList.map((govern) => (
                <option key={govern} value={govern}>
                  {govern}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اختر المناطق</label>
            <CheckboxListName
              text="المناطق"
              selected={(area, isSelected) => {
                setAreaFilter((prev) => {
                  if (isSelected) {
                    return [...prev, area];
                  }
                  return prev.filter((item) => item !== area);
                });
              }}
              items={areaList.map((area) => ({ name: area }))}
            />
          </div>

          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={handleFilterUsers}
          >
            تطبيق التصفية
          </button>
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
