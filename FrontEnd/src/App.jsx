import React from "react";
import { RouterProvider } from "react-router-dom";
// import { router } from "./routes/routes";
import { router } from "./routes/router";
import AuthProvider from "./Context/AuthContext";
import DataProvider from "./Context/DataContext";
import ThemeProvider from "./Context/ThemeContextProvider";
import DashboardProvider from "./Context/DashboardContext";
import { Toaster } from "@/Components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <DashboardProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" />
          </DashboardProvider>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
