import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../assets/Images/Logo/Deira-logo.png";
import toast, { Toaster } from "react-hot-toast";
import { IoMdNotifications } from "react-icons/io";
import SocialMedia from "./SocialMediaIcons";
import SocialMediaIcons from "./SocialMediaIcons";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
const Navbar = ({ Type }) => {
  const { t } = useTranslation();
  

  console.log(Type);

  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("/");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pages = [
    { path: "/", label: i18n.t("navbar.home") },
    { path: "/privacy-policy", label: i18n.t("navbar.privacy") },
    { path: "/contact", label: i18n.t("navbar.contact") },
    { path: "/stars", label: i18n.t("navbar.stars") },
  ];

  const [notifications, setNotifications] = useState([
    { id: 1, message: "إشعار جديد", read: false },
    { id: 2, message: "تم تحديث حسابك", read: true },
    { id: 2, message: "تم تحديث حسابك", read: true },
  ]);
  const handleNavClick = (path) => {
    setActiveNav(path);
  };
  const confirmLogout = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const NotificationsMenu = () => {
    return (
      <div className="absolute top-12 left-0 md:right-0 bg-white shadow-lg rounded-lg w-64 z-50 overflow-hidden">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex items-start gap-2 p-4 cursor-pointer hover:bg-gray-50 transition ${
                  notification.read ? "bg-gray-50" : "bg-blue-50"
                }`}
              >
                <div className="flex-shrink-0">
                  <span
                    className={`block w-3 h-3 rounded-full ${
                      notification.read ? "bg-gray-400" : "bg-blue-500"
                    }`}
                  ></span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">منذ دقيقة</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">لا توجد إشعارات</p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <nav
      className={` ite shad ow-lg z-50 py-2 fixed top-0 left-0 w-full block text-white`}
      style={{ direction: "ltr", fontFamily: "Alexandria" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Conditional Button/User Icon */}
          
  

          
          <div className="flex items-center md:mr-4">
            {true ? (
              <div className="relative flex justify-center items-center gap-5 flex-row-reverse">
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative"
                  >
                    <IoMdNotifications className="h-6 w-6" />
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notifications.filter((n) => !n.read).length}
                      </span>
                    )}
                  </button>
                  {isNotificationsOpen && <NotificationsMenu />}
                </div>

                <SocialMediaIcons />
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-[#333e6d] text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* Navbar Links */}
          <div className="text-sm hidden md:flex flex-1 flex-row-reverse justify-center space-x-1">
            {pages.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="font-medium text-white hover:text-gray-200 px-4 py-2 rounded-lg transition-all ease-in-out duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center ml-4">
            <div className="text-2xl mx-2 font-bold text-indigo-600">
              <Link to="/">
                <img src={Logo} alt="logo" className="w-40" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-white p-4 shadow-lg`}
      >
        {pages.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`block text-lg text-gray-700 py-2 px-4 rounded-md hover:bg-indigo-100 transition-all ease-in-out duration-300 ${
              activeNav === path ? "bg-indigo- 100 text-ind igo-600" : ""
            }`}
            onClick={() => handleNavClick(path)}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-md p-4">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              {/* Modal Content */}
              <div className="p-4 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  هل أنت متأكد أنك تريد تسجيل الخروج؟
                </h3>
                <button
                  onClick={() => {
                    handleLogout();
                    closeModal();
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  نعم، تأكيد
                </button>
                <button
                  onClick={closeModal}
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </nav>
  );
};

export default Navbar;
