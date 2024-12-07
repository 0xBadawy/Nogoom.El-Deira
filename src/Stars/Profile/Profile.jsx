import React, { useEffect, useState } from "react";
import PublicProfile from "./PublicProfile";
import AccountSettings from "./AccountSettings";
import Notifications from "./Notifications";
import ProAccount from "./ProAccount";
import { MdPreview, MdVerified, MdPublic, MdSettings, MdNotifications, MdStar } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activePage, setActivePage] = useState("publicProfile");
  const { getUserData } = useAuth();
  const  navigate =useNavigate();
  const [verified, setVerified] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
      setVerified(data.verified);
    };
    fetchData();
  }, [getUserData]);

  const handleTabChange = (page) => {
    setActivePage(page);
  };

  const menuItems = [
    { id: "publicProfile", label: "الصفحة الشخصية", icon: MdPublic },
    { id: "accountSettings", label: "إعدادات الحساب", icon: MdSettings },
    { id: "notifications", label: "الإشعارات", icon: MdNotifications },
    // { id: "proAccount", label: "PRO Account", icon: MdStar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={
                    userData?.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-indigo-300 mb-4"
                />
                <h2 className="text-2xl font-bold text-indigo-900">
                  {userData?.name || "User Name"}
                </h2>
                <p className="text-indigo-600">
                  {userData?.email || "user@example.com"}
                </p>
              </div>
              <div
                className={`mb-6 p-3 rounded-lg text-center ${
                  verified ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="flex items-center justify-center gap-2 font-semibold text-indigo-900">
                  {verified ? (
                    <>
                      <MdVerified className="text-green-500" size={24} />
                      تم توثيق حسابك
                    </>
                  ) : (
                    <>
                      <MdPreview className="text-red-500" size={24} />
                      حسابك قيد المراجعة
                    </>
                  )}
                </p>
              </div>
              <nav>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full mb-2 px-4 py-3 font-bold rounded-lg transition duration-300 ease-in-out flex items-center ${
                      activePage === item.id
                        ? "bg-indigo-900 text-white"
                        : "text-indigo-700 hover:bg-indigo-100"
                    }`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.label}
                  </button>
                ))}
                <button
                  className="w-full mb-2 px-4 text-indigo-700 hover:bg-indigo-100 py-3 font-bold rounded-lg transition duration-300 ease-in-out flex items-center"
                  onClick={() => navigate("/")}
                >
                  <IoMdHome className="mr-2" size={20} />
                  الصفحة الرئيسية
                </button>
              </nav>
            </div>
          </aside>
          <main className="lg:w-3/4">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
              {activePage === "publicProfile" && <PublicProfile />}
              {activePage === "accountSettings" && <AccountSettings />}
              {activePage === "notifications" && <Notifications />}
              {activePage === "proAccount" && <ProAccount />}

              {/* button to home page */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;

