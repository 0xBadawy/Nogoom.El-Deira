import { useState } from "react";
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
    { id: "facebook", icon: <FaFacebook className="text-blue-600" /> },
    { id: "twitter", icon: <FaTwitter className="text-blue-400" /> },
    { id: "snapchat", icon: <FaSnapchat className="text-yellow-500" /> },
    { id: "tiktok", icon: <FaTiktok className="text-black" /> },
    { id: "instagram", icon: <FaInstagram className="text-pink-500" /> },
    { id: "youtube", icon: <FaYoutube className="text-red-600" /> },
  ];

  const [visibleInputs, setVisibleInputs] = useState(1);

  const handleAddInput = (event) => {
    event.preventDefault();
    if (visibleInputs < platforms.length) {
      setVisibleInputs((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold text-center mb-4">
       روابط  التواصل الاجتماعى
      </h4>
      {platforms.slice(0, visibleInputs).map(({ id, icon }) => (
        <FormField
          key={id}
          id={id}
          type={"url"}
          label={
            <span className="flex items-center gap-2">
              {/* {icon} */}
            </span>
          }
          register={register}
        />
      ))}

      {visibleInputs < platforms.length && (
        <button
          onClick={handleAddInput}
          type="button"
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
        >
          اضف المزيد +
        </button>
      )}
    </div>
  );
};

export default SocialMediaInputs;
