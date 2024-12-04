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
  const [contact,setContact] = useState({});
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

  const getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setAllUsers(users);
  };

 
  const updateUser = async (user) => {
    const userDocRef = doc(db, "users", user.Uid);
    await setDoc(userDocRef, user);
    getAllUsers();
  };

  const fetchContact = async () => {
    const contactDocRef = doc(db, "websiteData", "contact");
    const contactDoc = await getDoc(contactDocRef);
    setContact(contactDoc.data());
  };

  const updateContact = async (contact) => {
    const contactDocRef = doc(db, "websiteData", "contact");
    await setDoc(contactDocRef, contact);
    fetchContact();
  };

  const updateUserAds = async (users,adId) => {
    const user = users.stars;
    user.forEach(async (star) => {
      const userDocRef = doc(db, "users", star.Uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const ads = userData.ads;
      ads.push(adId);
      await setDoc(userDocRef, { ...userData, ads
      });

    });    
  };






  const addADs = async (ad) => {
    try {
      const adsCollectionRef = collection(db, "advertisement");
      const querySnapshot = await getDocs(adsCollectionRef);
      const adCount = querySnapshot.size;
      const newAdId = adCount + 1;
      const adDocRef = doc(db, "advertisement", newAdId.toString());
      await setDoc(adDocRef, { ...ad, id: newAdId });
      updateUserAds(ad,newAdId);
    } catch (error) {
      setError(error.message);
    }
  };

  const getAllAds = async () => {
    const ads = [];
    const querySnapshot = await getDocs(collection(db, "advertisement"));
    querySnapshot.forEach((doc) => {
      ads.push(doc.data());
    });
    return ads;
  };




  
 

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      getAllUsers();
      setLoading(false);
      fetchContact();
    });
    return unsubscribe;
  }, []);




  return (
    <DashboardContext.Provider
      value={{
        currentUser,
        addADs,    
        allUsers,  
        updateUser,
        contact,
        updateContact,
        error,
        getAllAds,
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
