import React, { useState } from "react";

const Notifications = () => {
  // بيانات وهمية للإشعارات مع خاصية readed
  const [notifications, setNotifications] = useState([
    { id: 1, message: "تم تحديث سياسة الخصوصية الخاصة بنا.", readed: false },
    {
      id: 2,
      message: "لقد قمت بإضافة صورة جديدة للملف الشخصي.",
      readed: false,
    },
    { id: 3, message: "تم تسجيل الدخول بنجاح من جهاز جديد.", readed: true },
  ]);



  // دالة لتغيير حالة القراءة
  const handleReadNotification = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, readed: true }
          : notification
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-900">الإشعارات</h2>
      <p className="mt-4 text-gray-600">
        إدراة تفضيلات الإشعارات الخاصة بك هنا.
      </p>

      <div className="mt-6">
        {/* عرض الإشعارات */}
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex justify-between items-center p-4 mb-4 rounded-lg shadow-sm ${
                notification.readed ? "bg-indigo-100" : "bg-indigo-50"
              }`}
            >
              <div className="text-sm text-indigo-900">
                {notification.message}
              </div>
              <div className="flex space-x-2">
                {!notification.readed && (
                  <button
                    onClick={() => handleReadNotification(notification.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    تم القراءة
                  </button>
                )}
                
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">لا توجد إشعارات حالياً.</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
