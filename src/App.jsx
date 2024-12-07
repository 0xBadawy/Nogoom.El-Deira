// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Dashboard/Sidebar"; // Assuming Sidebar is a global component
import Dashboard from "./Dashboard/Dashboard";
import Apartments from "./Dashboard/Pages/Apartments";
import Users from "./Dashboard/Pages/Users";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./Stars/LoginPage";
import SignUp from "./Stars/SignUp/SignUp";
import SignUpStatus from "./Stars/SignUp/SignUpStatus";
import Profile from "./Stars/Profile/Profile";
import AuthProvider from "./Context/AuthContext";
import DataProvider from "./Context/DataContext";
import ThemeContextProvider from "./context/ThemeContextProvider";
import DashboardProvider from "./Context/DashboardContext";
import WebsiteData from "./Dashboard/Pages/WebsiteData";
import Contact from "./Dashboard/Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Unauthorized from "./Pages/Unauthorized";
import NotificationsPanel from "./Dashboard/Pages/NotificationsPanel";
import CreateAd from "./Dashboard/Pages/CreateAd";
import Employees from "./Dashboard/Pages/Employees";
import AdsList from "./Dashboard/Pages/AdsList";
import DashboardHome from "./Dashboard/Pages/DashboardHome";
import Privacy from "./Dashboard/Pages/Privacy";
import ProtectedRoute from "./Configuration/ProtectedRoute";

const userRole = ""; // مثال: يمكن استبدالها ببيانات جلب حقيقية.


const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/status", element: <SignUpStatus /> },
  { path: "/profile", element: <Profile /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  {
    path: "/dashboard",
    element: (
      <ThemeContextProvider>
        <div className="flex">
          <Sidebar />
          <div className="grow mr-16 md:mr-64  h-full lg:h-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <Dashboard />
          </div>
        </div>
      </ThemeContextProvider>
    ),
    children: [
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "apartments",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "premium"]}
            userRole={userRole}
          >
            <Apartments />
          </ProtectedRoute>
        ),
      },
      {
        path: "website_data",
        element: (
          <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
            <WebsiteData />
          </ProtectedRoute>
        ),
      },
      {
        path: "Contact",
        element: (
          <ProtectedRoute
            allowedRoles={["normal", "premium", "admin"]}
            userRole={userRole}
          >
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
            <NotificationsPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "createAd",
        element: (
          <ProtectedRoute
            allowedRoles={["premium", "admin"]}
            userRole={userRole}
          >
            <CreateAd />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "ads-list",
        element: (
          <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
            <AdsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "privacy",
        element: (
          <ProtectedRoute
            allowedRoles={["normal", "premium", "admin"]}
            userRole={userRole}
          >
            <Privacy />
          </ProtectedRoute>
        ),
      },
      {
        index: true,
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "premium"]}
            userRole={userRole}
          >
            <DashboardHome />
          </ProtectedRoute>
        ),
      },
      { path: "unauthorized", element: <Unauthorized /> },
    ],
  },
]);


const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <DashboardProvider>
          <RouterProvider router={router} />
        </DashboardProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
