import React, { useEffect, useState } from "react";
import { FaChartBar, FaUsers, FaBullhorn } from "react-icons/fa";
import { MdOutlineMoreTime } from "react-icons/md";
import { useDashboard } from "../../Context/DashboardContext";

const CampaignStats = () => {
   const [data,setData] = useState()
  
  const { getHomeData } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      const Data = await getHomeData();
      console.log(data);
      setData(Data);
    };
    fetchData();
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-gray-50 to-gray-100 relative w-[95%] py-14 mt-10 px-10 rounded-3xl shadow-xl mx-auto"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      {/* العنوان */}
      <h2 className="text-4xl font-extrabold text-blue-800 text-center mb-10">
        إحصائيات الحملات الإعلانية السابقة
      </h2>

      {/* البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {/* البطاقة الأولى */}
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
          <FaChartBar className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {data?.campaigns_count} حملة
          </h3>
          <p className="text-gray-600">عدد الحملات المنفذة</p>
        </div>

        {/* البطاقة الثانية */}
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
          <FaUsers className="text-5xl text-green-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            +{data?.clients_count} عميل
          </h3>
          <p className="text-gray-600">عدد العملاء المستفيدين</p>
        </div>

        {/* البطاقة الثالثة */}
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
          <FaBullhorn className="text-5xl text-yellow-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {data?.satisfaction_rate}% رضا
          </h3>
          <p className="text-gray-600">معدل رضا العملاء</p>
        </div>

        {/* البطاقة الرابعة */}
        {/* عدد مشاهدات الحمالات الاعلانةي  */}

        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
          <MdOutlineMoreTime className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {data?.views_count} مشاهدة  
          </h3>
          <p className="text-gray-600">عدد المشاهدات</p>
        </div>
      </div>

      {/* خلفية تزيينية */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-200 rounded-full opacity-30 blur-xl"></div>
    </div>
  );
};

export default CampaignStats;
