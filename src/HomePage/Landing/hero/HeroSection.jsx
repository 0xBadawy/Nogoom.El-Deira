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

const HeroSection = () => {
  const { t } = useTranslation();
  const { contact } = useDashboard();
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    {
      id: 1,
      link: "https://www.facebook.com",
      icon: <FaFacebookF size={18} />,
      color: "text-blue-600 hover:text-blue-800",
      name: "فيس بوك",
      eName: "facebook",
    },
    {
      id: 2,
      link: "https://x.com",
      icon: <FaTwitter size={18} />,
      color: "text-black hover:text-gray-800",
      name: "تويتر",
      eName: "twitter",
    },
    {
      id: 3,
      link: "https://www.instagram.com",
      icon: <FaInstagram size={18} />,
      color: "text-pink-600 hover:text-pink-800",
      name: "انستجرام",
      eName: "instagram",
    },
    {
      id: 4,
      link: "https://www.snapchat.com",
      icon: <FaSnapchatGhost size={18} />,
      color: "text-yellow-400 hover:text-yellow-600",
      name: "سناب شات",
      eName: "snapchat",
    },
    {
      id: 5,
      link: "https://www.tiktok.com",
      icon: <FaTiktok size={18} />,
      color: "text-black hover:text-gray-800",
      name: "تيك توك",
      eName: "tiktok",
    },
  ]);

  

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "الهاتف",
      value: "01000000000",
      icon: <ImPhone size={18} />,
    },
    {
      id: 2,
      name: "البريد الالكتروني",
      value: "email.com",
      icon: <MdMarkEmailRead size={18} className="text-blue-600" />,
    },
    {
      id: 3,
      name: "واتساب",
      value: "01000000000",
      icon: <SiWhatsapp size={18} className="text-green-600" />,
    },
  ]);

  useEffect(() => {
    if (contact) {
      setContacts([
        {
          id: 1,
          name: "الهاتف",
          value: contact.phone,
          icon: <ImPhone size={18} />,
        },
        {
          id: 2,
          name: "البريد الالكتروني",
          value: contact.email,
          icon: <MdMarkEmailRead size={18} className="text-blue-600" />,
        },
        {
          id: 3,
          name: "واتساب",
          value: contact.whatsapp,
          icon: <SiWhatsapp size={18} className="text-green-600" />,
        },
      ]);

      setSocialMediaLinks(prev => prev.map(link => ({
        ...link,
        link: contact[link.eName] || link.link
      })));
    }
  }, [contact]);

  

  return (
    <div
      className="relative bg-gradient-to-tr from-purple-800 to-purple-500 
                w-[95%] min-h-[95vh] pt-4 px-4 lg:px-14 rounded-b-3xl mx-auto 
                overflow-hidden"
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <DecorativeShapes />

      <HeroContent
        title={"إعلانات تصل إلى جمهورك الحقيقي!"}
        description={
          "اختر المؤثرين المناسبين وحقق نتائج حقيقية بدون تكلفة حملات ضخمة."
        }
        buttonText={"أبدأ حملتك التسويقية"}
        image={image}
      />

      <SocialLinks links={socialMediaLinks} />
      <ContactLinks contacts={contacts} />
    </div>
  );
};

export default HeroSection;