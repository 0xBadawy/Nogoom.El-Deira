import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaUsers,
  FaRegGrinStars,
  FaCog,
} from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoNotificationsCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { MdOutlinePrivacyTip, MdVideoSettings } from "react-icons/md";
import { BsFillSendPlusFill } from "react-icons/bs";
import { FaMoneyBill } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [phone, setPhone] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      const User = user;
      // setUserRole(User.role); // Set the user role
      setUserRole("admin");
      // console.log("User Role:", User.role);
    };
    fetchUserRole();
  }, [user]);

  const handleLogOut = async () => {
    await logout();
    navigate("/admin-login");
  };

  const menuItems = [
    {
      icon: <FaTachometerAlt />,
      text: "لوحة التحكم",
      link: "/dashboard",
      roles: ["admin", "editor", "viewer"],
    },
    {
      icon: <FaUsers />,
      text: "الموظفين",
      link: "/dashboard/employees",
      roles: ["admin"],
    },
    {
      icon: <FaRegGrinStars />,
      text: "النجوم",
      link: "/dashboard/users",
      roles: ["admin"],
    },
    // {
    //   icon: <FaCog />,
    //   text: "المحفظة",
    //   link: "/dashboard/balance",
    //   roles: ["admin", "editor"],
    // },
    {
      icon: <MdVideoSettings />,
      text: "الحملات",
      link: "/dashboard/ads-list",
      roles: ["admin", "editor"],
    },
    {
      icon: <TbSpeakerphone />,
      text: "حملة جديدة",
      link: "/dashboard/createAd",
      roles: ["admin", "viewer"],
    },
    {
      icon: <IoNotificationsSharp />,
      text: "الإشعارات",
      link: "/dashboard/notifications",
      roles: ["admin", "editor"],
    },
    {
      icon: <IoNotificationsCircleSharp />,
      text: "الإشعارات المرسلة",
      link: "/dashboard/Sended-Notifications",
      roles: ["admin", "editor"],
    },
    {
      icon: <BsFillSendPlusFill />,
      text: "  إشعار جديد",
      link: "/dashboard/Send_Notification",
      roles: ["admin", "editor"],
    },
    {
      icon: <FaCog />,
      text: "بيانات الموقع",
      link: "/dashboard/website_data",
      roles: ["admin", "editor"],
    },
    // {
    //   icon: <RiContactsBook3Line />,
    //   text: "بيانات التواصل",
    //   link: "/dashboard/contact",
    //   roles: ["admin", "editor"],
    // },
    // {
    //   icon: <MdOutlinePrivacyTip />,
    //   text: "الشروط والخصوصية",
    //   link: "/dashboard/privacy",
    //   roles: ["admin", "editor"],
    // },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(userRole)
  );

  return (
    <div
      className={`bg-gray-200 rounded-xl text-gray-900 h-screen px-4 fixed z-10 ${
        phone ? "w-23" : "w-16"
      } md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white`}
    >
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center">
        <p className="text-2xl font-bold italic">لوحة التحكم</p>
        <p className="text-sm font-normal">صفحة ادارة الموقع والمستخدمين</p>
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        {filteredMenuItems.map((item, index) => (
          <li
            key={index}
            className={`py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white 
                        ${currentRoute === item.link ? "bg-blue-600 text-white rounded " : ""}
                        `}
            onClick={() => setCurrentRoute(window.location.pathname)}
          >
            {phone ? (
              <Link
                to={item.link}
                className="flex items-center text-center md:space-x-4 gap-3  justify-center"
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

      {/* Logout button */}
      <div className="absolute bottom-0 w-full">
        <button
          type="button"
          className="flex items-center space-x-4 pb-5 gap-3 hover:bg-gray-300"
          onClick={handleLogOut}
        >
          <BiLogOut size={28} />
          <span className="hidden md:inline text-lg">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
