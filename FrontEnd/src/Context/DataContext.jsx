 import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Configuration/axiosInstance";
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [websiteData, setWebsiteData] = useState({});
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/defult");
         setWebsiteData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialData();
  }, []);

  return (
    <DataContext.Provider value={{ websiteData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  return useContext(DataContext);
};
