import {
  FaUser,
  FaBullhorn,
  FaChartLine,
  FaEye,
} from "react-icons/fa";

const DashboardHome = () => {
  const user = {
    name: "أحمد علي",
    jobTitle: "مدير ",
  };

  const data = [
    {
      icon: <FaBullhorn className="text-3xl text-blue-500" />,
      title: "إجمالي الإعلانات",
      value: "1,250",
      color: "text-blue-500",
    },
    {
      icon: <FaChartLine className="text-3xl text-green-500" />,
      title: "الحملات النشطة",
      value: "320",
      color: "text-green-500",
    },
    {
      icon: <FaEye className="text-3xl text-purple-500" />,
      title: "إجمالي النقرات",
      value: "75,430",
      color: "text-purple-500",
    },
    {
      icon: <FaEye className="text-3xl text-yellow-500" />,
      title: "المشاهدات",
      value: "1,200,000",
      color: "text-yellow-500",
    },
    {
      icon: <FaEye className="text-3xl text-slate-600" />,
      title: "المستخدمين النشطين",
      value: "1,200",
      color: "text-slate-600",
    },
  ];

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
              مرحباً، {user.name}
            </h2>
            <p className="text-gray-500">الوظيفة: {user.jobTitle}</p>
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
