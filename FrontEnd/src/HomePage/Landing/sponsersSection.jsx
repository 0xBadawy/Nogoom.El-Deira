import React, { useEffect, useState, useCallback } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import axiosInstance from "../../Configuration/axiosInstance";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState("all");

  // Get selected area from localStorage on component mount
  useEffect(() => {
    setSelectedArea(localStorage.getItem("selectedArea") || "all");
  }, []);

  // Fetch sponsors data
  const fetchSponsors = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/sponser");
      const data = response.data.data;
      setSponsors(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching sponsors:", err);
      setError("Failed to load sponsors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors,  selectedArea]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Handle empty state or error
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                <div className="h-2 bg-gray-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 relative mt-4 max-w-[95%] mx-auto py-10 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0 relative group"
        >
          شركاء النجاح
          <span className="absolute -bottom-1 right-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
        </motion.h1>

        {error && (
          <motion.div
            variants={itemVariants}
            className="text-red-500 bg-red-100 px-4 py-2 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}
      </div>

      <div className="m-4">
        {sponsors.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={sponsors.length > 5}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <div className="">
              {sponsors.map((sponsor, index) => (
                <SwiperSlide key={sponsor?.id || index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="flex m-5   flex-row justify-between p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600 h-full transition-all duration-300 ease-in-out"
                  >
                    <div className="flex flex-row items-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-10 rounded-full transform scale-110 blur-sm"></div>
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-logo.png"; // Fallback image
                          }}
                          className="w-20 h-20 object-cover rounded-full border-2 border-gray-100 dark:border-gray-500 shadow-sm z-10 relative"
                        />
                      </div>
                      <div className="text-center mt-2">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight line-clamp-1">
                          {sponsor.name}
                        </h2>
                        <div className="flex items-center justify-center mt-2">
                          <span className="text-sm text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                            شريك النجاح
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center p-10 bg-gray-50 dark:bg-gray-700 rounded-xl"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              لا يوجد شركاء في منطقة {selectedArea}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SponsorsSection;
