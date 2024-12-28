import { createContext, useContext } from "react";
const WebsiteDataContext = createContext();

const WebsiteDataProvider = ({ children }) => {

  const HomePage = {
    links: {
      faceBook: "https://www.facebook.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      linkedIn: "https://www.linkedin.com",
      snapchat: "https://www.snapchat.com",
      tikTok: "https://www.tiktok.com",
      youtube: "https://www.youtube.com",
    },
    contact: {
      phone: "123456789",
      email: "website@web.com",
      whatsapp: "123456789",
    },
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

  // update UpdateHomePageData in db
  // const UpdateHomePageData = async (data) => {
    



  return (
    <WebsiteDataContext.Provider value={{ HomePage }}>
      {children}
    </WebsiteDataContext.Provider>
  );
};

export default WebsiteDataProvider;

export const useWebsiteData = () => {
  return useContext(WebsiteDataContext);
};
