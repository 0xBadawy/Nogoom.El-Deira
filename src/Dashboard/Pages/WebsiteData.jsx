import React, { useEffect, useState } from "react";
import Card from "../Card";

import { FaHome, FaEye, FaEyeSlash, FaCog } from "react-icons/fa";

// import { useDataContext } from "../../context/DataContext";

const WebsiteData = () => {
  

  return (
    <div className="grow p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-white">بيانات الموقع</h2>     
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Apartments List
        </h3>      
      </div>
    </div>
  );
};

export default WebsiteData;
