import { useState, useEffect } from "react";
import { Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import AdCard from './AdCard';
import Navbar from "../../Components/navigation/Navbar";
import { useDashboard } from "../../Context/DashboardContext";

export default function AdListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [hoveredAd, setHoveredAd] = useState(null);
  const { getAllAds } = useDashboard();
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const fetchAds = async () => {
      const mockData = await getAllAds();
      console.log(mockData);
      setAds(mockData);
    };
    fetchAds();
  }, []);

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || ad.category === selectedCategory;
    const matchesRegion =
      selectedRegion === "" || ad.region.includes(selectedRegion);
    const matchesDate = !selectedDate || ad.startDate >= selectedDate;

    return matchesSearch && matchesCategory && matchesRegion && matchesDate;
  });

  const categories = [...new Set(ads.map((ad) => ad.category))];
  const regions = [...new Set(ads.flatMap((ad) => ad.region))];

  const translations = {
        "events": "مناسبات",
        "real_estate": "عقارات",
        "cars": "سيارات",
        "electronics": "إلكترونيات",
        "services": "خدمات",
        "home_supplies": "لوازم منزلية",
        "personal_supplies": "لوازم شخصية",
        "animals": "حيوانات"
  };
  
  return (
    <>
      <Navbar color={"black"} />
      <div className="min-h-screen bg-gradient-to-b from-[#9846e01b] via-[#cca1f1] to-[#e2c1ff] text-black mt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              اعلانات الديرة
            </span>
          </h1>
          <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder="ابحث  ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto bg-white text-[#9846e0] border border-purple-500 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
              />
            </div>

            <select
              className="w-full sm:w-auto bg-white text-[#9846e0] border border-purple-500 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">جميع الفئات</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {translations[category]}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-auto bg-white text-[#9846e0] border border-purple-500 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
              onChange={(e) => setSelectedRegion(e.target.value)}
              value={selectedRegion}
            >
              <option value="">جميع المناطق</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                isHovered={hoveredAd === ad.id}
                onHoverStart={() => setHoveredAd(ad.id)}
                onHoverEnd={() => setHoveredAd(null)}
              />
            ))}
          </div>
          {filteredAds.length === 0 && (
            <p className="text-center text-[#9846e0] font-bold mt-8">
              لم يتم العثور على إعلانات 
            </p>
          )}
        </div>
      </div>
    </>
  );
}
