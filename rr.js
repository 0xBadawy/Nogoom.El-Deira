<div className="overflow-x-auto">
  <table className="table-auto w-full text-xs sm:text-sm md:text-base border-collapse border border-gray-200">
    <thead>
      <tr className="border-b">
        <th className="py-2 px-2 sm:px-4 text-right bg-gray-100">الاسم</th>
        {currentItems.map((row, index) => (
          <th key={index} className="py-2 px-2 sm:px-4 text-center">
            {row.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr className="border-b">
        <td className="py-2 px-2 sm:px-4 text-right  bg-gray-100">المنطقة</td>
        {currentItems.map((row, index) => (
          <td key={index} className="py-2 px-2 sm:px-4 text-center">
            {row.govern}
          </td>
        ))}
      </tr>
      <tr className="border-b">
        <td className="py-2 px-2 sm:px-4 text-right  bg-gray-100">المحافظة</td>
        {currentItems.map((row, index) => (
          <td key={index} className="py-2 px-2 sm:px-4 text-center">
            {Area(row.area)}
          </td>
        ))}
      </tr>
      <tr className="border-b">
        <td className="py-2 px-2 sm:px-4 text-right  bg-gray-100">
          عدد الحملات
        </td>
        {currentItems.map((row, index) => (
          <td key={index} className="py-2 px-2 sm:px-4 text-center">
            {row.ads ? row.ads.length : 0}
          </td>
        ))}
      </tr>
      <tr className="border-b">
        <td className="py-2 px-2 sm:px-4 text-right  bg-gray-100">القبول</td>
        {currentItems.map((row, index) => (
          <td key={index} className="py-2 px-2 sm:px-4 text-center">
            <span
              className={`${
                row.verified
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }`}
            >
              {row.verified ? "مقبول" : "قيد المراجعة"}
            </span>
          </td>
        ))}
      </tr>
      <tr className="border-b">
        <td className="py-2 px-2 sm:px-4 text-right  bg-gray-100">فئة النجم</td>
        {currentItems.map((row, index) => (
          <td key={index} className="py-2 px-2 sm:px-4 text-center">
            {row.accountType}
          </td>
        ))}
      </tr>
    </tbody>
  </table>
</div>;
