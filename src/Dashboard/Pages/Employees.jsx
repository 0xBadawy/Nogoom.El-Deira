import React, { useEffect, useState } from "react";
import AddEmployees from "./AddEmployees";
import { useDashboard } from "../../Context/DashboardContext";
import { confirmAlert } from "react-confirm-alert";
// import toast, { Toaster } from "react-hot-toast";
import EditEmployees from "./EditEmployees";
import ConfirmDialog from "../../Components/ConfirmDialog";
import { toast } from "sonner";

const Employees = () => {
  const [usersData, setUsersData] = useState([]);
  const { allUsers, updateUser, deleteUserFromDB } = useDashboard();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [displayEditForm, setDisplayEditForm] = useState(false);

  useEffect(() => {
    const users = allUsers;
    setUsersData(users);
    sortData();
  }, [allUsers]);

  const sortData = () => {
    setUsersData((prev) =>
      prev.sort((a, b) => {
        return b.lastSeen - a.lastSeen;
      })
    );
  };

  const afterUpdate = () => {
    setDisplayEditForm(false);
    setSelectedUser(null);
  };

  const HandelUserUpdateData = () => {
    const user = usersData.find((user) => user.Uid === selectedUser);
    setSelectedUserData(user);
    setDisplayEditForm(true);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteUser = (user) => {
    setIsDialogOpen(true); // Open the dialog
  };
  const confirmDelete = () => {
    deleteUserFromDB(selectedUser); // Perform the deletion
    setSelectedUser(null);
    sortData();
    toast.success("تم حذف الموظف بنجاح", {
      description: new Date().toLocaleString(),
    });

    setIsDialogOpen(false); // Close the dialog
  };
  const cancelDelete = () => {
    setIsDialogOpen(false); // Close the dialog
    toast.error("تم إلغاء العملية", {
      description: new Date().toLocaleString(),
    });
  };

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
                <th className="py-2 px-4 text-right  md:table-cell">
                  اخر ظهور{" "}
                </th>

                <th className="py-2 px-4 text-right ">الوظيفية</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map(
                (row, index) =>
                  row.role != "star" &&
                  !row.isDeleted && (
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
                      <td className="py-2 px-4  md:table-cell">
                        <p>{row?.lastSeen?.toDate().toLocaleString()}</p>
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
                    <span className="w-32">تاريخ أخر ظهور</span>
                    <span>
                      {(() => {
                        const user = usersData.find(
                          (user) => user.Uid === selectedUser
                        );
                        const lastSeen = user?.lastSeen;

                        if (!lastSeen) return "غير متاح";

                        // Handle Firebase Timestamp, raw number, or Date
                        const date =
                          lastSeen.toDate?.() || // If it's a Firebase Timestamp
                          (typeof lastSeen === "number"
                            ? new Date(lastSeen)
                            : lastSeen); // If it's a raw number or already a Date

                        return date.toLocaleString();
                      })()}
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="w-32">تاريخ انشاء الحساب</span>
                    <span>
                      {(() => {
                        const user = usersData.find(
                          (user) => user.Uid === selectedUser
                        );
                        const createdAt = user?.createdAt;

                        if (!createdAt) return "غير متاح";

                        // Handle Firebase Timestamp, raw number, or Date
                        const date =
                          createdAt.toDate?.() || // If it's a Firebase Timestamp
                          (typeof createdAt === "number"
                            ? new Date(createdAt)
                            : createdAt); // If it's a raw number or already a Date

                        return date.toLocaleString();
                      })()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDeleteUser(selectedUser)}
                >
                  حذف المستخدم
                </button>

                <ConfirmDialog
                  title="تأكيد الحذف"
                  message="هل متأكد من حذف هذا المستخدم؟"
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)} // To close the dialog directly
                  onConfirm={confirmDelete} // On confirm action
                  onCancel={cancelDelete} // On cancel action
                />

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={HandelUserUpdateData}
                >
                  تعديل المستخدم
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${displayEditForm ? "" : "hidden"}`}>
        <EditEmployees
          userData={selectedUserData}
          onUserUpdated={afterUpdate}
        />
        ;
      </div>

      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
};

export default Employees;
