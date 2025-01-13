import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc, collection, getDocs,deleteDoc  } from "firebase/firestore";
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

  const getAllStarUsers = useCallback(async () => {
    try {
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if(doc.data().role === "star"&&doc.data().verified)
        users.push(doc.data());
      });
      
      return users;
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

  const updateContact = async (data) => {
    try {
      const contactDocRef = doc(db, "websiteData", "contact");
      await setDoc(contactDocRef, { ...data, updatedAt: new Date() });
      await fetchContact();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateUser = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.Uid);
      await setDoc(userDocRef, user);
      await getAllUsers();
      const message = "✅ تمت مراجعة و تحديث بياناتك - من خلال الادراة";
      const time = new Date();
      addUserNotification({ message, readed: false, time }, user.Uid);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateUserAds = async (ad, adId) => {
    const user = ad.stars;
    const message = `⭐ تمت اضافة اعلان جديد -  ${ad.title}`;
    const time = new Date();
    user.forEach(async (star) => {
      const userDocRef = doc(db, "users", star.Uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const ads = userData.ads;
      ads.push({
        adId,
        title: ad.title,
        category: ad.category,
        links:{},
      });
      await setDoc(userDocRef, { ...userData, ads });
      addUserNotification({ message, readed: false, time }, star.Uid);
    });
  };

  const getFirestoreStats = async () => {
    const employeesCount = await getDocs(collection(db, "users"));
    const adsCount = await getDocs(collection(db, "advertisement"));
    return {
      employees: employeesCount.size,
      ads: adsCount.size,
    }
  };

  const getUserAds = async (Uid) => {
    try {
      const userDocRef = doc(db, "users", Uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.ads;
      }
      return [];
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  const UpdateCurrentUserAds = async (Uid, data) => {

    console.log("UUU")
    console.log (Uid, data)
    try {
      const userDocRef = doc(db, "users", Uid);
      console.log("Fetching user document:", userDocRef);
    
      const userDoc = await getDoc(userDocRef);
    
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data fetched:", userData);
    
        const ads = userData.ads;
    
        if (!Array.isArray(ads)) {
          console.error("Invalid ads data:", ads);
          return;
        }
    
        const updatedAds = ads.map((ad) => {
          if (ad.adId === data.adId) {
            if (!data.links) {
              console.error("No links provided for ad:", ad.adId);
              return ad; // Skip update if links are undefined
            }
            console.log("Updating ad with ID:", ad.adId);
            return { ...ad, links: data.links };
          }
          return ad;
        });
    
        // Log the updated data before calling setDoc
        console.log("Updated ads:", updatedAds);
    
        // Ensure no undefined values are being passed
        const sanitizedUserData = { ...userData, ads: updatedAds };
        for (const key in sanitizedUserData) {
          if (sanitizedUserData[key] === undefined) {
            console.error(`Field ${key} is undefined`);
            return;
          }
        }
    
        await setDoc(userDocRef, sanitizedUserData);
        console.log("Document updated successfully");
      } else {
        console.log("User document doesn't exist");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError(error.message);
    }
    
    
    
  };

  const addADs = async (ad) => {
    try {
      const adsCollectionRef = collection(db, "advertisement");
  
      // استخدام Firebase لإنشاء ID تلقائي للوثيقة الجديدة
      const adDocRef = doc(adsCollectionRef); // Firebase يحدد ID جديد تلقائيًا هنا
  
      // إضافة الإعلان إلى قاعدة البيانات مع الـ ID التلقائي
      await setDoc(adDocRef, { ...ad, id: adDocRef.id });
  
      // تحديث إعلانات المستخدم
      await updateUserAds(ad, adDocRef.id);
    } catch (error) {
      setError(error.message);
    }
  };
  

  const updateADs = async ( adId,ad) => {
    try {
      adId = String(adId);
      const adDocRef = doc(db, "advertisement", adId);
      await setDoc(adDocRef, ad, { merge: true }); 
      
    } catch (error) {
      
      throw error;  
    }
  };



  const addHomeData = async (data) => {
    try {
      const websiteDataDocRef = doc(db, "websiteData", "HomePage");
      await setDoc(websiteDataDocRef, { ...data, updatedAt: new Date() });
    } catch (error) {
      setError(error.message);
    }
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

  const getAdvbyID = async (id) => {
    try {
      const adDocRef = doc(db, "advertisement", id);
      const adDoc = await getDoc(adDocRef);
      if (adDoc.exists()) {
        return adDoc.data();
      }
      return {};
    }
    catch (error) {
      setError(error.message);
      return {};
    }
  }

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

// const addUserNotification = async (notification, Uid) => {
//   try {
//     const userDocRef = doc(db, "users", Uid);

//     let userDoc;
//     try {
//       userDoc = await getDoc(userDocRef);
//     } catch (fetchError) {
//       console.error("Error fetching document:", fetchError);
//       return; // Stop further execution
//     }

//     if (userDoc.exists()) {
//       const user = userDoc.data();
//       const notifications = user.notifications || [];

//       const notificationWithId = { ...notification, id: crypto.randomUUID() };

//       notifications.push(notificationWithId);

//       await setDoc(userDocRef, { ...user, notifications });
//     } else {
//       console.error("User document does not exist or cannot be accessed");
//     }
//   } catch (error) {
//     console.error("Error in addUserNotification:", error);
//     setError(error.message);
//   }
// };

  
const addUserNotification = async (notification, Uid) => {
  try {
  //  console.log("Starting addUserNotification function");
  //  console.log("Notification:", notification, "Uid:", Uid);

    const userDocRef = doc(db, "users", Uid);
  //  console.log("Document reference created:", userDocRef);

    let userDoc;
    try {
      userDoc = await getDoc(userDocRef);
   //   console.log("Fetched document:", userDoc);
    } catch (fetchError) {
      console.error("Error fetching document:", fetchError);
      return; // Stop further execution
    }

    if (userDoc.exists()) {
      // console.log("User document exists");
      const user = userDoc.data();
  //    console.log("User data:", user);

      const notifications = user.notifications || [];
    //  console.log("Existing notifications:", notifications);

      const notificationWithId = { ...notification, id: crypto.randomUUID() };
      // console.log("New notification with ID:", notificationWithId);

      notifications.push(notificationWithId);
   //   console.log("Updated notifications:", notifications);

      await setDoc(userDocRef, { ...user, notifications });
      // console.log("Notification added successfully");
    } else {
      //   console.log("User document does not exist or cannot be accessed");
    }
  } catch (error) {
    console.error("Error in addUserNotification:", error);
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
        await setDoc(userDocRef, {
          ...user,
          notifications: updatedNotifications,
        });
    //    console.log("Notification marked as read.");
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error updating notification:", error.message);
    }
  };

  const SendNotification = async (notification) => {
    const { message, readed, time, stars } = notification;
    // console.log(stars);
    stars.forEach(async (user) => {
      await addUserNotification({ message, readed, time }, user.Uid);
    });
  };

const SendSignupNotification = async (notification, type) => {
 
  const { message, readed, time } = notification;

  // Map the roles for filtering
  const roleMap = {
    admin: "admin",
    user: "user",
    allAdmin: ["admin", "editor", "viewer"],
  };

  // Filter users based on role type
  const getUsersByRole = (type) => {
    if (type === "allAdmin") {
      return allUsers.filter((user) => roleMap.allAdmin.includes(user.role));
    }
    return allUsers.filter((user) => user.role === roleMap[type]);
  };

  // Get users based on the type of notification
  const users = getUsersByRole(type);

  

  // Send notification to each user
  for (const user of users) {
    try {      
      await addUserNotification({ message, readed, time }, user.Uid);
    } catch (error) {
      console.error(`Failed to add notification for user ${user.Uid}:`, error);
    }
  }
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


  const deleteAdFromDB = async (adId) => {
    try {
      adId = String(adId);
      const adDocRef = doc(db, "advertisement", adId);
      try {
        await deleteDoc(adDocRef);
      } catch (error) {
        // Handle error
      }
      await getAllAds();
    } catch (error) {
      // Handle error
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
        getUserAds,
        addADs,
        allUsers,
        updateUser,
        contact,
        updateContact ,
        getAllAds,
        updatePrivacy,
        getPrivacy,
        deleteUserFromDB,
        fetchContact,
        SendNotification,
        updateNotificationReaded,
        UpdateCurrentUserAds,
        SendSignupNotification,
        getFirestoreStats,
        getAllStarUsers,
        deleteAdFromDB,
        updateADs,
        getAdvbyID,
        
        error,
      }}
    >
      {!loading && children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;

export const useDashboard = () => useContext(DashboardContext);
