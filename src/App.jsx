import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./Stars/LoginPage";
import SignUp from "./Stars/SignUp";


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
  return <RouterProvider router={Router} />;
};

export default App;
