import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link ,useLocation} from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShareAlt, FaEye, FaStar, FaRocket, FaGlobe } from "react-icons/fa";
import { useDashboard } from "../../Context/DashboardContext";

const AdDetailPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [copied, setCopied] = useState(false);
 const{getAdvbyID} =useDashboard()
  useEffect(() => {
    const fetchAds = async () => {
      const mockData = await getAdvbyID(id);
      console.log(mockData);
      setAd(mockData);
    };
    fetchAds();    
  }, [id]);

    const translations = {
      events: "مناسبات",
      real_estate: "عقارات",
      cars: "سيارات",
      electronics: "إلكترونيات",
      services: "خدمات",
      home_supplies: "لوازم منزلية",
      personal_supplies: "لوازم شخصية",
      animals: "حيوانات",
    };

  const location = useLocation();
  const handleShare = async () => {
    
    const textToCopy = window.location.href;

    // Try the modern clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!ad) {
    return (
      <div className="flex justify-center items-center h-screen bg-purple-100">
        <div className="animate-pulse flex gap-4">
          <div className="rounded-full bg-purple-500 h-12 w-12"></div>
          <div className="rounded-full bg-purple-500 h-12 w-12"></div>
          <div className="rounded-full bg-purple-500 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9846e01b] via-[#cca1f1] to-[#e2c1ff] text-black">
      <div className="container mx-auto px-4 py-8">
        <Link to="/ads">
          <button className="mb-4 font-bold text-purple-500 bg-transparent border-2 border-blue-500 hover:bg-blue-800 py-2 px-4 rounded flex items-center">
            <FaArrowLeft className="ml-2" /> العودة إلى الإعلانات
          </button>
        </Link>
        <div className="overflow-hidden bg-opacity-10 bg-white backdrop-filter backdrop-blur-lg border-2 border-blue-500 rounded-lg">
          <div className="bg-gradient-to-r from-[#9846e0] to-[#9846e0] text-white p-6">
            <h1 className="text-3xl font-bold flex items-center">
              <FaRocket className="ml-2" />
              {ad.title}
            </h1>
            <div className="mt-2 bg-[#030203] font-bold text-white px-4 py-1 rounded w-fit">
              {translations[ad.category]}
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {ad.images ? (
                  <img
                    src={ad.images}
                    alt={ad.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-64 rounded-lg flex justify-center items-center text-gray-500">
                    لا توجد صور
                  </div>
                )}
                {ad.video && (
                  <video controls className="w-full mt-4 rounded-lg shadow-lg">
                    <source src={ad.video} type="video/mp4" />
                    متصفحك لا يدعم وسم الفيديو.
                  </video>
                )}
              </div>
              <div>
                <p className="text-xl mb-4">{ad.description}</p>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <FaGlobe className="ml-2" />
                    <strong>تاريخ الإطلاق:</strong>{" "}
                    {new Date(ad.startDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <FaRocket className="ml-2" />
                    <strong>تاريخ انتهاء الحدث:</strong>{" "}
                    {new Date(ad.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <FaEye className="ml-2" />
                    <strong>عدد المشاهدات:</strong>{" "}
                    {ad.views && ad.views != 0
                      ? ad.views.toLocaleString()
                      : "غير متوفر"}
                  </p>
                </div>
                <div className="my-4 border-t-2 border-blue-500"></div>
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    <FaGlobe className="ml-2" /> المنطقة:
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-indigo-700 text-white px-4 py-1 rounded font-semibold">
                      {ad.region}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    المحافظات:
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {ad.governorates.map((region, index) => (
                      <div
                        key={index}
                        className="bg-indigo-600 text-white px-4 py-1 rounded"
                      >
                        {region}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {ad.links.length > 0 && (
                    <div className="space-y-4">
                      <div className="my-4 border-t-2 border-blue-500"></div>
                      <h2 className="text-xl font-bold mb-2 flex items-center">
                        <FaRocket className="ml-2" /> روابط:
                      </h2>
                      <ul className="list-disc list-inside space-y-2">
                        {ad.links.map((link, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-lg"
                          >
                            -
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-800 hover:text-blue-500 hover:underline font-medium"
                            >
                              {link.url.slice(0, 30)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="my-4 border-t-2 border-blue-500"></div>
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <FaStar className="ml-2" />
                      النجوم المشاركين:
                    </h2>
                    <ul className="list-disc list-inside">
                      {ad.stars.map((star, index) => (
                        <li key={index}>{star.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handleShare}
                className="flex items-center bg-blue-300 border-2 border-blue-900 text-blue-700 hover:bg-blue-800 hover:text-white py-2 px-4 rounded"
              >
                <FaShareAlt className="ml-2" />
                {copied ? "تم النسخ!" : "نسخ الرابط"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;
