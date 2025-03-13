import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { ErrorBoundary } from "../Components/ErrorBoundary";
import { ProtectedRoute } from "./ProtectedRoute";

// Lazy load Components
const HomePage = React.lazy(() => import("../HomePage/HomePage"));
const LoginPage = React.lazy(() => import("../Stars/LoginPage"));
const AdminLoginPage = React.lazy(() => import("../Stars/AdminLoginPage"));
const ForgetPasswordPage = React.lazy(() => import("../Stars/ForgetPasswordPage"));
const ConfirmPasswordCode = React.lazy(
  () => import("../Stars/ConfirmPasswordCode")
);
const NewPassword = React.lazy(() => import("../Stars/NewPassword"));
const SignUp = React.lazy(() => import("../Stars/SignUp/SignUp"));
const SignUpStatus = React.lazy(() => import("../Stars/SignUp/SignUpStatus"));
const Profile = React.lazy(() => import("../Stars/Profile/Profile"));
const DashboardHome = React.lazy(
  () => import("../Dashboard/Pages/DashboardHome")
);
const DashboardLayout = React.lazy(
  () => import("../Dashboard/DashboardLayout")
);
// Lazy load dashboard pages
const Users = React.lazy(() => import("../Dashboard/Pages/Users"));
const UsersBalance = React.lazy(() => import("../Dashboard/Pages/UsersBalance"));
const Apartments = React.lazy(() => import("../Dashboard/Pages/Apartments"));
const NotificationsPanel = React.lazy(
  () => import("../Dashboard/Pages/NotificationsPanel")
);
const SendedNotificationsPanel = React.lazy(
  () => import("../Dashboard/Pages/SendedNotificationsPanel")
);
const SendNotification = React.lazy(
  () => import("../Dashboard/Pages/SendNotification")
);
const CreateAd = React.lazy(() => import("../Dashboard/Pages/CreateAd"));
const Employees = React.lazy(() => import("../Dashboard/Pages/Employees"));
const AdsList = React.lazy(() => import("../Dashboard/Pages/AdsList"));
const EditAd = React.lazy(() => import("../Dashboard/Pages/EditAd"));

const Privacy = React.lazy(() => import("../Dashboard/Pages/Privacy"));
const WebsiteData = React.lazy(() => import("../Dashboard/Pages/WebsiteData"));
const Contact = React.lazy(() => import("../Dashboard/Pages/ContactPage"));
const Unauthorized = React.lazy(() => import("../Pages/Unauthorized"));
const PrivacyPolicy = React.lazy(() => import("../Pages/PrivacyPolicy"));

const ContactPage = React.lazy(() => import("../Pages/ContactPage"));
const AdListPage = React.lazy(() => import("../Pages/ads/AdListPage"));
const AdDetailPage = React.lazy(() => import("../Pages/ads/AdDetailPage.jsx"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const withProtection = (Component: React.ComponentType, roles?: UserRole[]) => (
  <ProtectedRoute requiredRoles={roles}>
    {withSuspense(Component)}
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(HomePage),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/contact",
    element: withSuspense(ContactPage),
    errorElement: <ErrorBoundary />,
  },

  {
    path: "/ads",
    children: [
      { index: true, element: withProtection(AdListPage, ["admin"]) },
      { path: ":id", element: withProtection(AdDetailPage, ["star"]) },
    ],
  },

  {
    path: "/login",
    element: withSuspense(LoginPage),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin-login",
    element: withSuspense(AdminLoginPage),
    errorElement: <ErrorBoundary />,
  },
  {
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1270588403.
    path: "/forget-password",
    element: withSuspense(ForgetPasswordPage),
    errorElement: <ErrorBoundary />,
  },
  {
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1270588403.
    path: "/verify-code",
    element: withSuspense(ConfirmPasswordCode),
    errorElement: <ErrorBoundary />,
  },
  {
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1270588403.
    path: "/new-password",
    element: withSuspense(NewPassword),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: withSuspense(SignUp),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/Status",
    element: withSuspense(SignUpStatus),
    errorElement: <ErrorBoundary />,
  },
  // {
  //   path: "/Status",
  //   element: withSuspense(SignUpStatus),
  //   errorElement: <ErrorBoundary />,
  // },
  {
    path: "/privacy-policy",
    element: withSuspense(PrivacyPolicy),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/profile", 
    element: withProtection(Profile, ["star"]),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: withProtection(DashboardLayout, [
      "admin",
      "editor",
      "viewer",
      "manager",
    ]),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: withProtection(DashboardHome, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "users",
        element: withProtection(Users, [
          "admin",
          "editor",
          "viewer",
          "manager",

          "editor",
        ]),
      },
      {
        path: "users/:id",
        element: withProtection(Users, [
          "admin",
          "editor",
          "viewer",
          "manager",

          "editor",
        ]),
      },
      {
        path: "apartments",
        element: withProtection(Apartments, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "balance",
        element: withProtection(UsersBalance, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "notifications",
        element: withProtection(NotificationsPanel, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "Sended-notifications",
        element: withProtection(SendedNotificationsPanel, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "Send_Notification",
        element: withProtection(SendNotification, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "createAd",
        element: withProtection(CreateAd, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "employees",
        element: withProtection(Employees, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "ads-list",
        element: withProtection(AdsList, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "editAd/:id",
        element: withProtection(EditAd, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },

      {
        path: "privacy",
        element: withProtection(Privacy, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "contact",
        element: withProtection(Contact, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "website_data",
        element: withProtection(WebsiteData, [
          "admin",
          "editor",
          "viewer",
          "manager",
          "editor",
        ]),
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: withSuspense(Unauthorized),
    errorElement: <ErrorBoundary />,
  },
]);
