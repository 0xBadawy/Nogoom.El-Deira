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


  //  Uid: "1234567289",
  //     name: "محمد أحمد",
  //     email: "mohamed.ahmed@example.com",
  //     phone: "+201001234567",
  //     area: "القاهرة",
  //     govern: ["القاهرة", "الجيزة"],
  //     balance: 1500,
  //     createdAt: "2024-11-01T12:00:00Z",
  //     facebook: "محمد أحمد",
  //     facebookLink: "https://www.facebook.com/mohamed.ahmed",
  //     iban: "EG12345678901234567890123456",
  //     instagram: "mohamed_ahmed",
  //     instagramLink: "https://www.instagram.com/mohamed_ahmed",
  //     snapchat: "mohamedSnap",
  //     snapchatLink: "https://www.snapchat.com/add/mohamedSnap",
  //     tiktok: "mohamedTikTok",
  //     tiktokLink: "https://www.tiktok.com/@mohamedTikTok",
  //     twitter: "mohamedTwitter",
  //     twitterLink: "https://twitter.com/mohamedTwitter",
  //     privacyPolicy: true,
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
  //     accountType: "Premium",
  //     notificationSettings: {
  //       email: true,
  //       sms: true,
  //       push: true,
  //     },
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
        verified: false,
        verifiedBy: "",
        updatedAt: "",
        accountStatus: "",
        accountType: "",

       
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
