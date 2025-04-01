import React, { useEffect, useState } from "react";
import PublicProfile from "./PublicProfile";
import AccountSettings from "./AccountSettings";
import Notifications from "./Notifications";
import ProAccount from "./ProAccount";
import {
  MdPreview,
  MdVerified,
  MdPublic,
  MdSettings,
  MdNotifications,
  MdStar,
} from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserAds from "./UserAds";
import UserStatus from "./UserStatus";
import { HiOutlineLogout } from "react-icons/hi";
import { formatDateTime } from "../../hooks/formatDate";
import { useData } from "../../Context/DataContext";

const Profile = () => {
  const [activePage, setActivePage] = useState("publicProfile");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await user;
      if (user.role !== "star") {
        navigate("/dashboard");
      }
      console.log("User Data:", data);
      setUserData(data);
    };
    fetchData();
  }, [user]);

  const handleTabChange = (page) => {
    setActivePage(page);
  };
  const menuItems = [
    { id: "publicProfile", label: "بياناتى", icon: MdPublic },
    { id: "accountSettings", label: "إعدادات الحساب", icon: MdSettings },
    { id: "notifications", label: "الإشعارات", icon: MdNotifications },
    { id: "UserAds", label: "الحملات الاعلانية", icon: MdStar },
  ];

  const handelLogout = () => {
    const confirmLogout = window.confirm("هل أنت متأكد من تسجيل الخروج؟");
    if (!confirmLogout) return; // If the user cancels the logout, do nothing

    // logOut();
    navigate("/login");
  };



    const [data, setData] = useState();
    const { websiteData } = useData();
  
    useEffect(() => {
      setData(websiteData);
       console.log("websiteData cty home", websiteData);
    }, [websiteData]);
  
  
  

  return (
    <>
      {user.role === "star" && (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={
                        userData?.profileImage ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-indigo-300 mb-4 object-cover"
                    />
                    <h2 className="text-2xl font-bold text-indigo-900">
                      {userData?.name || "User Name"}
                    </h2>
                    {/* <p className="text-indigo-600">
                  {userData?.email || "user@example.com"}
                </p> */}
                  </div>
                  <div>
                    <UserStatus
                      verified={userData?.verified}
                      accountType={userData?.accountType}
                    />
                  </div>

                  {data?.hideBalanceSection && (
                    <div className="flex my-3  flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
                      <p className="text-2xl font-semibold text-green-800 mb -2">
                        رصيد الحساب
                      </p>
                      <p className="text-5xl font-bold text-green-700">
                        {new Intl.NumberFormat("en-SA", {
                          style: "currency",
                          currency: "SAR",
                          minimumFractionDigits: 2,
                        }).format(userData?.balance || 0)}
                      </p>
                      <div className="mt4 flex items-center space-x-2">
                        <span className="text-sm text-green-600">
                          آخر تحديث: {formatDateTime(userData?.updatedAt)}
                        </span>
                        <svg
                          className="w-4 h-4 text-green-600 animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  )}
                  <nav>
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        className={`w-full mb-2 px-4  py-3 font-bold rounded-lg transition duration-300 ease-in-out flex items-center ${
                          activePage === item.id
                            ? "bg-indigo-900 text-white"
                            : "text-indigo-700 hover:bg-indigo-100"
                        }`}
                        onClick={() => handleTabChange(item.id)}
                      >
                        <item.icon className="ml-2" size={20} />
                        {item.label}
                      </button>
                    ))}
                    <button
                      className="w-full mb-2 px-4 text-indigo-700 hover:bg-indigo-100 py-3 font-bold rounded-lg transition duration-300 ease-in-out flex items-center"
                      onClick={() => navigate("/")}
                    >
                      <IoMdHome className="ml-2" size={20} />
                      الصفحة الرئيسية
                    </button>
                    <button
                      className="w-full mb-2 px-4 text-indigo-700 hover:bg-indigo-100 py-3 font-bold rounded-lg transition duration-300 ease-in-out flex items-center"
                      onClick={() => handelLogout()}
                    >
                      <HiOutlineLogout className="ml-2" size={20} />
                      تسجيل الخروج
                    </button>
                  </nav>
                </div>
              </aside>
              <main className="lg:w-3/4">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
                  {activePage === "publicProfile" && <PublicProfile />}
                  {activePage === "accountSettings" && <AccountSettings />}
                  {activePage === "notifications" && <Notifications />}
                  {activePage === "UserAds" && <UserAds />}

                  {/* button to home page */}
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
