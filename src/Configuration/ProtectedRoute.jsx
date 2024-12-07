import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, userRole }) => {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/Dashboard/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; // تأكد من أنك تصدّر كمكون افتراضي
