import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Configuration/Firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);

  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

    const logOut = () => {
    return signOut(auth);
  };

  const getUserId = () => {
    if (!currentUser) return "noUser";
    return currentUser.uid;
  };

  const getUserEmail = () => {
    if (!currentUser) return "noUser";
    return currentUser.email.split("@")[0];
  };

  const getUserFullEmail = () => {
    if (!currentUser) return "noUser";
    return currentUser.email;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        logOut,
        login,
        getUserId,
        getUserEmail,
        getUserFullEmail,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
