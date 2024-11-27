import React, { useState } from "react";

const TierSelection = ({ tiers, register, id }) => {



  return (
    <div>
      <h4 className="block text-gray-700 mb-4">اختيار فئة النجوم</h4>
      <select
        {...register(id)}
        className="block w-full p-2 border rounded-lg"
      >
        <option value="" disabled>
          اختر فئة
        </option>
        {tiers.map((tier) => (
          <option key={tier.name} value={tier.name}>
            {tier.name} - شرط المشاهدات: {tier.views}+ - الأرباح: {tier.earnings} ريال
          </option>
        ))}
      </select>
    </div>
  );
};

export default TierSelection;
