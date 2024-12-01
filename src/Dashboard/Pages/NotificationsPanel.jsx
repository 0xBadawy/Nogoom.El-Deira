import React, { useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      type: i % 3 === 0 ? "success" : i % 3 === 1 ? "error" : "info",
      message: `الإشعار رقم ${i + 1}`,
      isRead: false,
      date: new Date(Date.now() - i * 3600000).toLocaleString("ar-EG"),
    }))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all"); // "all", "success", "error", "info"
  const itemsPerPage = 20;

  // تصفية الإشعارات حسب النوع
  const filteredNotifications =
    filterType === "all"
      ? notifications
      : notifications.filter((n) => n.type === filterType);

  // تحديد الإشعارات المعروضة بناءً على الصفحة الحالية
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  // تحديث حالة القراءة للإشعار
  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    );
  };

  return (
    <div className="grow p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-gray-800 font-bold">لوحة الإشعارات</h2>

      {/* الفلتر */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">جميع الإشعارات</option>
          <option value="success">الإشعارات الناجحة</option>
          <option value="error">الإشعارات الفاشلة</option>
          <option value="info">إشعارات المعلومات</option>
        </select>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          الإشعارات
        </h3>

        {currentNotifications.length > 0 ? (
          <ul className="space-y-4">
            {currentNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex justify-between items-center p-4 rounded-lg ${
                  notification.type === "success"
                    ? "bg-green-100 dark:bg-green-900"
                    : notification.type === "error"
                    ? "bg-red-100 dark:bg-red-900"
                    : "bg-blue-100 dark:bg-blue-900"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {notification.type === "success" && (
                      <FaCheckCircle className="text-green-500 dark:text-green-300" />
                    )}
                    {notification.type === "error" && (
                      <FaExclamationCircle className="text-red-500 dark:text-red-300" />
                    )}
                    {notification.type === "info" && (
                      <FaBell className="text-blue-500 dark:text-blue-300" />
                    )}
                    <span
                      className={`text-gray-900 dark:text-white ${
                        notification.isRead ? "opacity-50" : "font-bold"
                      }`}
                    >
                      {notification.message}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.date}
                  </span>
                </div>
                <button
                  onClick={() => toggleReadStatus(notification.id)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {notification.isRead ? (
                    <FaEyeSlash title="تمت القراءة" />
                  ) : (
                    <FaEye title="غير مقروء" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            لا توجد إشعارات بهذا النوع.
          </p>
        )}

        {/* التصفح */}
        {currentNotifications.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              السابق
            </button>
            <span className="text-gray-900 dark:text-white">
              الصفحة {currentPage} من {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
