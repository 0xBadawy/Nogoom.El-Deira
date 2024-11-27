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
  const Man =
    "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/Website%20Images%2FAvatar%2Fman.png?alt=media&token=dc8c1abd-015b-4ead-8d43-aa6abf80a5e9";
    const Woman =
      "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/Website%20Images%2FAvatar%2Fwoman.png?alt=media&token=635d37e3-f902-4abd-bc79-169d9d2bc2c7";

  //     balance: 1500,
  //     verified: true,
  //     verifiedBy: "admin",
  //     updatedAt: "2024-11-27T11:00:00Z",
  //     address: "شارع التحرير، القاهرة، مصر",
  //     profilePicture: "https://example.com/profile.jpg",
  //     bio: "مبرمج ومطور ويب شغوف بالتقنية.",
  //     dateOfBirth: "2000-05-15",
  //     gender: "Male",
  //     preferredLanguage: "Arabic",
  //     lastLogin: "2024-11-26T20:30:00Z",
  //     accountStatus: "Active",
  //     referralCode: "REF12345",
  //     referredBy: "REF54321",
  //     permissions: ["User", "Editor"],



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
        balance: 50,
        verified: false,
        verifiedBy: "admin",
        updatedAt: new Date().toISOString(),
        address: "شارع التحرير، القاهرة، مصر",
        profilePicture:Man,
        bio: "",
        dateOfBirth: "",
        gender:"",
        preferredLanguage: "Arabic",
        lastLogin: "",
        accountStatus: "Active",
        referralCode: "0",
        referredBy: "0",
        permissions: [],

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
