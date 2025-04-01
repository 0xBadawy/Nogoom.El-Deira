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

const MessagesSection = () => {
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
      const response = await axiosInstance.get("/messages");
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
  }, [fetchSponsors, selectedArea]);

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
          أراء العملاء
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
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <div className="bg-red-300">
              {sponsors.map((sponser, index) => (
                <SwiperSlide key={sponser?.id || index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="flex m-5    flex-row justify-between  bg-white dark:bg-gray-700 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600  transition-all duration-300 ease-in-out"
                  >
                    <div
                      key={sponser._id}
                      className="flex items-center  h-52 overflow-auto flex-col md:flex-row justify-between md:p-6 p-2 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 w-full md:w-96"
                    >
                      <div className="flex h-full flex-col md:flex-row items-center space-x-5 rtl:space-x-reverse">
                        <div className="ml-4 h-full space-y-1">
                          <h1 className="text-lg font-semibold text-gray-900 tracking-tight overflow-hidden">
                            {sponser.name || "Unknown"}
                          </h1>

                          <div className="flex items-center text-yellow-500">
                            {Array.from({ length: 5 }, (_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < sponser.rating
                                    ? "fill-current"
                                    : "stroke-current"
                                }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                              ({sponser.rating || 0})
                            </span>
                          </div>

                          <p className="text-sm text-gray-500">
                            {sponser.description || "لا يوجد وصف"}
                          </p>
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

export default MessagesSection;
