import { Navigate, useLocation } from "react-router-dom";
import { getRoutePermissions, hasPermission } from "../utils/permissions";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { user, loading: authLoading } = useAuth(); // جلب `loading` من `useAuth`
  const location = useLocation();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("User from AuthContext:", user); // تحقق مما إذا كان `user` يحتوي على البيانات الصحيحة

    if (!authLoading) {
      // لا يتم تحديث `userRole` إلا بعد انتهاء تحميل `user`
      setUserRole(user?.role ?? "guest");
      setLoading(false);
    }
  }, [user, authLoading]); // يتم تشغيل `useEffect` عند تغيير `user` أو انتهاء `authLoading`

  // إظهار رسالة تحميل إذا لم تكتمل البيانات بعد
  if (loading) {
    return <div>Loading...</div>; // يمكن استبدالها بمؤشر تحميل
  }

  // جلب الصلاحيات المطلوبة للمسار الحالي
  const routeRoles = requiredRoles ?? getRoutePermissions(location.pathname);

  console.log("Route roles:", routeRoles);

  // التحقق مما إذا كان المستخدم لديه الصلاحيات المطلوبة
  console.log("User role:", userRole);
  if (!hasPermission(userRole || "guest", routeRoles)) {
    console.log("Unauthorized access");
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
