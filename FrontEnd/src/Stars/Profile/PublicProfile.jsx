import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaLink,
  FaYoutube,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { formatDateTime } from "../../hooks/formatDate";

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
      console.table(data);
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
    { label: "المنطقة", value: userData?.address?.area },
    { label: "المحافظات", value: userData?.address?.govern.join(", ") },
    {
      label: "تم التحقق",
      value: userData.verified ? "نعم" : "حسابك قيد المراجعة",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-bold text-indigo-900">
            بياناتى
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex md:flex-row flex-col justify-between items-center sm:items-start mb-8">
          <img
            className="object-cover w-32 h-32 rounded-full ring-4 ring-indigo-300"
            src={
              userData?.profileImage ||
              "https://avatar.iran.liara.run/public/30"
            }
            alt="Profile"
          />
          {/* <div className="flex mt-10 md:-mt-5 flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
            <p className="text-2xl font-semibold text-green-800 mb-2">
              رصيد الحساب
            </p>
            <p className="text-5xl font-bold text-green-700">
              {new Intl.NumberFormat("en-SA", {
                style: "currency",
                currency: "SAR",
                minimumFractionDigits: 2,
              }).format(userData?.balance || 0)}
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm text-green-600">
                آخر تحديث: {formatDateTime(userData?.updatedAt)}
              </span>
              <svg
                className="w-4 h-4 text-green-600 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UserDataInput.map((item, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-indigo-900">
                {item.label}
              </label>
              <div className="p-2 rounded-lg bg-gray-100 text-gray-800 min-h-10 overflow-auto">
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
                      <span className=" overflow-a uto">
                        {item.link?.length > 30
                          ? `${item.link.slice(0, 20)}...`
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
