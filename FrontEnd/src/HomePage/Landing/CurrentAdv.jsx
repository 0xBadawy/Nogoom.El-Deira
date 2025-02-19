import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdvCard } from "./AdvCard";
import { useDashboard } from "../../Context/DashboardContext";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';



const CurrentAdv = function () {
  const { t } = useTranslation();
  const [arabicCityName, setArabicCityName] = useState("");
  const [ads, setAds] = useState([]);
  const { getAllAds } = useDashboard();
  const selectedArea = localStorage.getItem("selectedArea");

  const getCityNameInArabic = async function (lat, lng) {
    const apiKey = "AIzaSyAjI3P4a0X9Woulx01POM5hJxNHxOoq5bE"; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ar`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Extract the city name from the results
        if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            // Find the city name in the address components
            const cityComponent = addressComponents.find(component =>
                component.types.includes("locality") || component.types.includes("administrative_area_level_2")
            );

            return cityComponent?.long_name || t("unknownCity");
        } else {
            throw new Error("No results found");
        }
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

const fetchCityName = async function () {
    try {
        const position = await getLocation();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const cityName = await getCityNameInArabic(lat, lng);
        setArabicCityName(cityName);
        Update(cityName);
        console.log("City name in Arabic:", cityName);
    } catch (error) {
        console.error("Error fetching location or city name:", error);
    }
};

useEffect(function () {
    fetchCityName();
}, []);


  const Update = (gov) => {
    const GovernmentNames = [
      "الرياض",
      "مكة المكرمة",
      "المدينة المنورة",
      "القصيم",
      "المنطقة الشرقية",
      "عسير",
      "تبوك",
      "حائل",
      "الحدود الشمالية",
      "جازان",
      "نجران",
      "الباحة",
      "الجوف",
    ];
  
    const matchedArea = GovernmentNames.find(
      (name) => name.includes(gov) || gov.includes(name)
    );
  
    if (matchedArea) {
      localStorage.setItem("selectedArea", matchedArea);
    } else {
      console.log("No match found");
    }
  };

  

  

  useEffect(
    function () {
      const fetchAds = async function () {
        const mockData = await getAllAds();
        console.log(mockData);
        

        if(!selectedArea||selectedArea==="all"){
          setAds(mockData );
        }else{

            const filteredAds = mockData.filter(ad => ad.region === selectedArea); // Filter based on selected area
            setAds(filteredAds );
            console.log("Filtered Ads:", filteredAds);
        }


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
      className="bg-white dark:bg-gray-800 relative mt-4  max-w-[95%] mx-auto py-10 px-4 sm:px-6 lg:px-4 rounded-3xl shadow-lg"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">

          {selectedArea === "all"||!selectedArea
    ? "  الحملات الإعلانية المتوفرة حاليًا فى السعودية"  
    : "الحملات الإعلانية المتوفرة حاليًا فى " + selectedArea}

        </h1>
        <Link
          to="/ads"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
        >
          {"عرض كل الاعلانات"}
          <ChevronLeft className="mr-2  h-5 w-5" aria-hidden="true" />
        </Link>
      </div>


<div className="">
  <Swiper
   slidesPerView={1}
        spaceBetween={10}
        navigation
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"

  >
   {ads
  .filter((ad) => {
    // Get the current date
    const currentDate = new Date();

    // Filter by endDate: include ads where endDate is not provided or is greater than or equal to the current date
    return !ad.endDate || new Date(ad.endDate) >= currentDate;
  })
  .map((item, index) => (
    <SwiperSlide key={item?.id || index}>
      <AdvCard
        key={item?.id || index}
        Title={item?.title || 'No Title'}
        Link={`${item?.id || '#'}`}
        Img={item?.images?.[0] || '/placeholder.jpg'}
        altText={`Image of ${item?.title || 'Advertisement'}`}
        des={item?.description || 'No Description Available'}
        category={item?.category || 'Uncategorized'}
        date={item?.date || 'Unknown Date'}
        views={item?.views || 0}
      />
    </SwiperSlide>
  ))}

  </Swiper>
</div>
{ads.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
          {selectedArea === "all"
    ? "  لا توجد حملات إعلانية متوفرة حاليًا"  
    : "لا توجد حملات إعلانية متوفرة حاليًا فى " + selectedArea}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CurrentAdv;
