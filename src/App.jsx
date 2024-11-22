import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import HomePage from "./HomePage/HomePage";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
