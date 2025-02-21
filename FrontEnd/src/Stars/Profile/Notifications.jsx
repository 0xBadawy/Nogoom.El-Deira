import React, { useEffect, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../Configuration/axiosInstance";
import { formatDateTime } from "../../hooks/formatDate";

const Notifications = () => {
  const { user } = useAuth();
  const { updateNotificationReaded } = useDashboard();
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  const fetchData = async () => {
    try {
      const userId = user._id;
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
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  return (
    <Card>
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
                className={`p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  notification.readed ? "bg-gray-100" : "bg-indigo-50"
                }`}
              >
                <div className="flex justify-between items-center flex-col gap-3 md:flex-row">
                  <div>
                    <p className="text-sm text-indigo-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(notification.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={notification.readed ? "secondary" : "default"}
                    >
                      {notification.readed ? "مقروءة" : "جديدة"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">لا توجد إشعارات حالياً.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              السابق
            </Button>
            <span className="text-gray-700">
              {currentPage} من {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              التالي
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
