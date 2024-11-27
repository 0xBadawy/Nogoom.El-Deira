// Users.js
import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails"; // استيراد المكون الجديد
import { useDashboard } from "../../Context/DashboardContext";

const Users = () => {
  const [usersData, setUsersData] = useState([
    {
      Uid: "123456789",
      name: "محمد أحمد",
      email: "mohamed.ahmed@example.com",
      phone: "+201001234567",
      govern: "القاهرة",
      area: ["القاهرة", "الجيزة"],
      balance: 1500,
      createdAt: "2024-11-01T12:00:00Z",
      facebook: "محمد أحمد",
      facebookLink: "https://www.facebook.com/mohamed.ahmed",
      iban: "EG12345678901234567890123456",
      instagram: "mohamed_ahmed",
      instagramLink: "https://www.instagram.com/mohamed_ahmed",
      snapchat: "mohamedSnap",
      snapchatLink: "https://www.snapchat.com/add/mohamedSnap",
      tiktok: "mohamedTikTok",
      tiktokLink: "https://www.tiktok.com/@mohamedTikTok",
      twitter: "mohamedTwitter",
      twitterLink: "https://twitter.com/mohamedTwitter",
      privacyPolicy: true,
      verified: true,
      verifiedBy: "admin",
      updatedAt: "2024-11-27T11:00:00Z",
      address: "شارع التحرير، القاهرة، مصر",
      profilePicture: "https://example.com/profile.jpg",
      bio: "مبرمج ومطور ويب شغوف بالتقنية.",
      dateOfBirth: "2000-05-15",
      gender: "Male",
      preferredLanguage: "Arabic",
      lastLogin: "2024-11-26T20:30:00Z",
      accountStatus: "Active",
      accountType: "Premium",
      notificationSettings: {
        email: true,
        sms: true,
        push: true,
      },
      referralCode: "REF12345",
      referredBy: "REF54321",
      permissions: ["User", "Editor"],
    },
  ]);
  const { allUsers, updateUser } = useDashboard();
  const [area, setArea] = useState("");

  useEffect(() => {
    const users = allUsers;
    console.log("users", users);
    setUsersData(users);
  }, [allUsers]);

  const Area = (areas) => {
    let A = "";
    return areas ? areas.join(",") : A;
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = (updatedUser) => {


    setUsersData((prevState) =>
      prevState.map((user) =>
        user.Uid === updatedUser.Uid ? updatedUser : user
      )
    );

    updateUser(updatedUser);


    console.log(updatedUser);
  };

  return (
    <div className="grow p-8 dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Users List</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              {[
                "الاسم",
                "تاريخ الإنشاء",
                "البريد الإلكتروني",
                "الهاتف",
                "الآيبان",
                "المنطقة",
                "المحافظة",
              ].map((column, index) => (
                <th key={index} className="py-2 px-4 text-right cursor-pointer">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData.map((row, index) => (
              <tr
                key={index}
                onClick={() => {
                  setSelectedUser(row.Uid);
                }}
                className={`border-b ${
                  row.Uid === selectedUser ? "bg-gray-900" : ""
                }`}
              >
                <td className="py-2 px-4">{row.name}</td>
                <td className="py-2 px-4">{row.createdAt}</td>
                <td className="py-2 px-4">{row.email}</td>
                <td className="py-2 px-4">{row.phone}</td>
                <td className="py-2 px-4">{row.iban}</td>
                <td className="py-2 px-4">{row.govern}</td>
                <td className="py-2 px-4">{Area(row.area)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* عرض وتعديل بيانات المستخدم */}
      {selectedUser && (
        <UserDetails
          selectedUserUid={selectedUser}
          usersData={usersData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Users;
