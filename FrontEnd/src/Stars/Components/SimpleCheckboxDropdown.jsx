import React, { useState } from "react";

const SimpleCheckboxDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCheckboxChange = (option) => {
    if (selectedItems.includes(option)) {
      // Remove item if unchecked
      setSelectedItems(selectedItems.filter((item) => item !== option));
    } else if (selectedItems.length < 4) {
      // Add item if checked and limit not reached
      setSelectedItems([...selectedItems, option]);
    }
  };

  return (
    <div className="relative max-w-full mx-auto mt-8">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-left flex justify-between items-center"
      >
        {selectedItems.length > 0
          ? `Selected: ${selectedItems.join(", ")}`
          : "Select options"}
        <span className="text-gray-500">&#9662;</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded shadow">
          {options.map((option) => (
            <label
              key={option}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleCheckboxDropdown;
