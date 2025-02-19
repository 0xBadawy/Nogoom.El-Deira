import { FaWhatsapp } from "react-icons/fa"; // استيراد أيقونة الواتساب
import Image from "../../assets/Images/success.png";
import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";

const CityAdv = () => {
  const [data, setData] = useState();
  const { getHomeData, fetchContact } = useDashboard();
  const [contact, setContact] = useState();
  let selectedArea = localStorage.getItem("selectedArea") || "السعودية";

  if (selectedArea === "all" || selectedArea === null) {
    selectedArea = "السعودية";
  }

  useEffect(() => {
    const fetchData = async () => {
      const Data = await getHomeData();
      setData(Data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchContactData = async () => {
      const contactData = await fetchContact();
      setContact(contactData);
    };
    fetchContactData();
  }, []);

  const phoneNumber = contact?.whatsapp;
  return (
    <div
      className="bg-white relative w-[95%] py-10 mt-5 md:px-14 px-4 rounded-3xl mx-auto"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center text-right">
          <h2 className="text-4xl font-extrabold">
            {`ضاعف انتشارك في ${selectedArea}!`}
          </h2>
          <p className="text-2xl font-bold mt-4">
            {`أعلن معنا مع أبرز مشاهير المحافظة وأوصل رسالتك إلى الجمهور المستهدف الحقيقي.`}
          </p>
          <p className="text-xl font-semibold mt-6 text-gray-800">
            {`أعلن معنا وكن جزءًا من عالم مشاهير المحافظة، حيث يتصدر إعلانك المشهد في ${selectedArea}. بفضل قاعدة جماهيرية واسعة وتأثير قوي، ستتمكن من تعزيز علامتك التجارية وتحقيق أهدافك التسويقية.`}
          </p>
          <p className="text-lg font-medium mt-4 text-gray-700">
            {"انضم الآن واكتشف قوة الإعلان الموجه والمستهدف!"}
          </p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              "مرحبًا، هل يمكنني معرفة كيفية بدء الحملة التسويقية؟"
            )}`}
            className="mt-8 px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-lg hover:shadow-xl hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-2xl" />
            أبدأ حملتك الإعلانية
          </a>
        </div>
        <div className="flex items-center justify-center">
          <img src={data?.image2Url} alt="city" />
        </div>
      </div>
    </div>
  );
};

export default CityAdv;
