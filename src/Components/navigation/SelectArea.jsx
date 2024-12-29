import React, { useState, useEffect } from 'react';
import { GovernmentData } from '../../Stars/SignUp/data';

const SelectArea = ({ isScrolled }) => {
  const [selectedOption, setSelectedOption] = useState("");

  // Retrieve the stored value from localStorage on component mount
  useEffect(() => {
    const storedOption = localStorage.getItem("selectedArea");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // Save the selected value in localStorage
    localStorage.setItem("selectedArea", selectedValue);
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`
        ${
          isScrolled
            ? "text-white bg-primary"
            : "text-primary bg-white hover:bg-gray-200"
        }
        px-6 py-2   font-bold rounded-full
        transition-colors duration-300
        border-2 border-transparent h-fit
        flex items-center justify-center text-center
        
      `}
      >
        <option value="" disabled>
          اختر المنطقة
        </option>
        <option value="all" >
         كل المناطق
        </option>
        {GovernmentData.map((gov) => (
          <option key={gov.name} value={gov.name}>
            {gov.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectArea;
