import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./Stars/LoginPage";
import SignUp from "./Stars/SignUp/SignUp";
import AuthProvider from "./Context/AuthContext";


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
  }
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
};

export default App;
