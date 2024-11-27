import React from "react";

const TierSelection = ({ tiers, selectedCategory, setValue }) => {
  return (
    <div>
      <h4 className="block text-gray-700 mb-4">اختيار فئة النجوم</h4>
      <div className="grid grid-cols-2 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-4 border rounded-lg ${
              selectedCategory === tier.name
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-300"
            }`}
          >
            <h3 className="text-xl font-bold">{tier.name}</h3>
            <p className="text-gray-600">شرط المشاهدات: {tier.views}+</p>
            <p className="text-gray-600">الأرباح: {tier.earnings} ريال</p>
            <button
              onClick={() => setValue("category", tier.name)}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              اختر
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierSelection;
