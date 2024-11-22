import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";

import image from "../../assets/img.png";
const HeroSection = () => {
  const { t } = useTranslation();

  const [SocialMediaLLinks, setSocialMediaLinks] = useState([
    {
      id: 1,
      link: "https://www.facebook.com",
      icon: <FaFacebookF size={14} />,
      color: "text-blue-600 hover:text-blue-800",
    },
    {
      id: 2,
      link: "https://x.com",
      icon: <FaTwitter size={14} />,
      color: "text-black hover:text-gray-800",
    },
    {
      id: 3,
      link: "https://www.instagram.com",
      icon: <FaInstagram size={14} />,
      color: "text-pink-600 hover:text-pink-800",
    },
    {
      id: 4,
      link: "https://www.snapchat.com",
      icon: <FaSnapchatGhost size={14} />,
      color: "text-yellow-400 hover:text-yellow-600",
    },
    {
      id: 5,
      link: "https://www.tiktok.com",
      icon: <FaTiktok size={14} />,
      color: "text-black hover:text-gray-800",
    },
  ]);

  return (
      <div
        className="bg-gradient-to-tr relative from-purple-800 to-purple-500 w-[95%] h-[95vh] pt-4 px-14 rounded-b-3xl mx-auto "
        style={{ direction: "rtl", fontFamily: "Cairo" }}
      >
        <div className="flex flex-col items-center justify-center  text-white text-right">
          <h1 className="text-5xl mt-32 font-extrabold">
            {i18n.t("heroSection.title")}
          </h1>
          <p className="text-2xl font-bold  mt-10 text-grayC">
            {i18n.t("heroSection.description")}
          </p>
          <button className="bg-white text-purple-800 px-4 py-2 mt-4 rounded-full">
            {i18n.t("heroSection.button")}
          </button>
          <div className="flex items-center mt-10 mx-auto">
            <img
              src={image}
              alt="down-arrow"
              className="w-[500px] drop-shadow-2xl"
            />
            {/* <p className="text-2xl font-bold ml-2">{i18n.t("heroSection.scroll")}</p> */}
          </div>
        </div>
        <div className="absolute bottom-10 right-0 w-32 rounded-l-3xl h-10 bg-black"></div>
      </div>
  );
};

export default HeroSection;
