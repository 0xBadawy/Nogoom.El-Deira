// Users.js
import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails"; // استيراد المكون الجديد
import { useDashboard } from "../../Context/DashboardContext";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const { allUsers, updateUser } = useDashboard();
  const [area, setArea] = useState("");

  useEffect(() => {
    const users = allUsers;
    console.log("users", users);
    setUsersData(users);
  }, [allUsers]);

  const Area = (areas) => {
    if (!areas) return "";
    return Array.isArray(areas) ? areas.join(", ") : areas;
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
    <div className="grow md:p-8 p-2  dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">النجوم</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">بيانات النجوم </h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-right">الاسم</th>
              <th className="py-2 px-4 text-right hidden md:table-cell">
                البريد الإلكتروني
              </th>
              <th className="py-2 px-4 text-right hidden md:table-cell">
                تاريخ الإنشاء
              </th>
              <th className="py-2 px-4 text-right hidden md:table-cell">
                الهاتف
              </th>
              <th className="py-2 px-4 text-right hidden md:table-cell">
                الآيبان
              </th>
              <th className="py-2 px-4 text-right hidden md:table-cell">
                المنطقة
              </th>
              <th className="py-2 px-4 text-right hidden md:table-cell">
                المحافظة
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((row, index) => (
              row.role === "star" && (
              <tr
                key={index}
                onClick={() => setSelectedUser(row.Uid)}
                className={`border-b ${
                  row.Uid === selectedUser ? "bg-gray-200" : ""
                }`}
              >
                <td className="py-2 px-4">{row.name}</td>
                <td className="py-2 px-4 hidden md:table-cell">{row.email}</td>
                <td className="py-2 px-4 hidden md:table-cell">
                  {new Date(row.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="py-2 px-4 hidden md:table-cell">{row.phone}</td>
                <td className="py-2 px-4 hidden md:table-cell">{row.iban}</td>
                <td className="py-2 px-4 hidden md:table-cell">{row.govern}</td>
                <td className="py-2 px-4 hidden md:table-cell">
                  {Area(row.area)}
                </td>
              </tr>
              )
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
