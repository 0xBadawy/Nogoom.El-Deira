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
  const { user, loading: authLoading } = useAuth(); 
  const location = useLocation();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    if (!authLoading) {
     
      setUserRole(user?.role ?? "guest");
      setLoading(false);
    }
  }, [user, authLoading]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const routeRoles = requiredRoles ?? getRoutePermissions(location.pathname);

 
   if (!hasPermission(userRole || "guest", routeRoles)) {
     return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
