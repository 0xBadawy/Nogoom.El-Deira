import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";
import { GovernmentData } from "../../Stars/SignUp/data";
import AdDetails from "./AdDetails";
import { AdEditModal } from "./AdEditModal";
import axiosInstance from "../../Configuration/axiosInstance";
import formatDate from "../../hooks/formatDate";
import { Outlet } from "react-router-dom";

const AdsList = () => {
  const { getAllAds } = useDashboard();
  const [selected, setSelected] = useState(null);
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // عدد العناصر لكل صفحة
  const [selectedRegion, setSelectedRegion] = useState("الكل");
  const [selectedGovernorate, setSelectedGovernorate] = useState("الكل");

  useEffect(() => {
    const featchAds = async () => {
      const response = await axiosInstance.get("/advertisement/all");
      const data = response.data.advertisements;
      
      setAds(data);
      // console.table( data); 

    }
    featchAds();

  }, []);

  const Area = (areas) => {
    if (!areas) return "";
    return Array.isArray(areas) ? areas.join(", ") : areas;
  };

  const filteredAds = ads
  .filter((ad) => {
    const regionMatch =
      selectedRegion === "الكل" || ad.address.area === selectedRegion;
    const governorateMatch =
      selectedGovernorate === "الكل" ||
      (ad.address.govern &&
        Array.isArray(ad.address.govern) &&
        ad.address.govern.includes(selectedGovernorate));
    return regionMatch && governorateMatch;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  // حساب العناصر المعروضة في الصفحة الحالية بناءً على البيانات المفلترة
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAds = filteredAds.slice(startIndex, startIndex + itemsPerPage);

  // حساب عدد الصفحات بناءً على البيانات المفلترة
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);

  return (
    <div className="grow md:p-8 p-2 dark:bg-gray-800 h-full overflow-y-auto">
      {/* <Outlet /> */}
      <h2 className="text-2xl mb-4">الحملات الاعلانية</h2>
      <div className="mt-6 bg-white w-fit md:w-full dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex gap-4 mb-4 flex-col md:flex-row">
          {/* قائمة المنطقة */}
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setCurrentPage(1);
              setSelectedGovernorate("الكل"); // إعادة تعيين المحافظة عند تغيير المنطقة
            }}
            className="px-4 py-2 bg-white border rounded-lg dark:bg-gray-700"
          >
            <option value="الكل">كل المناطق</option>
            {GovernmentData.map((region, index) => (
              <option key={index} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>

          {/* قائمة المحافظة */}
          <select
            value={selectedGovernorate}
            onChange={(e) => {
              setSelectedGovernorate(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-white border rounded-lg dark:bg-gray-700"
            disabled={selectedRegion === "الكل"} // تعطيل إذا لم يتم اختيار منطقة
          >
            <option value="الكل">كل المناطق </option>
            {GovernmentData.filter((region) => region.name === selectedRegion)
              .flatMap((region) => region.subGovernments)
              .map((gov, index) => (
                <option key={index} value={gov}>
                  {gov}
                </option>
              ))}
          </select>
        </div>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-right">اسم الحملة</th>
              {/* <th className="py-2 px-4 text-right">المنطقة</th>
              <th className="py-2 px-4 text-right">المحافظة</th>
              <th className="py-2 px-4 text-right min-w-32">الفترة</th>
              <th className="py-2 px-4 text-right">عدد المشاهدات</th> */}
            </tr>
          </thead>
          <tbody>
            {currentAds.map((row, index) => (
              <tr
                key={index}
                onClick={() => setSelected(row._id)}
                className={`border-b ${
                  row._id === selected ? "bg-gray-200" : ""
                }`}
              >
                <td className="py-2 px-4">{row.title}</td>
                {/* <td className="py-2 px-4">{row.address.area}</td>
                <td className="py-2 px-4 max-w-96 ">
                  {Area(row.address.govern)}
                </td>
                <td className="py-2 px-4">
                  <p className="text-xs">من {formatDate(row.startDate)}</p>
                  <p className="text-xs">إلى {formatDate(row.endDate)}</p>
                </td>
                <td className="py-2 px-4">{row.views}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* نظام الترقيم */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg dark:bg-gray-700 disabled:opacity-50"
          >
            السابق
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg dark:bg-gray-700 disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      </div>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-screen">
        <h2 className="text-2xl mb-4">تفاصيل الحملة</h2>
        {selected && <AdDetails ads={ads} selected={selected} />}
      </div>
    </div>
  );
};

export default AdsList;
