import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShareAlt, FaEye, FaStar, FaRocket, FaGlobe } from "react-icons/fa";

const AdDetailPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [isLiked, setIsLiked] = useState(false);


   const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };``
  useEffect(() => {
    // Fetch ad data (mock data for this example)
    const mockData = {
      id: 13,
      category: "سديم",
      description: "استكشف عجائب السديم الكوني في هذه الفرصة التي تحدث مرة في العمر!",
      endDate: "2025-12-31",
      regions: [
        "ذراع أوريون",
        "ذراع بيرسياس",
        "ذراع سكتوم-سنتوروس",
        "ذراع القوس",
      ],
      images: [
        "../../src/assets/Images/Digital-Marketing.jpg",
      ],
      links: [
        {
          url: "https://example.com/nebula-tour",
          name: "احجز جولة السديم",
        },
      ],
      stars: [
        { id: "star1", name: "بيتلجوس" },
        { id: "star2", name: "ريجيل" },
        { id: "star3", name: "بيلا تريكس" },
      ],
      startDate: "2024-01-01",
      title: "حملة مستكشفي السديم",
      video: "https://example.com/nebula-video.mp4",
      views: 1234567,
    };

    setAd(mockData);
  }, [id]);

  if (!ad) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-pulse flex space-x-4">
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
        <Link to="/">
          <button className="mb-4 bg-transparent border-2 border-blue-500 text-blue-300 hover:bg-blue-800 py-2 px-4 rounded flex items-center">
            <FaArrowLeft className="ml-2" /> العودة إلى الإعلانات الكونية
          </button>
        </Link>
        <div className="overflow-hidden bg-opacity-10 bg-white backdrop-filter backdrop-blur-lg border-2 border-blue-500 rounded-lg">
          <div className="bg-gradient-to-r from-[#9846e0] to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold flex items-center">
              <FaRocket className="ml-2" />
              {ad.title}
            </h1>
            <div className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-fit">{ad.category}</div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-full rounded-lg shadow-lg"
                />
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
                    <strong>تاريخ انتهاء المهمة:</strong>{" "}
                    {new Date(ad.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <FaEye className="ml-2" />
                    <strong>عدد المشاهدات الكونية:</strong> {ad.views.toLocaleString()}
                  </p>
                </div>
                <div className="my-4 border-t-2 border-blue-500"></div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <FaGlobe className="ml-2" /> المناطق الكونية:
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {ad.regions.map((region, index) => (
                        <div key={index} className="bg-indigo-600 text-white px-4 py-1 rounded">
                          {region}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <FaRocket className="ml-2" /> روابط الثقب الدودي:
                    </h2>
                    <ul className="list-disc list-inside">
                      {ad.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 hover:underline"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <FaStar className="ml-2" /> الأجرام السماوية:
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
             
              <button className="flex items-center bg-blue-300 border-2 border-blue-900 text-blue-700 hover:bg-blue-800 hover:text-white  py-2 px-4 rounded">
                <FaShareAlt className="ml-2" />
                شارك عبر المجرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;
