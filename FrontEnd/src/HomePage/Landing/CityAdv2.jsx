import { FaWhatsapp } from "react-icons/fa"; // استيراد أيقونة الواتساب
import Image from "../../assets/Images/success.png";
import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";
import { useData } from "../../Context/DataContext";

const CityAdv2 = () => {


  const [data, setData] = useState();
  const { websiteData } = useData();

  useEffect(() => {
    setData(websiteData);
   }, [websiteData]);

  
  return (
    <div
      className="bg-white relative w-[95%] py-10 mt-5 md:px-14 px-4 rounded-3xl mx-auto"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center text-right">
          <h2 className="text-4xl font-extrabold">
            {
              data?.adTitle3 
            }
          </h2>
          <p className="text-2xl font-bold mt-4">
            {data?.adDescription3}
         
          </p>
          <a
            href={`https://wa.me/${data?.phone}?text=${encodeURIComponent(
              "مرحبًا، هل يمكنني معرفة كيفية بدء الحملة التسويقية؟"
            )}`}
            className="mt-8 px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-lg hover:shadow-xl hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-2xl" />
            أبدأ حملتك الإعلانية
          </a>
        </div>
        <div className="flex items-center justify-center ">
          <img src={data?.image3} alt="city"
          className="max-h-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CityAdv2;
