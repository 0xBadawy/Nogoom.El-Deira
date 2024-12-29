import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaSnapchatGhost, FaTiktok } from 'react-icons/fa';


const SocialMediaIcons = () => {
  


  

  const [SocialMediaLLinks, setSocialMediaLinks] = useState([
    {
      id: 1,
      link: "https://www.facebook.com",
      icon: <FaFacebookF size={16} />,
      color: "text-white",
    },
    {
      id: 2,
      link: "https://x.com",
      icon: <FaTwitter size={16} />,
      color: "text-white",
    },
    {
      id: 3,
      link: "https://www.instagram.com",
      icon: <FaInstagram size={16} />,
      color: "text-white",
    },
    {
      id: 4,
      link: "https://www.snapchat.com",
      icon: <FaSnapchatGhost size={16} />,
      color: "text-white",
    },
    {
      id: 5,
      link: "https://www.tiktok.com",
      icon: <FaTiktok size={16} />,
      color: "text-white",
    },
  ]);

  return (
    <div className="flex flex-col items-center">
      <p>تواصل معنا</p>

      <div className="flex gap-4 mt-4">
        {SocialMediaLLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            className={`text-2xl ${link.color}`}
            target="_blank"
            rel="noreferrer"
          >
            {link.icon}
          </a>
        ))}

    </div>
    </div>
  );
};

export default SocialMediaIcons;
