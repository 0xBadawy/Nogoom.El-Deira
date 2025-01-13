import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdvCard } from "./AdvCard";
import { useDashboard } from "../../Context/DashboardContext";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from 'swiper';

import { Pagination,Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import ProfileCard from "./ProfileCard";



const StarsSection = function () {
 
  const [users, setUsers] = useState([]);
  const { getAllStarUsers } = useDashboard();

  const selectedArea = localStorage.getItem("selectedArea");
  useEffect(() => {
  
    const fetchData = async () => {
      const data = await getAllStarUsers();
      if(!selectedArea||selectedArea==="all"){
          setUsers(data);
        }else{

            const filteredUsers = data.filter(user => user.govern === selectedArea); // Filter based on selected area
            setUsers(filteredUsers);
        }
    //   console.log(filteredUsers); // Log the filtered data
    };
  
    fetchData();
  }, [getAllStarUsers,selectedArea]);
  

  
  useEffect(() => {
    console.log(users)
  }, [users])


return (
   
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 relative mt-4 max-w-[95%] mx-auto py-10 px-4 sm:px-6 lg:px-4 rounded-3xl shadow-lg"
        style={{ direction: "rtl", fontFamily: "Cairo" }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          {selectedArea === "all"||!selectedArea
    ? "النجوم في السعودية "
    : "النجوم فى منطقة " + selectedArea}
          </h1>
        </div>
  
        <div className="my-10">
{
  
  users.length ? (
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
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination,Navigation]}
      className="mySwiper"
    >
      {users.map((item, index) => (
        <SwiperSlide key={item?.id || index}>
          <ProfileCard
            name={item.name}
            image={item.profilePicture}
            bio={item.bio}
            area={item.govern}
            followers={item.referredBy}
            facebook={item.facebook}
            instagram={item.instagram}
            snapchat={item.snapchat}
            tiktok={item.tiktok}
            twitter={item.twitter}
            youtube={item.youtube}
          />
        </SwiperSlide>
      ))}
    </Swiper>  ) : 
    <p className="text-center">{ "لا يوجد نجوم فى منطقة " + selectedArea}</p>
}
        </div>
      </motion.div>
  
  );
}
  export default StarsSection;

  