import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost, 
  FaTiktok,
} from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { SiWhatsapp } from "react-icons/si";
import { useDashboard } from "../../../Context/DashboardContext";
import image from "../../../assets/img1.png";
import SocialLinks from "./SocialLinks";
import ContactLinks from "./ContactLinks";
import DecorativeShapes from "./DecorativeShapes";
import HeroContent from "./HeroContent";
import { useData } from "../../../Context/DataContext";

const HeroSection = () => {

  
  const [data,setData] = useState()
  const { websiteData } = useData();

  useEffect(() => {
    setData(websiteData);
   }, [websiteData]);


  

  const contactWhatsapp = () => {
    const phoneNumber = data?.whatsapp;
    const message = "مرحبًا، هل يمكنني معرفة كيفية بدء الحملة التسويقية؟"; // الرسالة بالعربية
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp link in the same tab
    window.location.href = whatsappUrl;
  };

  

  return (
    <div
      className="relative bg-gradient-to-tr from-purple-800 to-purple-500 
                w-[95%] min-h-[95vh] pt-4 px-4 lg:px-14 rounded-b-3xl mx-auto 
                overflow-hidden"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <DecorativeShapes />

      {data?.mainTitle && data?.subTitle && (
        <HeroContent
          title={data?.mainTitle}
          description={data?.subTitle}
          buttonText={"أبدأ حملتك التسويقية"}
          buttonFunction={contactWhatsapp}
          image={data?.image1}
        />
      )}
      {/* <SocialLinks links={socialMediaLinks} /> */}
      {/* <ContactLinks contacts={contacts} /> */}
    </div>
  );
};

export default HeroSection;