import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "تم تحديث بياناتك - وفى انتظار الموافقة على التحديثات",
      readed: false,
    },
    { id: 4, message: "تم تحديث سياسة الخصوصية الخاصة بنا.", readed: false },
    {
      id: 2,
      message: "لقد قمت بإضافة صورة جديدة للملف الشخصي.",
      readed: false,
    },
    { id: 3, message: "تم تسجيل الدخول بنجاح من جهاز جديد.", readed: true },
  ]);

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
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-sm ${
                  notification.readed ? "bg-gray-100" : "bg-indigo-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-indigo-900">
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-2">
                    {!notification.readed && (
                      <Button
                        onClick={() => handleReadNotification(notification.id)}
                        variant="outline"
                        size="sm"
                      >
                        تم القراءة
                      </Button>
                    )}
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
      </CardContent>
    </Card>
  );
};

export default Notifications;
