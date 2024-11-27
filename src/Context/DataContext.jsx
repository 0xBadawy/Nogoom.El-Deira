import { createContext, useContext } from "react";
const DataContext = createContext();
const DataProvider = ({ children }) => {
  // const [currentUser, setcurrentUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const users = [
    {
      name: "John Doe",
      email: "test@test.com",
    },
    {
      name: "Jane Doe",
      email: "test@test.com",
    },
  ];
  return (
    <DataContext.Provider value={{ users }}>{children}</DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  return useContext(DataContext);
};
