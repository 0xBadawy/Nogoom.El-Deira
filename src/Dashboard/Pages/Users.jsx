import React, { useEffect, useState } from "react";
import {
  FaMale,
  FaFemale,
  FaUserPlus,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

const Users = () => {
  const [usersData, setUsersData] = useState([
    {
      name: "أحمد علي",
      createdAt: "2024-11-25",
      email: "ahmed@example.com",
      phone: "0123456789",
      iban: "SA1234567890123456789012",
      area: "مكة",
      govern: ["اسم1", "اسم2", "اسم3"], 
      facebook: "ahmed_ali",
      tiktok: "ahmed_tiktok",
      instagram: "ahmed_ig",
      snapchat: "ahmed_snap",
      facebookLink: "https://facebook.com/ahmed_ali",
      instagramLink: "https://instagram.com/ahmed_ig",
      snapchatLink: "https://snapchat.com/ahmed_snap",
      tiktokLink: "https://tiktok.com/ahmed_tiktok",
      twitterLink: "https://twitter.com/ahmed_ali",
      privacyPolicy: "https://example.com/privacy",
      imageProfile: "https://example.com/ahmed_profile.jpg",
    },
  ]);

  const [sortConfig, setSortConfig] = useState(null);



  return (
    <div className="grow p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Users List</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b ">
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
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{row.name}</td>
                <td className="py-2 px-4">{row.createdAt}</td>
                <td className="py-2 px-4">{row.email}</td>
                <td className="py-2 px-4">{row.phone}</td>
                <td className="py-2 px-4">{row.iban}</td>
                <td className="py-2 px-4">{row.area}</td>
                <td className="py-2 px-4">{row.govern.join(", ")}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
