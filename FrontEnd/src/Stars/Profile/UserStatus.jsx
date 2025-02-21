import React from "react";
import { MdVerified, MdPreview } from "react-icons/md";
import { FaUser, FaRegUser, FaStar, FaMedal } from "react-icons/fa";

const UserStatus = ({ verified, accountType }) => {
  const renderAccountType = () => {
    switch (accountType) {
      case "none":
        return (
          <p className="m2 text-lg font-semibold flex flex-row-reverse items-center gap-2">
            <FaUser className="text-gray-600" size={24} />
            <p className="mt-1">حساب عادي</p>
          </p>
        );
      case "silver":
        return (
          <p className="m2 text-lg font-semibold flex flex-row-reverse items-center gap-2">
            <FaStar className="text-silver-500" size={24} />
            <p className="mt-1">حساب فضي</p>
          </p>
        );
      case "gold":
        return (
          <p className="m2 text-lg font-semibold flex flex-row-reverse items-center gap-2">
            <FaMedal className="text-yellow-500" size={24} />
            <p className="mt-1">حساب ذهبي</p>
          </p>
        );
      case "bronze":
        return (
          <p className="m2 text-lg font-semibold flex flex-row-reverse items-center gap-2">
            <FaRegUser className="text-brown-500" size={24} />
            <p className="mt-1">حساب برونزي</p>
          </p>
        );
      default:
        return null;
    }
  };

  const getColorClasses = () => {
    switch (accountType) {
      case "none":
        return "bg-gray-100 text-gray-700";
      case "silver":
        return "bg-gray-200 text-gray-700";
      case "gold":
        return "bg-yellow-100 text-yellow-700";
      case "bronze":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={`mb-6 p-3 rounded-lg text-center ${
        verified ? "border-green-500" : "border-red-500"
      } ${getColorClasses()}`}
    >
      <div className="flex items-center justify-center gap-2 font-semibold">
        {verified ? (
          <>
            <div className="m2 text-lg font-semibold flex flex-row-reverse items-center gap-2">
              {renderAccountType()}
              <p className="mt-1">
                {accountType === "عادي" && "حساب عادي"}
                {accountType === "فضي" && "حساب فضي"}
                {accountType === "ذهبي" && "حساب ذهبي"}
                {accountType === "برونزي" && "حساب برونزي"}
              </p>
            </div>
          </>
        ) : (
          <>
            <MdPreview className="text-red-500" size={24} />
            حسابك قيد المراجعة
          </>
        )}
      </div>
    </div>
  );
};

export default UserStatus;
