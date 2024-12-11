import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { auth, db } from "../Configuration/Firebase";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [contact, setContact] = useState({});
  const [error, setError] = useState(null);

  const getAllUsers = useCallback(async () => {
    try {
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setAllUsers(users);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const fetchContact = useCallback(async () => {
    try {
      const contactDocRef = doc(db, "websiteData", "contact");
      const contactDoc = await getDoc(contactDocRef);
      if (contactDoc.exists()) {
        setContact(contactDoc.data());
        // console.log(contactDoc.data());
        return contactDoc.data();
      }
    } catch (error) {
      return;
    }
  }, []);

  const updateUser = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.Uid);
      await setDoc(userDocRef, user);
      await getAllUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const addADs = async (ad) => {
    try {
      const adsCollectionRef = collection(db, "advertisement");
      const querySnapshot = await getDocs(adsCollectionRef);
      const adCount = querySnapshot.size;
      const newAdId = adCount + 1;
      const adDocRef = doc(db, "advertisement", newAdId.toString());
      await setDoc(adDocRef, { ...ad, id: newAdId });
      // Add logic to update user ads here if necessary
    } catch (error) {
      setError(error.message);
    }
  };

  const addHomeData = async (data) => {
    try {
      const websiteDataDocRef = doc(db, "websiteData", "HomePage");
      await setDoc(websiteDataDocRef, { ...data, updatedAt: new Date() });
    } catch (error) {
      setError(error.message);
    }
    // console.log(data)
  };

  const getHomeData = useCallback(async () => {
    try {
      const websiteDataDocRef = doc(db, "websiteData", "HomePage");
      const websiteDataDoc = await getDoc(websiteDataDocRef);
      if (websiteDataDoc.exists()) {
        return websiteDataDoc.data();
      }
      return {};
    } catch (error) {
      setError(error.message);
      return {};
    }
  }, []);

  const getAllAds = useCallback(async () => {
    try {
      const ads = [];
      const querySnapshot = await getDocs(collection(db, "advertisement"));
      querySnapshot.forEach((doc) => {
        ads.push(doc.data());
      });
      return ads;
    } catch (error) {
      setError(error.message);
      return [];
    }
  }, []);

  const updatePrivacy = async (privacy) => {
    try {
      const privacyDocRef = doc(db, "websiteData", "privacy");
      await setDoc(privacyDocRef, { ...privacy, updatedAt: new Date() });
    } catch (error) {
      setError(error.message);
    }
  };

  const getPrivacy = useCallback(async () => {
    try {
      const privacyDocRef = doc(db, "websiteData", "privacy");
      const privacyDoc = await getDoc(privacyDocRef);
      if (privacyDoc.exists()) {
        return privacyDoc.data();
      }
      return {};
    } catch (error) {
      setError(error.message);
      return {};
    }
  }, []);

  const addUserNotification = async (notification, Uid) => {
    try {
      const userDocRef = doc(db, "users", Uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const user = userDoc.data();
        const notifications = user.notifications || [];

        const notificationWithId = { ...notification, id: crypto.randomUUID() };

        notifications.push(notificationWithId);

        await setDoc(userDocRef, { ...user, notifications });
      }
    } catch (error) {
      setError(error.message); 
    }
  };



  const updateNotificationReaded = async (Uid, notificationId) => {
  try {
    // Reference the user's document in the database
    const userDocRef = doc(db, "users", Uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const user = userDoc.data();
      const notifications = user.notifications || [];

      // Find and update the notification
      const updatedNotifications = notifications.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, readed: true };
        }
        return notification;
      });

      // Save the updated notifications back to the user's document
      await setDoc(userDocRef, { ...user, notifications: updatedNotifications });
      console.log("Notification marked as read.");
    } else {
      console.error("User document not found.");
    }
  } catch (error) {
    console.error("Error updating notification:", error.message);
  }
};



  const SendNotification = async (notification) => {
    const { message, readed, time, stars } = notification;
    console.log(stars);
    stars.forEach(async (user) => {
      await addUserNotification({ message, readed, time }, user.Uid);
    });
  };

  const deleteUserFromDB = async (Uid) => {
    try {
      const userDocRef = doc(db, "users", Uid);
      await setDoc(userDocRef, { isDeleted: true }, { merge: true });
      await getAllUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          await Promise.all([getAllUsers(), fetchContact()]);
        } catch (error) {
          setError(error.message);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, getAllUsers, fetchContact]); // Ensure dependencies are stable

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        addHomeData,
        getHomeData,
        currentUser,
        addADs,
        allUsers,
        updateUser,
        contact,
        error,
        getAllAds,
        updatePrivacy,
        getPrivacy,
        deleteUserFromDB,
        fetchContact,
        SendNotification,
        updateNotificationReaded,
      }}
    >
      {!loading && children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;

export const useDashboard = () => useContext(DashboardContext);
