import React, { useEffect, useState } from "react";
import { AreaData } from "./data"; // Import AreaData
import axiosInstance from "../Configuration/axiosInstance";

const UserSelector = ({ initialSelectedUsers = [], onSelectionChange }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({ area: "", govrn: "" });

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => { 
      try {
        const response = await axiosInstance.get("/user/stars_users");
        const data = response.data.data;
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on selected area and govrn
useEffect(() => {
  let { area, govrn } = filters;

  if (!area && !govrn) {
    setFilteredUsers(users);
    return;
  }

  const filtered = users.filter((user) => {
    const userArea = user.address?.area || "";
    const userGovernArray = user.address?.govern || []; // المصفوفة
    const userGovern = Array.isArray(userGovernArray)
      ? userGovernArray.join(", ")
      : userGovernArray; // تحويلها لنص

    return (
      (!area || userArea === area) && (!govrn || userGovern.includes(govrn)) // التأكد من أن المحافظة موجودة داخل المصفوفة
    );
  });

  setFilteredUsers(filtered);
}, [filters, users]);

  // Notify parent component when selected users change
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedUsers);
    }
  }, [selectedUsers, onSelectionChange]);

  const handleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "area" ? { govrn: "" } : {}), // إعادة ضبط المحافظة عند تغيير المنطقة
    }));
  };

  // Get the sub-governments for the selected area
  const subGovernments =
    AreaData.find((area) => area.name === filters.area)?.subGovernments || [];

  return (
    <div className="w-full bg-white p-6 border rounded-2xl shadow-xl h-fit">
      <h2 className="text-xl font-bold text-gray-700 mb-4">اختر المستخدمين:</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">المنطقة:</label>
          <select
            name="area"
            value={filters.area}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر المنطقة</option>
            {AreaData.map((area) => (
              <option key={area.name} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">الموقع:</label>
          <select
            name="govrn"
            value={filters.govrn}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={!subGovernments.length}
          >
            <option value="">اختر الموقع</option>
            {subGovernments.map((subGov, index) => (
              <option key={index} value={subGov}>
                {subGov}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User List */}
      <div className="h-48 overflow-y-scroll border border-gray-300 rounded-lg p-3 space-y-3 bg-gray-50">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="flex items-center">
              <input
                type="checkbox"
                id={`user-${user._id}`}
                value={user._id}
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleUserSelection(user._id)}
                className="w-5 h-5 accent-blue-500 rounded-md"
              />
              <label
                htmlFor={`user-${user._id}`}
                className="ml-3 text-gray-700"
              >
                {user.name} - {user?.email}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">لا توجد نتائج</p>
        )}
      </div>
    </div>
  );
};

export default UserSelector;
