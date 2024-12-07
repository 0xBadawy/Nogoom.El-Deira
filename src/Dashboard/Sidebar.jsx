import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaUser,
  FaBox,
  FaCog,
  FaRegGrinStars,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlinePrivacyTip, MdVideoSettings } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const {logOut} = useAuth();
  const handelLogOut = async () => {
    await logOut();
    navigate("/login");
  }


  const [menuItems] = useState([
    {
      icon: <FaTachometerAlt />,
      text: "لوحة التحكم",
      link: "/dashboard",
    },
    {
      icon: <FaUsers />,
      text: "الموظفين",
      link: "/dashboard/employees",
    },
    {
      icon: <FaRegGrinStars />,
      text: "النجوم",
      link: "/dashboard/users",
    },

    {
      icon: <FaCog />,
      text: "بيانات الموقع",
      link: "/dashboard/website_data",
    },
    {
      icon: <RiContactsBook3Line />,
      text: "بيانات التواصل",
      link: "/dashboard/contact",
    },
    {
      icon: <IoNotificationsSharp />,
      text: "الإشعارات",
      link: "/dashboard/notifications",
    },
    {
      icon: <TbSpeakerphone />,
      text: " إنشاء حملة ",
      link: "/dashboard/createAd",
    },
    {
      icon: <MdVideoSettings />,
      text: " الحملات",
      link: "/dashboard/ads-list",
    },
    {
      icon: <MdOutlinePrivacyTip />,
      text: "الشروط والخصوصية",
      link: "/dashboard/privacy",
    },

    {
      icon: <FaCog />,
      text: "Settings",
      link: "/dashboard/settings",
    },
  ]);

  const [phone,setPhone] = useState(false)

  return (
    <div
      className={`bg-gray-200 rounded-xl text-gray-900 h-screen px-4 fixed  ${
        phone ? "w-23" : "w-16"
      } md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white`}
    >
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center">
        <p className="text-2xl font-bold italic">لوحة التحكم</p>
        <p className="text-sm font-normal">صفحة ادارة الموقع والمستخدمين</p>
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white"
          >
            {phone ? (
              <Link
                to={item.link}
                className="flex items-center text-center md:space-x-4 gap-3  justify-c enter"
              >
                {item.icon}
                <span className="text-xs md:inline text-center">
                  {item.text}
                </span>
              </Link>
            ) : (
              <Link
                to={item.link}
                className="flex items-center space-x-4 gap-3"
              >
                {item.icon}
                <span className="hidden md:inline">{item.text}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="absolute bottom-10 w-full inline md:hidden">
        <button
          type="button"
          onClick={() => setPhone(!phone)}
          className="flex items-center space-x-4 pb-5 gap-3 hover:bg-gray-300"
        >
          {!phone ? (
            <IoIosArrowBack size={28} />
          ) : (
            <IoIosArrowForward size={28} />
          )}
        </button>
      </div>


      {/* logout button */}
      <div className="absolute bottom-0 w-full">
        <button
          type="button"
          className="flex items-center space-x-4 pb-5 gap-3 hover:bg-gray-300"
          onClick={handelLogOut}
        >
          <BiLogOut size={28} />
          <span className="hidden md:inline text-lg">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
