import React, { useState, useEffect, useMemo } from "react";
import { AreaData } from "./data";

const AreaGovernmentSelector = ({ initialData = {}, onSelectionChange }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedGovernments, setSelectedGovernments] = useState([]);

   useEffect(() => {
    if (initialData.area) {
      setSelectedArea(initialData.area);
    }
    if (initialData.governments) {
      setSelectedGovernments(initialData.governments);
    }
  }, [initialData]);

 
  const availableGovernments = useMemo(() => {
    const area = AreaData.find((item) => item.name === selectedArea);
    return area ? area.subGovernments : [];
  }, [selectedArea]);

  const handleAreaChange = (event) => {
    const area = event.target.value;
    setSelectedArea(area);
    setSelectedGovernments([]);
  };


  const handleGovernmentChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGovernments((prev) =>
      checked ? [...prev, value] : prev.filter((gov) => gov !== value)
    );
  };

  // Select all or clear all governments
  const handleSelectAll = (event) => {
    setSelectedGovernments(event.target.checked ? availableGovernments : []);
  };

  // Trigger the parent's callback when selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({ selectedArea, selectedGovernments });
    }
  }, [selectedArea, selectedGovernments, onSelectionChange]);

  return (
    <div className="mx-auto w-full bg-white p-6 border rounded-2xl shadow-xl h-fit">
      {/* Area Selector */}
      <label className="block text-xl font-bold text-gray-700 mb-3">
        اختر المنطقة: *
      </label>
      <select
        value={selectedArea}
        onChange={handleAreaChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      >
        <option value="">-- اختر المنطقة --</option>
        {AreaData.map((area) => (
          <option key={area.name} value={area.name}>
            {area.name}
          </option>
        ))}
      </select>

      {availableGovernments.length > 0 && (
        <div>
          {/* Select All Checkbox */}
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="select-all"
              checked={
                selectedGovernments.length === availableGovernments.length
              }
              onChange={handleSelectAll}
              className="w-5 h-5 accent-blue-500 rounded-md"
            />
            <label htmlFor="select-all" className="ml-3 text-gray-800 text-lg">
              اختر الكل
            </label>
          </div>
          {/* Governments Checkbox List */}
          <div className="h-48 overflow-y-scroll border border-gray-300 rounded-lg p-3 space-y-3 bg-gray-50">
            {availableGovernments.map((government) => (
              <div key={government} className="flex items-center">
                <input
                  type="checkbox"
                  id={government}
                  value={government}
                  checked={selectedGovernments.includes(government)}
                  onChange={handleGovernmentChange}
                  className="w-5 h-5 accent-blue-500 rounded-md"
                />
                <label
                  htmlFor={government}
                  className="ml-3 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {government}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaGovernmentSelector;