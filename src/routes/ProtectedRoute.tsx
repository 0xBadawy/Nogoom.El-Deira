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
  const { getUserData } = useAuth();
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUserRole(userData?.role || "guest");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getUserData]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or skeleton
  }

  const routeRoles = requiredRoles ?? getRoutePermissions(location.pathname);

  if (!hasPermission(userRole || "guest", routeRoles)) {
    return (
      <Navigate
        to="/Dashboard/unauthorized"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
