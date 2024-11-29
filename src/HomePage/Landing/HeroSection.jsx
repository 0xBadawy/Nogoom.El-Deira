import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import image from "../../assets/img1.png";
import { ImPhone } from "react-icons/im";
import { SiWhatsapp } from "react-icons/si";
const HeroSection = () => {
  const { t } = useTranslation();

  const [SocialMediaLinks, setSocialMediaLinks] = useState([
    {
      id: 1,
      link: "https://www.facebook.com",
      icon: <FaFacebookF size={18} />,
      color: "text-blue-600 hover:text-blue-800",
      name: "فيس بوك",
    },
    {
      id: 2,
      link: "https://x.com",
      icon: <FaTwitter size={18} />,
      color: "text-black hover:text-gray-800",
      name: "تويتر",
    },
    {
      id: 3,
      link: "https://www.instagram.com",
      icon: <FaInstagram size={18} />,
      color: "text-pink-600 hover:text-pink-800",
      name: "انستجرام",
    },
    {
      id: 4,
      link: "https://www.snapchat.com",
      icon: <FaSnapchatGhost size={18} />,
      color: "text-yellow-400 hover:text-yellow-600",
      name: "سناب شات",
    },
    {
      id: 5,
      link: "https://www.tiktok.com",
      icon: <FaTiktok size={18} />,
      color: "text-black hover:text-gray-800",
      name: "تيك توك",
    },
  ]);

  const [contact, setContact] = useState([
    {
      id: 1,
      name: "الهاتف",
      value: "01000000000",
      icon: <ImPhone size={18}  />,
    },
    {
      id: 2,
      name: "البريد الالكتروني",
      value: "email.com",
      icon: <MdMarkEmailRead size={18} color="blue" />,
    },
    {
      id: 3,
      name: "واتساب",
      value: "01000000000",
      icon: <SiWhatsapp size={18} color="#18980e" />,
    },
  ]);

  return (
    <div
      className="bg-gradient-to-tr relative from-purple-800 to-purple-500 w-[95%] h-[86vh] pt-4 px-14 rounded-b-3xl mx-auto "
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="flex flex-col items-center justify-center  text-white text-right">
        <h1 className="text-5xl mt-28 font-extrabold">
          {i18n.t("heroSection.title")}
        </h1>
        <p className="text-2xl font-bold  mt-10 text-grayC">
          {i18n.t("heroSection.description")}
        </p>
        <button className="bg-white text-purple-800 px-4 py-2 mt-4 rounded-full">
          {i18n.t("heroSection.button")}
        </button>
        <div className="flex items-center h-[50vh] absolute bottom-0 mt-10 mx-auto">
          <img
            src={image}
            alt="down-arrow"
            className="h-full drop-shadow-2xl "
          />
          {/* <p className="text-2xl font-bold ml-2">{i18n.t("heroSection.scroll")}</p> */}
        </div>
      </div>
      <div className="absolute bottom-10 right-0 w-32 rounded-l-3xl h-10 bg-black"></div>
      <div
        className="absolute top-[33%] left-5 rounded-l-3xl  flex flex-col gap-2"
        style={{ direction: "ltr" }}
      >
        
        {SocialMediaLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            className={`group flex items-center justify-center w-10 h-10 bg-white rounded-full mx-1 hover:w-fit hover:px-4 ${link.color} transition-all ease-in-out duration-500`}
          >
            {link.icon}
            <p className="hidden group-hover:inline-block ml-2 text-sm font-bold text-gray-700 transition-all ease-in-out duration-500">
              {link.name}
            </p>
          </a>
        ))}
      </div>


       <div
        className="absolute top-[40%] right-5 rounded-l-3xl  flex flex-col gap-2"
        
      >
        
        {contact.map((link) => (
          <a
            key={link.id}
            href={link.link}
            className={`group flex items-center justify-center w-10 h-10 bg-white rounded-full mx-1 hover:w-fit hover:px-4 ${link.color} transition-all ease-in-out duration-500`}
          >
            {link.icon}
            <p className="hidden group-hover:inline-block ml-2 text-sm font-bold text-gray-700 transition-all ease-in-out duration-500">
              {link.name}
            </p>
          </a>
        ))}
      </div>


    </div>
  );
};

export default HeroSection;
