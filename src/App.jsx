import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./Stars/LoginPage";
import SignUp from "./Stars/SignUp/SignUp";
import AuthProvider from "./Context/AuthContext";
import SignUpStatus from "./Stars/SignUp/SignUpStatus";
import Profile from "./Stars/Profile/Profile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "status",
    element: <SignUpStatus />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
};

export default App;
