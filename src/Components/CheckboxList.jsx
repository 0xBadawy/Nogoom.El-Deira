import { useEffect, useState } from "react";

const CheckboxList = ({ items, selected, text }) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (index) => {
        setCheckedItems((prevState) => {
            const newState = { ...prevState, [index]: !prevState[index] };
            selected(items[index], newState[index]);
            return newState;
        });
    };

    useEffect(() => {
      setCheckedItems({});

    },[items]);





    const handleSelectAllChange = () => {
        const allChecked = Object.keys(checkedItems).length === items.length && Object.values(checkedItems).every(Boolean);
        const newCheckedItems = items.reduce((acc, _, index) => {
            acc[index] = !allChecked;
            selected(items[index], !allChecked);
            return acc;
        }, {});
        setCheckedItems(newCheckedItems);
    };

    const allChecked = Object.keys(checkedItems).length === items.length && Object.values(checkedItems).every(Boolean);

    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">{text}</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <label className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleSelectAllChange}
              className="form-checkbox text-blue-600"
            />
            <span className="text-gray-800  px-3">تحديد الكل</span>
          </label>
          {items.map((item, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={!!checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
                className="form-checkbox text-blue-600"
              />
              <span className="text-gray-800 px-3">{item}</span>
            </label>
          ))}
        </div>
      </div>
    );
};

export default CheckboxList;
