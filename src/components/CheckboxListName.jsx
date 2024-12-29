import { useEffect, useState } from "react";

const CheckboxListName = ({ items, selected, text }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => {
      const newState = { ...prevState, [id]: !prevState[id] };
      const item = items.find((item) => item.Uid === id);
      selected(item, newState[id]);
      return newState;
    });
  };

  useEffect(() => {
    setCheckedItems({});
  },[items])



  const handleSelectAllChange = () => {
    const allChecked =
      Object.keys(checkedItems).length === items.length &&
      Object.values(checkedItems).every(Boolean);
    const newCheckedItems = items.reduce((acc, item) => {
      acc[item.Uid] = !allChecked;
      selected(item, !allChecked);
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  };

  const allChecked =
    Object.keys(checkedItems).length === items.length &&
    Object.values(checkedItems).every(Boolean);

  return (
    <div className="md:p-4">
      <h2 className="text-lg font-bold mb-4">{text}</h2>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        <label className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleSelectAllChange}
            className="form-checkbox text-blue-600"
          />
          <span className="text-gray-800 px-3">تحديد الكل</span>
        </label>
        {items.map((item) => (
          <label
            key={item.Uid}
            className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100"
          >
            <input
              type="checkbox"
              checked={!!checkedItems[item.Uid]}
              onChange={() => handleCheckboxChange(item.Uid)}
              className="form-checkbox text-blue-600"
            />
            <span className="text-gray-800 px-3">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxListName;
