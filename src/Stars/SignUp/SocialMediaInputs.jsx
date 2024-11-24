import {
  FaFacebook,
  FaTwitter,
  FaSnapchat,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import FormField from "./FormField";

const SocialMediaInputs = ({ register }) => {
  const platforms = [
    {
      id: "facebook",
      label: "Facebook",
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      id: "twitter",
      label: "Twitter",
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      id: "snapchat",
      label: "Snapchat",
      icon: <FaSnapchat className="text-yellow-500" />,
    },
    {
      id: "tiktok",
      label: "TikTok",
      icon: <FaTiktok className="text-black" />,
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <FaInstagram className="text-pink-500" />,
    },
  ];

  const postLinks = [
    {
      id: "facebookLink",
      label: "ربط مشاركة الفيسبوك",
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      id: "twitterLink",
      label: "ربط مشاركة تويتر",
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      id: "snapchatLink",
      label: "ربط مشاركة سناب شات",
      icon: <FaSnapchat className="text-yellow-500" />,
    },
    {
      id: "tiktokLink",
      label: "ربط مشاركة تيك توك",
      icon: <FaTiktok className="text-black" />,
    },
    {
      id: "instagramLink",
      label: "ربط مشاركة انستجرام",
      icon: <FaInstagram className="text-pink-500" />,
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
      <h4 className="text-xl font-bold text-center mb-4">
        روابط مشاركات السوشيال ميديا
      </h4>
      {postLinks.map(({ id, label, icon }) => (
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
