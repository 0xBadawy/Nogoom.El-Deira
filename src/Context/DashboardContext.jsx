import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Configuration/Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setcurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState(null);

 
    const getAllUsers = async () => {
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setAllUsers(users);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setcurrentUser(user);
            getAllUsers();
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const updateUser = async (user) => {
        const userDocRef = doc(db, "users", user.Uid);
        await setDoc(userDocRef, user);
        getAllUsers();
    }

        
    


    return (
      <DashboardContext.Provider
        value={{
          currentUser,
          allUsers,
          updateUser,
        }}
      >
        {!loading && children}
      </DashboardContext.Provider>
    );
};

export default DashboardProvider;

export const useDashboard = () => {
    return useContext(DashboardContext);
};
