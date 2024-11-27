import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
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

const router = createBrowserRouter([
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
    path: "/status",
    element: <SignUpStatus />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: (
      <ThemeContextProvider>
        <div className="flex" >
          <Sidebar />
          <div className="grow mr-16 md:mr-64  h-full lg:h-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <Dashboard /> {/* Your Dashboard Component */}
          </div>
        </div>
      </ThemeContextProvider>
    ),
    children: [
      {
        path: "users",
        element: <Users />, // Assuming Users is a subpage
      },
      {
        path: "apartments",
        element: <Apartments />, // Assuming Apartments is another subpage
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
