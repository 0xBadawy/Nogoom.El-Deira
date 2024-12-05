import React, { useEffect, useState } from "react";
import AddEmployees from "./AddEmployees";
import { useDashboard } from "../../Context/DashboardContext";

const Employees = () => {
  const [usersData, setUsersData] = useState([]);
  const { allUsers, updateUser } = useDashboard();
  const [area, setArea] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const users = allUsers;
    console.log("usAers", users);
    setUsersData(users);
  }, [allUsers]);

  return (
    <div className="grow md:p-8 p-3 dark:bg-gray-800">
      <h2 className="text-2xl w-full mb-4 text-">صفحة ادارة الموظفين </h2>

      <div>
        <AddEmployees />
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">قائمة المستخدمين </h3>

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
                <th className="py-2 px-4 text-right ">الوظيفية</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(
                (row, index) =>
                  row.role != "star" && (
                    <tr
                      key={index}
                      onClick={() => setSelectedUser(row.Uid)}
                      className={`border-b ${
                        row.Uid === selectedUser ? "bg-gray-200" : ""
                      }`}
                    >
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4 hidden md:table-cell">
                        {row.email}
                      </td>
                      <td className="py-2 px-4 hidden md:table-cell">
                        {new Date(row.createdAt).toLocaleDateString("en-GB")}
                      </td>

                      <td className="py-2 px-4 ">
                        {row.role === "admin"
                          ? "مدير"
                          : row.role === "editor"
                          ? "محرر"
                          : "مشاهد"}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
