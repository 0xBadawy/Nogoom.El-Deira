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

  const HomePage = {
    Herosection: {
      title: "إعلانات تصل إلى جمهورك الحقيقي!",
      subTitle:
        "اختر المؤثرين المناسبين وحقق نتائج حقيقية بدون تكلفة حملات ضخمة.",
      button: "إبدأ الآن",
      buttonLink: "/signup",
    },
    SecondSection: {
      title:
        "ضاعف انتشارك! أعلن معنا مع أبرز مشاهير محافظة الحاجر وأوصل رسالتك إلى الجمهور المستهدف",
      subTitle:
        "أعلن معنا وكن جزءًا من عالم مشاهير محافظة الحاجر حيث يتصدر إعلانك المشهد ويصل إلى آلاف المتابعين في منطقتك. بفضل قاعدة جماهيرية واسعة وتأثير قوي، ستتمكن من تعزيز علامتك التجارية وتحقيق أهدافك التسويقية. انضم الآن واكتشف قوة الإعلان الموجه والمستهدف!",
    },
  };

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
      }
    } catch (error) {
      setError(error.message);
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
  console.log("Auth state changed", currentUser);
}, [currentUser]);



  return (
    <DashboardContext.Provider
      value={{
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
      }}
    >
      {!loading && children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;

export const useDashboard = () => useContext(DashboardContext);
