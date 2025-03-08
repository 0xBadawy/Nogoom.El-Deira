import { FaUser, FaBullhorn, FaChartLine, FaEye } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axiosInstance from "../../Configuration/axiosInstance";

const DashboardHome = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const { getFirestoreStats } = useDashboard();
  const [UserData, setUserData] = useState({
    name: "",
    role: "",
  });

  const fetchData = async () => {
    try {
      const userId = await user._id;
      console.log("userId----  ", user);
      const response = await axiosInstance.get(`/notifications/notifications`, {
        params: { userId },
      });
      const sortedNotifications = response.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await user;
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);


  const dataText = (name) => {
    if (name == "admin") return "مدير";
    if (name == "editor") return "محرر";
    if (name == "manager") return "مدير";
    if (name == "viewer") return "مشاهد";
    if (name == "star") return "نجم";
    if (name == "user") return "مستخدم";
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await axiosInstance.get("/dashboard/get");
        const { advertisementCount, userCount, activeAdvertisementCount } =
          stats.data.data;
        
        setData([
          {
            icon: <FaBullhorn className="text-3xl text-blue-500" />,
            title: "إجمالي الحملات",
            value: advertisementCount,
            color: "text-blue-500",
          },
          {
            icon: <FaChartLine className="text-3xl text-green-500" />,
            title: "الحملات النشطة",
            value: activeAdvertisementCount,
            color: "text-green-500",
          },

          {
            icon: <FaEye className="text-3xl text-slate-600" />,
            title: "النجوم ",
            value: userCount,
            color: "text-slate-600",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [getFirestoreStats]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="p- bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen">
      {/* شريط جانبي */}

      {/* محتوى الصفحة */}
      <div className=" p-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center gap-6 relative transition-all duration-300 hover:shadow-2xl">
          {/* User Avatar */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-md">
            <FaUser className="text-3xl text-white" />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl text-right font-bold text-gray-800 hover:text-gray-900 transition duration-300">
              مرحباً، {UserData?.name}
            </h2>
            <p className="text-gray-600 text-right mt-1">
              الوظيفة: {dataText(UserData?.role)}
            </p>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative text-gray-700 p-2 focus:outline-none hover:text-gray-900 transition duration-300"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell className="text-2xl" />
              {notifications.filter((notif) => !notif.readed).length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
                  {notifications.filter((notif) => !notif.readed).length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute -right-52   mt-2 w-72 bg-white shadow-2xl rounded-lg p-4 text-gray-700 z-10 border border-gray-100 transition-all duration-300 transform origin-top-right scale-95 hover:scale-100">
                <h3 className="font-bold mb-3 text-lg text-gray-900 flex items-center gap-2">
                  <span className="text-blue-500">🔔</span> الإشعارات
                </h3>
                {notifications.length > 0 ? (
                  <ul>
                    {notifications.map((notif, index) => (
                      <li
                        key={index}
                        className={`border-b mt-1 border-gray-100 py-2 text-sm flex flex-col gap-1 hover:bg-gray-50 transition duration-300 p-2 rounded-md ${
                          !notif.readed ? "bg-blue-50" : ""
                        }`}
                      >
                        {notif?.title === "مستخدم جديد" ? (
                          <Link
                            to={`/dashboard/employees`}
                            // to={`/dashboard/employees/${notification.messageUserId}`}
                            className="text-indigo-900 font-semibold hover:text-indigo-700"
                          >
                            <p className="text-sm text-indigo-900 whitespace-normal">
                              {notif?.message}
                            </p>
                          </Link>
                        ) : (
                          <Link
                            to={`/dashboard/users/${notif.messageUserId}`}
                            className="text-indigo-900 font-semibold hover:text-indigo-700"
                          >
                            <p className="text-sm text-indigo-900 whitespace-normal">
                              {notif?.message}
                            </p>
                          </Link>
                        )}
                        <p className="text-gray-600">{notif.message}</p>
                        {/* {!notif.readed && (
                          <span className="text-xs text-blue-500">
                            غير مقروء
                          </span>
                        )} */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    لا توجد إشعارات جديدة 🎉
                  </p>
                )}

                <Link
                  to="/dashboard/notifications"
                  className="block text-center text-blue-500 mt-4 hover:underline"
                >
                  عرض جميع الإشعارات
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* الإحصائيات */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          نظرة عامة على لوحة التحكم
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* بطاقات */}
          {data.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow"
            >
              {stat.icon}
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {stat.title}
                </h2>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
