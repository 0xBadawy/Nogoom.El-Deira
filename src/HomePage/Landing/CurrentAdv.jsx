import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdvCard } from "./AdvCard";
import { useDashboard } from "../../Context/DashboardContext";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CurrentAdv = function () {
  const { t } = useTranslation();
  const [arabicCityName, setArabicCityName] = useState("");
  const [ads, setAds] = useState([]);
  const { getAllAds } = useDashboard();

  const getCityNameInArabic = async function (lat, lng) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ar`
      );
      const data = await response.json();
      return data.address?.city || t("unknownCity");
    } catch (error) {
      console.error("Error fetching city name in Arabic:", error);
      return t("failedToFetchCity");
    }
  };

  const getLocation = function () {
    return new Promise(function (resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  useEffect(function () {
    const fetchCityName = async function () {
      try {
        const position = await getLocation();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const cityName = await getCityNameInArabic(lat, lng);
        setArabicCityName(cityName);
        console.log("City name in Arabic:", cityName);
      } catch (error) {
        console.error("Error fetching location or city name:", error);
      }
    };
    fetchCityName();
  }, []);

  useEffect(
    function () {
      const fetchAds = async function () {
        const mockData = await getAllAds();
        setAds(mockData.slice(0,3));
      };
      fetchAds();
    },
    [getAllAds]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 relative mt-4  max-w-[95%] mx-auto py-10 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          {"الحملات الإعلانية المتوفرة حاليًا"} 
        </h1>
        <Link
          to="/ads"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
        >
          {"عرض كل الاعلانات"}
          <ChevronLeft className="mr-2  h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      {/* <div className="flex items-center text-gray-600 dark:text-gray-300 mb-6">
        <MapPin className="h-5 w-5 mr-2" />
        <span>
          {t("currentLocation")}: {arabicCityName}
        </span>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map(function (item, index) {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AdvCard
                Title={item.title}
                Link={`${item.id}`}
                Img={item.images[0]}
                des={item.description}
                category={item.category}
                date={item.date}
                views={item.views}
              />
            </motion.div>
          );
        })}
      </div>

      {ads.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            {t("noAdsAvailable")}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CurrentAdv;
