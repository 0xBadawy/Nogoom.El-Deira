import {
  FaFacebook,
  FaTwitter,
  FaSnapchat,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import FormField from "./FormField";

const SocialMediaInputs = ({ register, errors }) => {
  const platforms = [
    {
      id: "FaceBook",
      label: "Facebook",
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      id: "Twitter",
      label: "Twitter",
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      id: "Snapchat",
      label: "Snapchat",
      icon: <FaSnapchat className="text-yellow-500" />,
    },
    {
      id: "Tiktok",
      label: "TikTok",
      icon: <FaTiktok className="text-black" />,
    },
    {
      id: "Instagram",
      label: "Instagram",
      icon: <FaInstagram className="text-pink-500" />,
    },
  ];

  const PostsLinl = [
    {
      id: "FaceBookLink",
      label: "ربط مشاركة الفيسبوك",
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      id: "TwitterLink",
      label: "ربط مشاركة تويتر",
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      id: "SnapchatLink",
      label: "ربط مشاركة سناب شات",
      icon: <FaSnapchat className="text-yellow-500" />,
    },
    {
      id: "TiktokLink",
      label: "ربط مشاركة تيك توك",
      icon: <FaTiktok className="text-black" />,
    },
    {
      id: "InstagramLink",
      label: "ربط مشاركة انستجرام",
      icon: <FaInstagram className="text-pink-500" />,
    },
  ];

  return (
    <>
      <div>
        <h4 className="text-xl font-bold text-center mb-4">
          روابط حسابات السوشيال ميديا
        </h4>
        {platforms.map(({ id, label, icon }) => (
          <FormField
            key={id}
            id={id}
            label={
              <span className="flex  items-center gap-2">
                {icon} {label}
              </span>
            }
            register={register}
            errors={errors}
          />
        ))}

        <h4 className="text-xl font-bold text-center mb-4">
          روابط مشاركات السوشيال ميديا
        </h4>
        {PostsLinl.map(({ id, label, icon }) => (
          <FormField
            key={id}
            id={id}
            label={
              <span className="flex  items-center gap-2">
                {icon} {label}
              </span>
            }
            register={register}
            errors={errors}
          />
        ))}
      </div>
    </>
  );
};

export default SocialMediaInputs;
