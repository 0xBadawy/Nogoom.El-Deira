import React, { useEffect, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../Configuration/axiosInstance";
import formatDate, { formatDateTime } from "../../hooks/formatDate";
import { Link } from "react-router-dom";

const NotificationsPanel = () => {
  const { user } = useAuth();
  const { updateNotificationReaded } = useDashboard();
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(12); // Number of notifications per page

  const handleReadNotification = (id) => {
    const readNotification = async () => {
      const response = await axiosInstance.put(
        "/notifications/read-notification",
        {
          notificationId: id,
        }
      );
       fetchData(); // Refresh notifications after marking as read
    };
    readNotification();
  };

  const fetchData = async () => { 
    try {
      const userId = await user._id;
      const response = await axiosInstance.get(`/notifications/notifications`, {
        params: { userId },
      });
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
        setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="p-6 m-6 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">
          الإشعارات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600">
          إدارة تفضيلات الإشعارات الخاصة بك هنا.
        </p>
        <div className="space-y-4">
          {currentNotifications.length > 0 ? (
            currentNotifications.map((notification, id) => (
              <div
                key={id}
                className={`p-1 rounded-lg shadow-sm transition-all duration-200 ${
                  notification?.isRead ? "bg-gray-100" : "bg-indigo-50"
                } hover:shadow-md`}
              >
                <div className="flex justify-between items-start flex-col md:flex-row max-w-full overflow-hidden">
                  <div className="w-full text-ellipsis overflow-hidden">
                    {notification?.title === "مستخدم جديد" ? (
                      <Link
                        to={`/dashboard/employees`}
                        // to={`/dashboard/employees/${notification.messageUserId}`}
                        className="text-indigo-900 font-semibold hover:text-indigo-700"
                      >
                        <p className="text-sm text-indigo-900 whitespace-normal">
                          {notification?.message}
                        </p>
                      </Link>
                    ) : (
                      <Link
                        to={`/dashboard/users/${notification.messageUserId}`}
                        className="text-indigo-900 font-semibold hover:text-indigo-700"
                      >
                        <p className="text-sm text-indigo-900 whitespace-normal">
                          {notification?.message}
                        </p>
                      </Link>
                    )}
                    <p className="text-xs text-gray-500 whitespace-normal">
                      {formatDateTime(notification?.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 gap-1 mt-2 md:mt-0">
                    {!notification?.isRead && (
                      <Button
                        onClick={() => handleReadNotification(notification._id)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-indigo-100"
                      >
                        تم القراءة
                      </Button>
                    )}
                    <Badge
                      className={`${
                        notification?.isRead ? "bg-gray-500" : "bg-blue-500"
                      } text-white`}
                    >
                      {notification?.isRead ? "مقروءة" : "جديدة"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">لا توجد إشعارات حالياً.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from(
            { length: Math.ceil(notifications.length / notificationsPerPage) },
            (_, i) => (
              <Button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                variant={currentPage === i + 1 ? "solid" : "outline"}
                className={`mx-1 ${
                  currentPage === i + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-indigo-500"
                }`}
              >
                {i + 1}
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
