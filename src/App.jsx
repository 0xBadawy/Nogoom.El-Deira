import React from "react";
import { RouterProvider } from "react-router-dom";
// import { router } from "./routes/routes";
import { router } from "./routes/router";
import  AuthProvider  from "./context/AuthContext";
import  DataProvider  from "./context/DataContext";
import  ThemeProvider  from "./context/ThemeContextProvider";
import  DashboardProvider  from "./context/DashboardContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <DashboardProvider>
            <RouterProvider router={router} />
          </DashboardProvider>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
