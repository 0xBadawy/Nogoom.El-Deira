import React, { useEffect, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";

const NotificationsPanel = () => {
  const { getUserData, getUserId } = useAuth();
  const [UserId, setUserId] = useState();

  const { updateNotificationReaded } = useDashboard();

  const [notifications, setNotifications] = useState([]);

  const handleReadNotification = (id) => {
    updateNotificationReaded(UserId, id);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const data = await getUserData();
      const sortedNotifications = data.notifications.sort(
        (a, b) =>
          new Date(b.time.seconds * 1000) - new Date(a.time.seconds * 1000)
      );
      setNotifications(sortedNotifications);
      // console.log(sortedNotifications);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getUserData, updateNotificationReaded]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserId();
      setUserId(data);
    };
    fetchData();
  }, []);

  return (
    <Card className="p- m-6 bg-white rounded-lg shadow-md ">
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
          {notifications?.length > 0 ? (
            notifications.map((notification, id) => (
              <div
                key={id}
                className={`p-2 rounded-lg shadow-sm ${
                  notification?.readed ? "bg-gray-100" : "bg-indigo-50"
                }`}
              >
                <div className="flex justify-between items-start flex-col md:flex-row max-w-full overflow-hidden">
                  <div className="w-full text-ellipsis overflow-hidden">
                    <p className="text-sm text-indigo-900 whitespace-normal">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-gray-500 whitespace-normal">
                      {notification?.time
                        ? new Date(
                            notification.time.seconds * 1000
                          ).toLocaleString()
                        : "Invalid date"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 gap-2">
                    {!notification?.readed && (
                      <Button
                        onClick={() => handleReadNotification(notification.id)}
                        variant="outline"
                        size="sm"
                      >
                        تم القراءة
                      </Button>
                    )}
                    <Badge
                      className="bg-blue-500 text-white"
                      variant={notification?.readed ? "secondary" : "default"}
                    >
                      {notification?.readed ? "مقروءة" : "جديدة"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">لا توجد إشعارات حالياً.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
