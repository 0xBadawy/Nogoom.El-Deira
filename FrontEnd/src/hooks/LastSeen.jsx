import React, { useEffect, useState } from "react";

const LastSeenAgo = ({ lastSeenDate }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const lastSeen = new Date(lastSeenDate);
      const diffInSeconds = Math.floor((now - lastSeen) / 1000);

      if (diffInSeconds < 60) {
        setTimeAgo(`منذ ${diffInSeconds} ثانية`);
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`منذ ${minutes} دقيقة`);
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`منذ ${hours} ساعة`);
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        setTimeAgo(`منذ ${days} يوم`);
      }
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lastSeenDate]);

  return <span>{timeAgo}</span>;
};

export default LastSeenAgo;
