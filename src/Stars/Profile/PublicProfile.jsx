

import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaLink,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PublicProfile = () => {
  const { getUserData } = useAuth();
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
      setUserData(data);
    };
    fetchData();
  }, [getUserData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const UserDataInput = [
    { label: "الاسم الكامل", value: userData.name },
    { label: "عنوان البريد الإلكتروني", value: userData.email },
    { label: "رقم الهاتف", value: userData.phone },
    { label: "تاريخ إنشاء الحساب", value: formatDate(userData.createdAt) },
    { label: "المنطقة", value: userData?.govern },
    { label: "المحافظات", value: userData.area?.join(", ") },
    { label: "رصيد الحساب", value: `$${userData.balance}` },
    { label: "رقم الحساب الدولي (IBAN)", value: userData.iban },
    { label: "تم التحقق", value: userData.verified ? "نعم" : "لا" },
  ];

  const SocialMedia = [
    {
      icon: FaFacebook,
      label: "Facebook",
      value: userData.facebook,
      link: userData.facebookLink,
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      value: userData.instagram,
      link: userData.instagramLink,
    },
    {
      icon: FaSnapchat,
      label: "Snapchat",
      value: userData.snapchat,
      link: userData.snapchatLink,
    },
    {
      icon: FaTiktok,
      label: "Tiktok",
      value: userData.tiktok,
      link: userData.tiktokLink,
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      value: userData.twitter,
      link: userData.twitterLink,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">
          الملف الشخصي العام
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600">
          هذه هي صفحة الملف الشخصي العام الخاصة بك حيث يمكنك عرض تفاصيلك.
        </p>
        <div className="flex flex-col items-center sm:items-start mb-8">
          <img
            className="object-cover w-32 h-32 rounded-full ring-4 ring-indigo-300"
            src={userData?.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UserDataInput.map((item, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-indigo-900">
                {item.label}
              </label>
              <div className="p-2 rounded-lg bg-gray-100 text-gray-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-semibold text-indigo-900 mt-8 mb-4">
          وسائل التواصل الاجتماعي
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SocialMedia.map((item, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-indigo-900">
                {item.label}
              </label>
              <div className="p-2 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  <item.icon className="mr-2" />
                  <span>{item.value?.slice(0, 20)}...</span>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 hover:text-indigo-900"
                  >
                    <FaLink />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicProfile;

