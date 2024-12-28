import { Navigate, useLocation } from "react-router-dom";
import { getRoutePermissions, hasPermission } from "../utils/permissions";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState, useCallback } from "react";

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

  // Use useCallback to memoize the function so it doesn't change every render
  const fetchUserData = useCallback(async () => {
    try {
      const userData = await getUserData();
      setUserRole(userData?.role || "guest");
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [getUserData]);

  // UseEffect should run only once on mount
  useEffect(() => {
    fetchUserData(); // This will only trigger once on mount
  }, [fetchUserData]); // Only run when `fetchUserData` changes

  // Prevent re-renders until user data is fetched
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or skeleton
  }

  // Get route permissions
  const routeRoles = requiredRoles ?? getRoutePermissions(location.pathname);

  // If the user doesn't have permission, redirect to unauthorized page
  if (!hasPermission(userRole || "guest", routeRoles)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
