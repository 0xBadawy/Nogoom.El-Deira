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

        const sortedUsers = response.data.data.sort(
          (a, b) => new Date(b.lastSeen) - new Date(a.lastSeen)
        );

 
        setUsersData(sortedUsers);
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
    const handelDelet = async () => {
      try {
        const response = await axiosInstance.delete(`/user/delete_user`, {
          params: { id: selectedUser },
        });

 
        if (response.data.status === "error") {
          toast.error(response.data.message);
          return;
        }
        toast.success("تم حذف الموظف بنجاح");

        setUsersData((prev) =>
          prev.filter((user) => user._id !== selectedUser)
        );
        setSelectedUser(null);
        setIsDialogOpen(false);
      } catch (error) {
        toast.error("حدث خطأ أثناء حذف الموظف.");
      }
    };
    handelDelet();

    // deleteUserFromDB(selectedUser);
    // setUsersData((prev) => prev.filter((user) => user._id !== selectedUser));
    // setSelectedUser(null);
    // toast.success("تم حذف الموظف بنجاح", {
    //   description: new Date().toLocaleString(),
    // });
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

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // عدد المستخدمين في كل صفحة

  // تصفية المستخدمين غير المحذوفين
  const filteredUsers = usersData?.filter(
    (user) => user.role !== "star" && !user.isDeleted
  );

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // تحديد المستخدمين للصفحة الحالية
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="grow md:p-8 p-2 dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">الموظفين</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-screen overflow-x-auto">
        <AddEmployees />

        {/* 000000000000000000000000000000000000000 */}

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">قائمة المستخدمين</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-2 px-4 text-right">الاسم</th>
                  <th className="py-2 px-4 text-right hi dden md:table-cell">
                    اخر ظهور
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    onClick={() => handleUserSelection(user._id)}
                    className={`border-b cursor-pointer ${
                      user._id === selectedUser ? "bg-gray-200" : ""
                    } hover:bg-gray-100`}
                  >
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4 hidd en text-sm md:table-cell">
                      <LastSeenAgo lastSeenDate={user.lastSeen} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* أزرار التنقل بين الصفحات */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              السابق
            </button>
            <span className="px-4 py-2">
              {currentPage} من {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              التالي
            </button>
          </div>
        </div>

        {/* 000000000000000000000000000000000000000 */}

        {selectedUserDetails && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">بيانات المستخدم</h3>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                {["name", "email", "role", "phone"].map((field) => (
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

                <div className="flex items-center mb-4 ">
                  <p className="w-32"> اخر ظهور :</p>
                  <LastSeenAgo lastSeenDate={selectedUserDetails.lastSeen} />
                </div>
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
