import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaLink,
  FaRegAddressCard,
} from "react-icons/fa";

const PublicProfile = () => {
  const userData = {
    name: "Odysseus Malone",
    email: "bobymapu@mailinator.com",
    phone: "+1 (442) 871-9135",
    area: ["New York", "California"], // Example area as an array
    balance: 1000.5, // Example balance
    createdAt: "2024-11-24T10:59:30.529Z",
    facebook: "Soluta in nihil quid",
    facebookLink: "https://facebook.com/example",
    iban: "Voluptas fugiat vol",
    instagram: "Rem enim proident v",
    instagramLink: "https://instagram.com/example",
    snapchat: "Rerum est neque minu",
    snapchatLink: "https://snapchat.com/example",
    tiktok: "Similique provident",
    tiktokLink: "https://tiktok.com/example",
    twitter: "Ut repudiandae imped",
    twitterLink: "https://twitter.com/example",
    privacyPolicy: true,
    verified: false,
    verifiedBy: "",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-900">Public Profile</h2>
      <p className="mt-4 text-gray-600">
        This is your public profile page where you can view your details.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <img
            className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
          />
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-indigo-900">
              Full Name
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              {userData.name}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-indigo-900">
              Email Address
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              {userData.email}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-indigo-900">
              Phone Number
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              {userData.phone}
            </div>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-indigo-900">
              Area
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              {userData.area.join(", ")}
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className="block text-sm font-medium text-indigo-900">
              Account Balance
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              ${userData.balance}
            </div>
          </div>

          {/* Created At */}
          <div>
            <label className="block text-sm font-medium text-indigo-900">
              Account Created At
            </label>
            <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
              {formatDate(userData.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center space-x-2">
          <FaFacebook className="text-indigo-600" />
          <a
            href={userData.facebookLink}
            className="text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.facebook}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <FaInstagram className="text-indigo-600" />
          <a
            href={userData.instagramLink}
            className="text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.instagram}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <FaSnapchat className="text-indigo-600" />
          <a
            href={userData.snapchatLink}
            className="text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.snapchat}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <FaTiktok className="text-indigo-600" />
          <a
            href={userData.tiktokLink}
            className="text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.tiktok}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <FaTwitter className="text-indigo-600" />
          <a
            href={userData.twitterLink}
            className="text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.twitter}
          </a>
        </div>
      </div>

      {/* IBAN */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-indigo-900">
          IBAN
        </label>
        <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
          {userData.iban}
        </div>
      </div>

      {/* Verified Status */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-indigo-900">
          Verified
        </label>
        <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
          {userData.verified ? "Yes" : "No"}
        </div>
      </div>

      {/* Verified By */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-indigo-900">
          Verified By
        </label>
        <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
          {userData.verifiedBy || "N/A"}
        </div>
      </div>

      {/* Privacy Policy Accepted */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-indigo-900">
          Privacy Policy Accepted
        </label>
        <div className="mt-2 p-2 w-full border border-indigo-300 rounded-lg bg-gray-100">
          {userData.privacyPolicy ? "Accepted" : "Not Accepted"}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
