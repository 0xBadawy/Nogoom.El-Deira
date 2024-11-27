import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaLink,
  FaRegAddressCard,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";

const PublicProfile = () => {
 const {getUserData} = useAuth();

const [userData, setUserData] = useState({
  name: "",
  email: "",
  phone: "",
  area: [],
  govern: "",
  balance: 0,
  createdAt: "",
  facebook: "",
  facebookLink: "",
  iban: "",
  instagram: "",
  instagramLink: "",
  snapchat: "",
  snapchatLink: "",
  tiktok: "",
  tiktokLink: "",
  twitter: "",
  twitterLink: "",
  privacyPolicy: false,
  verified: false,
  verifiedBy: "",
});

useEffect(() => {
    const fetchData = async () => {
        const data = await getUserData();
        console.log(data);
        setUserData(data);


    };
    fetchData();
}, [ getUserData]);




  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const UserDataInput = [
    {
      label: "الاسم الكامل",
      value: userData.name,
    },
    {
      label: "عنوان البريد الإلكتروني",
      value: userData.email,
    },
    {
      label: "رقم الهاتف",
      value: userData.phone,
    },
    {
      label: "تاريخ إنشاء الحساب",
      value: formatDate(userData.createdAt),
    },
    {
      label: "المنظقة",
      value: userData.govern,
    },
    {
      label: "المحافظات",
      value: userData.area.join(", "),
    },
    {
      label: "رصيد الحساب",
      value: `$${userData.balance}`,
    },

    {
      label: "رقم الحساب الدولي (IBAN)",
      value: userData.iban,
    },
    {
      label: "تم التحقق",
      value: userData.verified ? "نعم" : "لا",
    },
  ];

  const SocialMedia = [
    {
      icon: <FaFacebook />,
      label: "Facebook",
      value: userData.facebook,
      link: userData.facebookLink,
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      value: userData.instagram,
      link: userData.instagramLink,
    },
    {
      icon: <FaSnapchat />,
      label: "Snapchat",
      value: userData.snapchat,
      link: userData.snapchatLink,
    },
    {
      icon: <FaTiktok />,
      label: "Tiktok",
      value: userData.tiktok,
      link: userData.tiktokLink,
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      value: userData.twitter,
      link: userData.twitterLink,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-900">الملف الشخصي العام</h2>
      <p className="my-4 text-gray-600">
        هذه هي صفحة الملف الشخصي العام الخاصة بك حيث يمكنك عرض تفاصيلك.
      </p>
      <div className="flex flex-col items-center sm:items-start">
        <img
          className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
          src={userData?.profilePicture}
          alt="Profile"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {UserDataInput.map((item, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-indigo-900">
              {item.label}
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SocialMedia.map((item, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-indigo-900">
              {item.label}
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100 flex items-center justify-between">
              <div>
                {item.icon}
                <span className="ml-2">
                  {item.value.slice(0, 40) + "...."}
                </span>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-700 hover:text-indigo-900"
              >
                <FaLink />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
