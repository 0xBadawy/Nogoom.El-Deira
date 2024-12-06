import React, { useEffect, useState } from "react";
import AddEmployees from "./AddEmployees";
import { useDashboard } from "../../Context/DashboardContext";
import { confirmAlert } from "react-confirm-alert";
import toast, { Toaster } from "react-hot-toast";

const Employees = () => {
  const [usersData, setUsersData] = useState([]);
  const { allUsers, updateUser,deleteUserFromDB } = useDashboard();
  const [area, setArea] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const users = allUsers;
    console.log("usAers", users);
    setUsersData(users);
  }, [allUsers]);

  const HandelUserDelete = () => {
 

     confirmAlert({
     title: "تأكيد الحذف",
     message: "هل متأكد من حذف هذا المستخدم؟",
     buttons: [
       {
         label: "نعم",
         onClick: () => {
             deleteUserFromDB(selectedUser);
    setSelectedUser(null);

           toast.success("تم حذف الموظف بنجاح");
         },
       },
       {
         label: "إلغاء",
         onClick: () => {
           toast.error("تم إلغاء العملية");
         },
       },      
     ],
   });


  }

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
                  (row.role != "star" && !row.isDeleted) && (
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
          {selectedUser && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">بيانات المستخدم</h3>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <span className="w-32">الاسم</span>
                    <span>
                      {usersData.find((user) => user.Uid === selectedUser).name}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="w-32">البريد الإلكتروني</span>
                    <span>
                      {
                        usersData.find((user) => user.Uid === selectedUser)
                          .email
                      }
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="w-32">اسم المستخدم </span>
                    <span>
                      {
                        usersData.find((user) => user.Uid === selectedUser)
                          .username
                      }
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="w-32">الوظيفة</span>
                    <span>
                      {usersData.find((user) => user.Uid === selectedUser)
                        .role == "editor"
                        ? "محرر"
                        : usersData.find((user) => user.Uid === selectedUser)
                            .role == "admin"
                        ? "مدير"
                        : "مشاهد"}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="w-32">رقم الهاتف</span>
                    <span>
                      {
                        usersData.find((user) => user.Uid === selectedUser)
                          .phone
                      }
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <span className="w-32"> تاريخ انشاء الحساب </span>
                    <span>
                      {new Date(
                        usersData.find(
                          (user) => user.Uid === selectedUser
                        ).createdAt
                      ).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="w-32"> تاريخ أخر ظهور </span>
                    <span>
                      {new Date(
                        usersData.find(
                          (user) => user.Uid === selectedUser
                        ).lastSeen
                      ).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={HandelUserDelete}
                >
                  حذف المستخدم
                </button>
              </div>
            </div>
        </div>
          )}
      </div>
            <Toaster position="top-center" reverseOrder={false} />

    </div>
  );
};

export default Employees;
