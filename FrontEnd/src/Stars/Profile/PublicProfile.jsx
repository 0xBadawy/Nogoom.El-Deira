import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaLink,
  FaYoutube 
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

const PublicProfile = () => {
  const { user } = useAuth();
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
      const data = await user;
      setUserData(data);
      console.log(data);
    };
    fetchData();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const UserDataInput = [
    { label: " اسم الشهرة او الحساب ", value: userData?.name },
    { label: "عنوان البريد الإلكتروني", value: userData?.email },
    { label: "رقم الهاتف", value: userData?.phone },
    { label: "تاريخ إنشاء الحساب", value: formatDate(userData?.createdAt) },
    { label: "المنطقة", value: userData.address?.area },
    { label: "المحافظات", value: userData.address?.govern.join(", ") },
    { label: "رصيد الحساب", value: `$${userData.balance}` },
    { label: "تم التحقق", value: userData.verified ? "نعم" : "لا" },
  ];


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">
          بياناتى
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center sm:items-start mb-8">
          <img
            className="object-cover w-32 h-32 rounded-full ring-4 ring-indigo-300"
            src={
              userData?.profileImage ||
              "https://avatar.iran.liara.run/public/30"
            }
            alt="Profile"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UserDataInput.map((item, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-indigo-900">
                {item.label}
              </label>
              <div className="p-2 rounded-lg bg-gray-100 text-gray-800 min-h-10">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-semibold text-indigo-900 mt-8 mb-4">
          التواصل الاجتماعي
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData?.social?.map(
            (item, index) =>
              (item.link || item.link) && (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-indigo-900">
                    {/* Optionally display item label here */}
                  </label>
                  <div className="p-2 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Optional icon */}
                      <span>
                        {item.link?.length > 30
                          ? `${item.link.slice(0, 30)}...`
                          : item.link}
                      </span>
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit link for ${item.value}`}
                        className="text-indigo-700 hover:text-indigo-900 px-2"
                      >
                        <FaLink />
                      </a>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicProfile;
