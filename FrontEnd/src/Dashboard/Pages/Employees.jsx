import React, { useEffect, useState } from "react";
import AddEmployees from "./AddEmployees";
import { useDashboard } from "../../Context/DashboardContext";
import ConfirmDialog from "../../Components/ConfirmDialog";
import { toast } from "sonner";
import axiosInstance from "../../Configuration/axiosInstance";
import EditEmployees from "./EditEmployees";
import LastSeenAgo from "../../hooks/LastSeen";

const Employees = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const { deleteUserFromDB } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/all_users_admin");
        setUsersData(response.data.data);
      } catch (error) {
        toast.error("فشل في تحميل البيانات");
      }
    };
    fetchData();
  }, []);

  const sortData = () => {
    setUsersData((prev) => [...prev].sort((a, b) => b.lastSeen - a.lastSeen));
  };

  const handleUserSelection = (userId) => {
    setSelectedUser(userId);
  };

  const handleDeleteUser = () => {
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteUserFromDB(selectedUser);
    setUsersData((prev) => prev.filter((user) => user._id !== selectedUser));
    setSelectedUser(null);
    toast.success("تم حذف الموظف بنجاح", {
      description: new Date().toLocaleString(),
    });
    setIsDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    toast.error("تم إلغاء العملية", {
      description: new Date().toLocaleString(),
    });
  };

  const handleEditUser = () => {
    setDisplayEditForm(true);
  };

  const afterUpdate = () => {
    setDisplayEditForm(false);
    setSelectedUser(null);
  };

  const selectedUserDetails = usersData.find(
    (user) => user._id === selectedUser
  );

  const formatDate = (date) => {
    if (!date) return "غير متاح";
    const formattedDate = date.toDate?.() || new Date(date);
    return formattedDate.toLocaleString();
  };

  return (
    <div className="grow md:p-8 p-2 dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">النجوم</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-screen overflow-x-auto">
        <AddEmployees />
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">قائمة المستخدمين</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-2 px-4 text-right">الاسم</th>
                  <th className="py-2 px-4 text-right hidden sm:table-cell">
                    البريد الإلكتروني
                  </th>
                  <th className="py-2 px-4 text-right hidden md:table-cell">
                    اخر ظهور
                  </th>
                  <th className="py-2 px-4 text-right">الوظيفية</th>
                </tr>
              </thead>
              <tbody>
                {usersData
                  ?.filter((user) => user.role !== "star" && !user.isDeleted)
                  .map((user) => (
                    <tr
                      key={user._id}
                      onClick={() => handleUserSelection(user._id)}
                      className={`border-b cursor-pointer ${
                        user._id === selectedUser ? "bg-gray-200" : ""
                      } hover:bg-gray-100`}
                    >
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4 hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="py-2 px-4 hidden md:table-cell">
                        <LastSeenAgo lastSeenDate={user.lastSeen} />
                        </td>
                      <td className="py-2 px-4">
                        {user.role === "admin"
                          ? "مدير"
                          : user.role === "editor"
                          ? "محرر"
                          : "مشاهد"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedUserDetails && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">بيانات المستخدم</h3>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                {["name", "email", "username", "role", "phone"].map((field) => (
                  <div key={field} className="flex items-center mb-4">
                    <span className="w-32">
                      {field === "role"
                        ? "الوظيفة"
                        : field === "phone"
                        ? "رقم الهاتف"
                        : field === "username"
                        ? "اسم المستخدم"
                        : field === "email"
                        ? "البريد الإلكتروني"
                        : "الاسم"}
                    </span>
                    <span>
                      {field === "role"
                        ? selectedUserDetails[field] === "admin"
                          ? "مدير"
                          : selectedUserDetails[field] === "editor"
                          ? "محرر"
                          : "مشاهد"
                        : selectedUserDetails[field]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="md:w-1/2">
                {["lastSeen", "createdAt"].map((field) => (
                  <div key={field} className="flex items-center mb-4">
                    <span className="w-32">
                      {field === "lastSeen"
                        ? "تاريخ أخر ظهور"
                        : "تاريخ انشاء الحساب"}
                    </span>
                    <span>{formatDate(selectedUserDetails[field])}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleDeleteUser}
              >
                حذف المستخدم
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleEditUser}
              >
                تعديل المستخدم
              </button>
            </div>
          </div>
        )}
        <ConfirmDialog
          title="تأكيد الحذف"
          message="هل متأكد من حذف هذا المستخدم؟"
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
      {displayEditForm && (
        <EditEmployees
          userData={selectedUserDetails}
          onUserUpdated={afterUpdate}
        />
      )}
    </div>
  );
};

export default Employees;
