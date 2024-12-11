import {
  FaFacebook,
  FaTwitter,
  FaSnapchat,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import FormField from "./FormField";

const SocialMediaInputs = ({ register }) => {
 const platforms = [
   {
     id: "facebook",
     label: "فيسبوك",
     icon: <FaFacebook className="text-blue-600" />,
   },
   {
     id: "twitter",
     label: "تويتر",
     icon: <FaTwitter className="text-blue-400" />,
   },
   {
     id: "snapchat",
     label: "سناب شات",
     icon: <FaSnapchat className="text-yellow-500" />,
   },
   {
     id: "tiktok",
     label: "تيك توك",
     icon: <FaTiktok className="text-black" />,
   },
   {
     id: "instagram",
     label: "إنستغرام",
     icon: <FaInstagram className="text-pink-500" />,
   },
   {
     id: "youtube",
     label: "يوتيوب",
     icon: <FaYoutube className="text-red-600" />,
   },
 ];


  

  return (
    <div>
      <h4 className="text-xl font-bold text-center mb-4">
        روابط حسابات السوشيال ميديا
      </h4>
      {platforms.map(({ id, label, icon }) => (
        <FormField
          key={id}
          id={id}
          label={
            <span className="flex items-center gap-2">
              {icon} {label}
            </span>
          }
          register={register}
        />
      ))}      
    </div>
  );
};

export default SocialMediaInputs;
