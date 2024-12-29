import { Navigate } from "react-router-dom";
import { useAuthContext } from "./Context/AuthContext"; // Assuming your AuthContext has a user role

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuthContext();

  if (!user || (requiredRole && user.role !== requiredRole)) {
    // Redirect to login page if not authenticated or role doesn't match
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
