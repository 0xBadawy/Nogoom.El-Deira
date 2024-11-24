import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Configuration/Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, userData) => {
    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Step 2: Save additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        ...userData, // Add any extra data you want to save (e.g., name, role)
        createdAt: new Date().toISOString(), // Optional: Add a timestamp
        verified: false,
        verifiedBy: "",
        balance: 50,
      });

      // console.log("User successfully signed up and data saved!");
      return { success: true }; // Optionally return a success response
    } catch (error) {
      // Return or throw the error to be handled in the onSubmit function
      console.error("Error signing up or saving user data:", error.message);
      return { success: false, error: error.message }; // Return the error message
    }
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

const getUserData = async () => {
  if (!currentUser) return null;
  const userDocRef = doc(db, "users", currentUser.uid);
  const userDoc = await getDoc(userDocRef); // Use 'getDoc' here instead of calling 'get' directly on doc
  return userDoc.data();
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
        getUserData
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
