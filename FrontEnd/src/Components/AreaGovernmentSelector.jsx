import React, { useState, useEffect, useMemo, useRef } from "react";
import { AreaData } from "./data";

const AreaGovernmentSelector = ({ initialData = {}, onSelectionChange }) => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedGovernments, setSelectedGovernments] = useState([]);
  const selectAllRef = useRef(null);
  const selectAllAreasRef = useRef(null);

  useEffect(() => {
    if (initialData.areas) setSelectedAreas(initialData.areas);
    if (initialData.governments)
      setSelectedGovernments(initialData.governments);
  }, [initialData]);

  const allGovernments = useMemo(() => {
    return AreaData.flatMap((area) => area.subGovernments);
  }, []);

  const availableGovernments = useMemo(() => {
    return selectedAreas.flatMap(
      (area) =>
        AreaData.find((item) => item.name === area)?.subGovernments || []
    );
  }, [selectedAreas]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({ selectedAreas, selectedGovernments });
    }

    // تحديث حالة "اختر الكل" بناءً على الاختيارات
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selectedGovernments.length > 0 &&
        selectedGovernments.length < availableGovernments.length;
    }

    if (selectAllAreasRef.current) {
      selectAllAreasRef.current.indeterminate =
        selectedAreas.length > 0 && selectedAreas.length < AreaData.length;
    }
  }, [
    selectedAreas,
    selectedGovernments,
    availableGovernments,
    onSelectionChange,
  ]);

  const handleAreaChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAreas((prev) =>
      checked ? [...prev, value] : prev.filter((area) => area !== value)
    );
  };

  const handleGovernmentChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGovernments((prev) =>
      checked ? [...prev, value] : prev.filter((gov) => gov !== value)
    );
  };

  const handleSelectAllGovernments = (event) => {
    setSelectedGovernments(event.target.checked ? availableGovernments : []);
  };

  const handleSelectAllAreas = (event) => {
    if (event.target.checked) {
      setSelectedAreas(AreaData.map((area) => area.name));
      setSelectedGovernments(allGovernments);
    } else {
      setSelectedAreas([]);
      setSelectedGovernments([]);
    }
  };

  return (
    <div className="mx-auto w-full bg-white p-6 border rounded-2xl shadow-xl h-fit">
      {/* اختيار كل المناطق والمحافظات */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="select-all-areas"
          ref={selectAllAreasRef}
          checked={selectedAreas.length === AreaData.length}
          onChange={handleSelectAllAreas}
          className="w-5 h-5 accent-blue-500 rounded-md"
        />
        <label
          htmlFor="select-all-areas"
          className="ml-3 text-gray-800 text-lg"
        >
          اختر كل المناطق والمحافظات
        </label>
      </div>

      {/* قائمة المناطق */}
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        {AreaData.map((area) => (
          <div key={area.name} className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id={area.name}
                value={area.name}
                checked={selectedAreas.includes(area.name)}
                onChange={handleAreaChange}
                className="w-5 h-5 accent-blue-500 rounded-md"
              />
              <label htmlFor={area.name} className="ml-3 text-gray-800 text-lg">
                {area.name}
              </label>
            </div>

            {selectedAreas.includes(area.name) && (
              <div className="ml-6">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`select-all-${area.name}`}
                    checked={
                      selectedGovernments.length > 0 &&
                      area.subGovernments.every((gov) =>
                        selectedGovernments.includes(gov)
                      )
                    }
                    onChange={(event) => {
                      setSelectedGovernments((prev) =>
                        event.target.checked
                          ? [
                              ...prev,
                              ...area.subGovernments.filter(
                                (gov) => !prev.includes(gov)
                              ),
                            ]
                          : prev.filter(
                              (gov) => !area.subGovernments.includes(gov)
                            )
                      );
                    }}
                    className="w-4 h-4 accent-blue-500 rounded-md"
                  />
                  <label
                    htmlFor={`select-all-${area.name}`}
                    className="ml-2 text-gray-700 text-sm"
                  >
                    اختر كل المحافظات في {area.name}
                  </label>
                </div>

                <div className="ml-4 space-y-2">
                  {area.subGovernments.map((government) => (
                    <div key={government} className="flex items-center">
                      <input
                        type="checkbox"
                        id={government}
                        value={government}
                        checked={selectedGovernments.includes(government)}
                        onChange={handleGovernmentChange}
                        className="w-4 h-4 accent-blue-500 rounded-md"
                      />
                      <label
                        htmlFor={government}
                        className="ml-2 text-gray-700 hover:text-blue-600 cursor-pointer text-sm"
                      >
                        {government}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaGovernmentSelector;
