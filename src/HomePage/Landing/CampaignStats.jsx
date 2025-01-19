import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChartBar, FaUsers, FaBullhorn } from "react-icons/fa";
import { MdOutlineMoreTime } from "react-icons/md";
import { useDashboard } from "../../Context/DashboardContext";

const CampaignStats = () => {
  const [data, setData] = useState();
  const { getHomeData } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      const Data = await getHomeData();
      console.log(Data);
      setData(Data);
    };
    fetchData();
  }, []);

  const cards = [
    {
      icon: <FaChartBar className="text-5xl text-blue-500 mb-4 mx-auto" />,
      count: `${data?.campaigns_count} حملة`,
      description: "عدد الحملات المنفذة",
    },
    {
      icon: <FaUsers className="text-5xl text-green-500 mb-4 mx-auto" />,
      count: `+${data?.clients_count} عميل`,
      description: "عدد العملاء المستفيدين",
    },
    {
      icon: <FaBullhorn className="text-5xl text-yellow-500 mb-4 mx-auto" />,
      count: `${data?.satisfaction_rate}% رضا`,
      description: "معدل رضا العملاء",
    },
    {
      icon: <MdOutlineMoreTime className="text-5xl text-blue-500 mb-4 mx-auto" />,
      count: `${data?.views_count} مشاهدة`,
      description: "عدد المشاهدات",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-gray-50 to-gray-100 py-14 mt-10 px-10 rounded-3xl shadow-xl max-w-[95%] mx-auto"

      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <h2 className="text-4xl font-extrabold text-blue-800 text-center mb-10">
      نتائج حملاتنا 
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300 text-center">
              {card.icon}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {card.count}
              </h3>
              <p className="text-gray-600 font-bold">{card.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-200 rounded-full opacity-30 blur-xl"></div>
    </div>
  );
};

export default CampaignStats;
