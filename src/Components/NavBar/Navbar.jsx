import React from "react";
import { Link } from "react-router-dom";
import LogoWhite from "./../../assets/Images/Logo/Deira-logo.png";
import LogoPrimary from "./../../assets/Images/Logo/Deira-logo_colored.png";
import Image from "./../../assets/Images/LoginStar.jpg";
import { IoIosArrowDown } from "react-icons/io";




const Navbar = () => {
  const pages = [
    { path: "/", label: "الرئيسية" },
    { path: "/privacy-policy", label: "سياسة الخصوصية" },
    { path: "/contact", label: "تواصل معنا" },
    { path: "/stars", label: "النجوم" },
  ];



  return (
    <div className="bg-w w-full h-24 px-40 py-6 bg-white flex justify-center justify-between">
      <div>
        <Link to={"/home"} className=" text-2xl font-bold bg-black">
          <img src={LogoPrimary} alt="Logo" className="w-44" />
        </Link>
      </div>

      <div className="flex flex-row-reverse justify-center space-x-1">
        {pages.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="font-bold text- text-primary hover:text-primaryHover px-4 py-2 rounded-lg transition-all ease-in-out duration-300"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="">
        {true ? (
          <div className="w-full gap-2 flex items-center h-10 p-1 bg-white  rounded-full border-black border-2">
            <div className="w-8 h-8 rounded-full">
              <img
                src={Image}
                alt=""
                className="w-8 h-8 rounded-full object-fill"
              />
            </div>
            <div className="font-bold">Mohamed Badawy</div>
            <IoIosArrowDown size={25} />
          </div>
        ) : (
          "SD"
        )}
      </div>
    </div>
  );
};

export default Navbar;
