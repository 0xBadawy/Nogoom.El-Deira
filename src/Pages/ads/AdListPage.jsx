import { useState, useEffect } from "react";
import { Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import AdCard from './AdCard';

export default function AdListPage() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [hoveredAd, setHoveredAd] = useState(null);

  useEffect(() => {
    const mockData = Array(20)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        title: `إعلان كوني ${index + 1}`,
        description: "اكتشف عالماً من الإمكانيات",
        category: ["سديم", "مجرة", "نظام نجمي", "ثقب أسود"][
          Math.floor(Math.random() * 4)
        ],
        image: `src/assets/Images/Digital-Marketing.jpg`,
        regions: [
          "ذراع الجبار",
          "ذراع فرساوس",
          "ذراع القوس",
          "ذراع الدرع القنطورسي",
        ]
          .sort(() => 0.5 - Math.random())
          .slice(0, 2),
        startDate: new Date(
          2024,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ),
      }));

    setAds(mockData);
  }, []);

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || ad.category === selectedCategory;
    const matchesRegion =
      selectedRegion === "" || ad.regions.includes(selectedRegion);
    const matchesDate = !selectedDate || ad.startDate >= selectedDate;

    return matchesSearch && matchesCategory && matchesRegion && matchesDate;
  });

  const categories = [...new Set(ads.map((ad) => ad.category))];
  const regions = [...new Set(ads.flatMap((ad) => ad.regions))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9846e01b] via-[#cca1f1] to-[#e2c1ff] text-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            الإعلانات الكونية
          </span>
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="ابحث في الكون..."
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
            <option value="">الفئة</option>
            <option value="all">جميع الفئات</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="w-full sm:w-auto bg-white text-[#9846e0] border border-purple-500 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
            onChange={(e) => setSelectedRegion(e.target.value)}
            value={selectedRegion}
          >
            <option value="">المنطقة</option>
            <option value="all">جميع المناطق</option>
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
          <p className="text-center text-gray-300 mt-8">
            لم يتم العثور على إعلانات كونية في هذا القطاع من الكون.
          </p>
        )}
      </div>
    </div>
  );
}
