// Users.js
import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails"; // استيراد المكون الجديد
import { useDashboard } from "../../Context/DashboardContext";
import { GovernmentData } from "../../Stars/SignUp/data";
import UserAdds from "./UserAdds";
import UserDetailsBalance from "./UserDetailsBalance"; // استيراد المكون الجديد

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const { allUsers, updateUser } = useDashboard();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedGovern, setSelectedGovern] = useState("all");

 

  const filteredUsers = usersData.filter((user) => {
    const regionMatch =
      selectedRegion === "all" || user.govern === selectedRegion;
    const governMatch =
      selectedGovern === "all" || user.area?.includes(selectedGovern);

    return regionMatch && governMatch;
  });


   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 20; 

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);




  const [area, setArea] = useState("");

  useEffect(() => {
    const users = allUsers;
    // console.log("users", users);
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

    // console.log(updatedUser);
  };

  return (
    <div className="grow md:p-8 p-2  dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">النجوم</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-screen overflow-x-auto">
        <div>
          <div className="flex gap-4 mb-4">
            {/* قائمة المنطقة */}
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setCurrentPage(1);
                setSelectedGovern("all"); // إعادة تعيين المحافظة عند تغيير المنطقة
              }}
              className="border rounded px-2 py-1"
            >
              <option value="all">كل المناطق</option>
              {GovernmentData.map((region) => (
                <option key={region.name} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>

            {/* قائمة المحافظة */}
            <select
              value={selectedGovern}
              onChange={(e) => {setSelectedGovern(e.target.value);
                setCurrentPage(1);
              }
              }
              className="border rounded px-2 py-1"
              disabled={selectedRegion === "all"}
            >
              <option value="all">كل المحافظات</option>
              {selectedRegion !== "all" &&
                GovernmentData.find(
                  (region) => region.name === selectedRegion
                )?.subGovernments.map((govern) => (
                  <option key={govern} value={govern}>
                    {govern}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">بيانات النجوم</h3>

        <table className="table-auto w-full  text-sm md:text-base">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-right min-w-36 ">الاسم</th>
              <th className="py-2 px-4 text-right">المنطقة</th>
              <th className="py-2 px-4 text-right">المحافظة</th>
              <th className="py-2 px-4 text-right">الرصيد</th>

              <th className="py-2 px-4 text-right">عدد الحملات</th>
              <th className="py-2 px-4 text-center">القبول</th>
              <th className="py-2 px-4 text-right">فئة النجم</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(
              (row, index) =>
                row.role === "star" && (
                  <tr
                    key={index}
                    onClick={() => setSelectedUser(row.Uid)}
                    className={`border-b hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      row.Uid === selectedUser
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    }`}
                  >
                    <td className="py-2 px-4">{row.name}</td>
                    <td className="py-2 px-4">{row.govern}</td>
                    <td className="py-2 px-4">{Area(row.area)}</td>
                    <td className="py-2 px-4">{row.balance}</td>

                    <td className="py-2 px-4">{row.ads?.length}</td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`${
                          row.verified
                            ? "text-green-500 font-bold"
                            : "text-red-500 font-bold"
                        }`}
                      >
                        {row.verified ? "مقبول" : "قيد المراجعة"}
                      </span>
                    </td>
                    <td className="py-2 px-4">{row.accountType}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg dark:bg-gray-700 disabled:opacity-50"
          >
            السابق
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg dark:bg-gray-700 disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      </div>

      {/* عرض وتعديل بيانات المستخدم */}
      {selectedUser && (
        <UserAdds
          selectedUserUid={selectedUser}
          usersData={usersData}
          onSave={handleSave}
        />
      )}
      {selectedUser && (
        <UserDetails
          selectedUserUid={selectedUser}
          usersData={usersData}
          onSave={handleSave}
        />
      )}


{selectedUser && (
        <UserDetailsBalance
          selectedUserUid={selectedUser}
          usersData={usersData}
          onSave={handleSave}
        />
      )}



    </div>
  );
};

export default Users;
