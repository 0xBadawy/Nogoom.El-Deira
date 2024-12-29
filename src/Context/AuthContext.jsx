import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Configuration/Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [currentUserData, setcurrentUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const Man =
    "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/Website%20Images%2FAvatar%2Fman.png?alt=media&token=dc8c1abd-015b-4ead-8d43-aa6abf80a5e9";
  const Woman =
    "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/Website%20Images%2FAvatar%2Fwoman.png?alt=media&token=635d37e3-f902-4abd-bc79-169d9d2bc2c7";

  
  const IsLogedIn = () => {
    if (currentUser) 
      return true;
     else 
      return false;
    
  };

  
  const signUp = async (email, password, userData, role) => {
    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const Uid = userCredential.user.uid;
      const user = userCredential.user;
      // Step 2: Save additional user data in Firestore
      if (role === "star") {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          ...userData,
          createdAt: new Date().toISOString(),
          balance: 50,
          role: role,
          verified: false,
          verifiedBy: "",
          ads: [],
          updatedAt: new Date().toISOString(),
          address: "",
          profilePicture: Man,
          bio: "",
          dateOfBirth: "",
          gender: "",
          preferredLanguage: "",
          lastLogin: "",
          accountStatus: "",
          referralCode: "0",
          referredBy: "0",
          permissions: [],
          Uid: Uid,
        });
        // await auth.signOut();
        // window.location.href = "/status";
        return { success: true };

        
      } else {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          Uid: Uid,
          ...userData,
          createdAt: new Date(),
          role: role,
          verified: false,
          verifiedBy: "",
          profilePicture: Man,
          bio: "",
          permissions: [],
          lastSeen: new Date(),
        });

        await auth.signOut();
        window.location.href = "/login";
        return { success: true };

      }
    } catch (error) {
      console.error("Error signing up or saving user data:", error.message);
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userId, data) => {
    try {
      await setDoc(doc(db, "users", userId), data, { merge: true });
      return { success: true };
    } catch (error) {
      console.error("Error updating user data:", error.message);
      return { success: false, error: error.message };
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
    // console.log(userDoc)
    return userDoc.data();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      setLoading(false);
      // getUserData();
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        logOut,
        updateUser,
        login,
        getUserId,
        getUserEmail,
        getUserFullEmail,
        IsLogedIn,
        getUserData,
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
