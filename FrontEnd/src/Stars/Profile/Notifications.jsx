import React, { useEffect, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../Configuration/axiosInstance";
import formatDate, { formatDateTime } from "../../hooks/formatDate";

const Notifications = () => {
  const { user } = useAuth();
  const [UserId, setUserId] = useState();

  const { updateNotificationReaded } = useDashboard();

  const [notifications, setNotifications] = useState([
    // {
    //   id: 1,
    //   message: "تم تحديث بياناتك - وفى انتظار الموافقة على التحديثات",
    //   readed: false,
    // },
    // { id: 4, message: "تم تحديث سياسة الخصوصية الخاصة بنا.", readed: false },
    // {
    //   id: 2,
    //   message: "لقد قمت بإضافة صورة جديدة للملف الشخصي.",
    //   readed: false,
    // },
    // { id: 3, message: "تم تسجيل الدخول بنجاح من جهاز جديد.", readed: true },
  ]);

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
        <div className="space-y-4 ">
          {notifications?.length > 0 ? (
            notifications.map((notification, id) => (
              <div
                key={id}
                className={`p-4 rounded-lg shadow-sm ${
                  notification?.readed ? "bg-gray-100" : "bg-indigo-50"
                }`}
              >
                <div className="flex justify-between items-center flex-col gap-3 md:flex-row">
                  <div>
                    <p className="text-sm text-indigo-900">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(notification?.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ">
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

export default Notifications;
