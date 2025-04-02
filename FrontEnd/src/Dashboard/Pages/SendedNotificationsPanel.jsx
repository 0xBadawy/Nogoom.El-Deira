import React, { useEffect, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../Configuration/axiosInstance";
import formatDate, { formatDateTime } from "../../hooks/formatDate";
import { Link } from "react-router-dom";
import NotificationItem from "./NotificationItem";

const SendedNotificationsPanel = () => {
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
       feachData(); // Refresh notifications after marking as read
    };
    readNotification();
  };

  const feachData = async () => {
    try {
      const response = await axiosInstance.get(
        `/notifications/group-notifications?userId=${user._id}`
      );
      setNotifications(response.data.notifications);
     } catch (error) {
      console.error("error : ", error);
    }
  };

  useEffect(() => {
    feachData();
  }, []);

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications?.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="p-6 m-6 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">
          الإشعارات المرسلة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600">
          إدارة الإشعارات المرسلة للمستخدمين.
        </p>
        <div className="space-y-4">
          {currentNotifications?.length > 0 ? (
            currentNotifications.map((notification, id) => (
            
              <NotificationItem key={id} notification={notification} />
            ))
          ) : (
            <p className="text-gray-500">لا توجد إشعارات حالياً.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from(
            { length: Math.ceil(notifications?.length / notificationsPerPage) },
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

export default SendedNotificationsPanel;
