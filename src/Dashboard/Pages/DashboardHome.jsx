import { FaUser, FaBullhorn, FaChartLine, FaEye } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";

const DashboardHome = () => {
  const { getUserData } = useAuth();
  const {getFirestoreStats} = useDashboard();
  const [UserData, setUserData] = useState({
    name: "",
    role: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [getUserData]);

  const dataText =(name)=>{
    if(name=="admin") return "مدير";
    if(name=="editor") return "محرر";
    if (name == "viewer") return "مشرف";



  }

  const [ data,setData] = useState([
    
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getFirestoreStats();
        const {employees, ads} = stats;
        setData([
          {
            icon: <FaBullhorn className="text-3xl text-blue-500" />,
            title: "إجمالي الحملات",
            value: ads,
            color: "text-blue-500",
          },
          {
            icon: <FaChartLine className="text-3xl text-green-500" />,
            title: "الحملات النشطة",
            value: ads,
            color: "text-green-500",
          },
          
          
          {
            icon: <FaEye className="text-3xl text-slate-600" />,
            title: "المستخدمين النشطين",
            value: employees,
            color: "text-slate-600",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [getFirestoreStats]);



  return (
    <div className="p- bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen">
      {/* شريط جانبي */}

      {/* محتوى الصفحة */}
      <div className=" p-6">
        {/* بيانات المستخدم */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex items-center gap-4">
          <FaUser className="text-4xl text-gray-700" />
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              مرحباً، {UserData.name}
            </h2>
            <p className="text-gray-500">الوظيفة: {dataText(UserData.role)}</p>
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
