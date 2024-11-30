import React from "react";
import { BiLogOut } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaUser,
  FaBox,
  FaCog,
} from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { Link } from "react-router-dom"; // Import Link from React Router

const Sidebar = () => {
  return (
    <div className="bg-gray-200 rounded-xl text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center ">
        <p className="text-2xl font-bold italic ">لوحة التحكم</p>
        <p className="text-sm font-normal"> صفحة ادارة الموقع والمستخدمين</p>
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
          <Link to="/dashboard" className="flex items-center space-x-4  gap-3">
            <FaTachometerAlt />{" "}
            <span className="hidden md:inline">لوحة التحكم</span>
          </Link>
        </li>
        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600">
          <Link
            to="/dashboard/customers"
            className="flex items-center space-x-4  gap-3"
          >
            <FaUsers /> <span className="hidden md:inline">المستخدمين</span>
          </Link>
        </li>
        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600">
          <Link
            to="/dashboard/users"
            className="flex items-center space-x-4  gap-3"
          >
            <FaUser /> <span className="hidden md:inline">النجوم</span>
          </Link>
        </li>
        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600">
          <Link
            to="/dashboard/apartments"
            className="flex items-center space-x-4  gap-3"
          >
            <FaBox /> <span className="hidden md:inline">Apartments</span>
          </Link>
        </li>
        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600">
          <Link
            to="/dashboard/settings"
            className="flex items-center space-x-4  gap-3"
          >
            <FaCog /> <span className="hidden md:inline">Settings</span>
          </Link>
        </li>

        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600">
          <Link
            to="/dashboard/website_data"
            className="flex items-center space-x-4  gap-3"
          >
            <FaCog /> <span className="hidden md:inline">بيانات الموقع</span>
          </Link>
        </li>

        <li className="py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600">
          <Link
            to="/dashboard/contact"
            className="flex items-center space-x-4  gap-3"
          >
            <RiContactsBook3Line />{" "}
            <span className="hidden md:inline">بيانات التواصل</span>
          </Link>
        </li>
      </ul>

      {/* logout button */}
      <div className="absolute bottom-0 w-full ">
        <button
          type="button"
          className="flex items-center space-x-4 pb-5 gap-3 hover:bg-gray-300"
        >
          <BiLogOut size={28} />{" "}
          <span className="hidden md:inline text-lg">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
