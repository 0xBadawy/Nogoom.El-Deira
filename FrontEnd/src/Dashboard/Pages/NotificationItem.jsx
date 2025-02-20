import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // استيراد الأيقونات
import { formatDateTime } from "../../hooks/formatDate";

const NotificationItem = ({ notification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      key={notification._id}
      onClick={() => setIsExpanded(!isExpanded)}
      className="p-3 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 cursor-pointer 
                 bg-white hover:shadow-md hover:border-indigo-300"
    >
      <div className="flex justify-between items-center">
        <div className="w-full overflow-hidden">
          <p className="text-sm text-indigo-900 line-clamp-2">
            {notification?.message}
          </p>
        </div>
        <span className="text-gray-500">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>

      {/* محتوى الإشعار المخفي */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h- 4 0 mt-2" : "max-h-0"
        }`}
      >
        <div className="mt-2 text-gray-600 text-xs space-y-1">
          {notification?.sendedUsersId.map((user) => (
            <p key={user._id} className="whitespace-normal">
              {user.name}
            </p>
          ))}
          <p className="text-gray-400">
            {formatDateTime(notification?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
