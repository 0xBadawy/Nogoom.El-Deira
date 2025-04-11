// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { AdvCard } from "./AdvCard";
// import { useDashboard } from "../../Context/DashboardContext";
// import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const CurrentAdv = function () {
//   const { t } = useTranslation();
//   const [ads, setAds] = useState([]);
//   const { getAllAds } = useDashboard();

//   const [arabicCityName, setArabicCityName] = useState("");
//   const selectedArea = localStorage.getItem("selectedArea");

//   const getCityNameInArabic = async function (lat, lng) {
 
//     const apiKey = "AIzaSyAjI3P4a0X9Woulx01POM5hJxNHxOoq5bE";
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ar`;

//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Extract the city name from the results
//       if (data.status === "OK" && data.results.length > 0) {
//         const addressComponents = data.results[0].address_components;

 
//         // Find the city name in the address components
//         const cityComponent = addressComponents.find(
//           (component) =>
//             component.types.includes("locality") ||
//             component.types.includes("administrative_area_level_2")
//         );

//         return cityComponent?.long_name || t("unknownCity");
//       } else {
//         throw new Error("No results found");
//       }
//     } catch (error) {
//       console.error("Error fetching city name in Arabic:", error);
//       return t("failedToFetchCity");
//     }
//   };

//   const getLocation = function () {
//     return new Promise(function (resolve, reject) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       } else {
//         reject(new Error("Geolocation not supported"));
//       }
//     });
//   };


  
//   const getCityNameInArabicQQ = async function (lat, lng) {
 
//     const apiKey = "AIzaSyAjI3P4a0X9Woulx01POM5hJxNHxOoq5bE"; // Replace with your Google Maps API key
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ar`;

//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // استخراج اسم الدولة من النتائج
//       if (data.status === "OK" && data.results.length > 0) {
//         const addressComponents = data.results[0].address_components;

 
//         // البحث عن اسم الدولة في المكونات
//         const countryComponent = addressComponents.find((component) =>
//           component.types.includes("country")
//         );

//         return countryComponent?.long_name || "دولة غير معروفة";
//       } else {
//         throw new Error("لم يتم العثور على نتائج");
//       }
//     } catch (error) {
//       console.error("خطأ أثناء جلب اسم الدولة:", error);
//       return "فشل في جلب اسم الدولة";
//     }
//   };



//   const fetchCityName = async function () {
//     try {
//       const position = await getLocation();
//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;
//       const cityName = await getCityNameInArabic(lat, lng);
//       setArabicCityName(cityName);
//       Update(cityName);
//      } catch (error) {
//       console.error("Error fetching location or city name:", error);
//     }
//   };

//   useEffect(function () {
//     fetchCityName();
//    }, []);

//   const Update = (gov) => {
//     const GovernmentNames = [
//       "الرياض",
//       "مكة المكرمة",
//       "المدينة المنورة",
//       "القصيم",
//       "المنطقة الشرقية",
//       "عسير",
//       "تبوك",
//       "حائل",
//       "الحدود الشمالية",
//       "جازان",
//       "نجران",
//       "الباحة",
//       "الجوف",
//       "الكويت",
//     ];

//     const matchedArea = GovernmentNames.find(
//       (name) => name.includes(gov) || gov.includes(name)
//     );

//      if (matchedArea) {
//       localStorage.setItem("selectedArea", matchedArea);
//     } else {
//       const fun = async function () {
      
//         const position = await getLocation();
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         const cityName = await getCityNameInArabicQQ(lat, lng);

          
//         const matchedArea = GovernmentNames.find(
//           (name) => name.includes(cityName) || cityName.includes(name)
//         );

//          if (matchedArea) {
//           localStorage.setItem("selectedArea", matchedArea);
//         } else {
//           localStorage.setItem("selectedArea", "all");
//         }
        


//       }
//       fun();

//     }


//   };

//   useEffect(
//     function () {
//       const fetchAds = async function () {
//         const mockData = await getAllAds();
 
//         if (!selectedArea || selectedArea === "all") {
//           setAds(mockData);
//         } else {
//           const filteredAds = mockData.filter(
//             (ad) => ad.region === selectedArea
//           ); // Filter based on selected area
//           setAds(filteredAds);
//          }
//       };
//       fetchAds();
//     },
//     [getAllAds]
//   );

//   return <></>;

// };

// export default CurrentAdv;


import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdvCard } from "./AdvCard";
import { useDashboard } from "../../Context/DashboardContext";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CurrentAdv = function ({ onLoad }) {
  const { t } = useTranslation();
  const [ads, setAds] = useState([]);
  const { getAllAds } = useDashboard();

  const [arabicCityName, setArabicCityName] = useState("");
  const selectedArea = localStorage.getItem("selectedArea");











  const getCityNameInArabic = async function (lat, lng) {
    // console.log("Getting city name in Arabic for coordinates:", lat, lng);

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

        // console.log("Address components:", addressComponents);

        // Find the city name in the address components
        const cityComponent = addressComponents.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
        );

        return cityComponent?.long_name || t("unknownCity");
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      // console.error("Error fetching city name in Arabic:", error);
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


  
  const getCityNameInArabicQQ = async function (lat, lng) {
    // console.log("Getting city name in Arabic for coordinates:", lat, lng);

    const apiKey = "AIzaSyAjI3P4a0X9Woulx01POM5hJxNHxOoq5bE"; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ar`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // استخراج اسم الدولة من النتائج
      if (data.status === "OK" && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;

        // console.log("Address components:", addressComponents);

        // البحث عن اسم الدولة في المكونات
        const countryComponent = addressComponents.find((component) =>
          component.types.includes("country")
        );

        return countryComponent?.long_name || "دولة غير معروفة";
      } else {
        throw new Error("لم يتم العثور على نتائج");
      }
    } catch (error) {
      // console.error("خطأ أثناء جلب اسم الدولة:", error);
      return "فشل في جلب اسم الدولة";
    }
  };



  const fetchCityName = async function () {
    try {
      const position = await getLocation();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const cityName = await getCityNameInArabic(lat, lng);
      setArabicCityName(cityName);
      Update(cityName);
      // console.log("City name in Arabic:", cityName);
    } catch (error) {
      console.error("Error fetching location or city name:", error);
    }
  };

  // useEffect(function () {
  //   // console.log("Fetching city name in Arabic...");
  // }, []);
  
  
  
  
  useEffect(() => {
    
    fetchCityName();

    if (onLoad) {
      onLoad(); 
    }
}, []);
  
  

  

  const Update = (gov) => {


    // check session storage if it has value then return
    const updatedByButton = sessionStorage.getItem("updatedByButton");
    if (updatedByButton) {
      // console.log("Already updated by button, skipping update.");
      return;
    }
    // sessionStorage.setItem("updatedByButton", "true");


    // return;


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
      "الكويت",
    ];

    const matchedArea = GovernmentNames.find(
      (name) => name.includes(gov) || gov.includes(name)
    );

    // console.log("Matched Area:", matchedArea);
    if (matchedArea) {
      localStorage.setItem("selectedArea", matchedArea);
    } else {
      const fun = async function () {
      
        const position = await getLocation();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const cityName = await getCityNameInArabicQQ(lat, lng);

        // console.log("No match found", gov);
        // console.log("City name in Arabic:", cityName);

        const matchedArea = GovernmentNames.find(
          (name) => name.includes(cityName) || cityName.includes(name)
        );

        // console.log("Matched Area:", matchedArea);
        if (matchedArea) {
          localStorage.setItem("selectedArea", matchedArea);
        } else {
          // localStorage.setItem("selectedArea", "all");
        }
        


      }
      fun();

    }


  };

  useEffect(
    function () {
      const fetchAds = async function () {
        const mockData = await getAllAds();
        // console.log(mockData);

        if (!selectedArea || selectedArea === "all") {
          setAds(mockData);
        } else {
          const filteredAds = mockData.filter(
            (ad) => ad.region === selectedArea
          ); // Filter based on selected area
          setAds(filteredAds);
          // console.log("Filtered Ads:", filteredAds);
        }
      };
      fetchAds();
    },
    [getAllAds]
  );

  return <></>;

};

export default CurrentAdv;

