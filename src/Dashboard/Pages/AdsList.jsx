import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";

const AdsList = () => {

  const {getAllAds} = useDashboard();
  const [ads, setAds] = useState([]);
  useEffect(() => {
    getAllAds().then((data) => {
      setAds(data);
    });

  }, []);
  useEffect(() => {
    console.log(ads)
  }, [ads]);

  
  

  return (
   <div className="grow md:p-8 p-2  dark:bg-gray-800 h-full">
      <h2 className="text-2xl mb-4">الحملات الاعلانية</h2>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4"> </h3>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-right">اسم الاعلان</th>
            <th className="py-2 px-4 text-right">التصنيف</th>
            <th className="py-2 px-4 text-right hidden md:table-cell"></th>
          </tr>
        </thead>

        <tbody>
          {ads.map((row, index) => (
            <tr
              key={index}
              // onClick={() => setSelectedUser(row.Uid)}
              className={`border-b ${row.Uid === 1 ? "bg-gray-200" : ""}`}
            >
              <td className="py-2 px-4">{row.title}</td>
              <td className="py-2 px-4">{row.category}</td>
            </tr>
          ))}
          
        </tbody>
      </table>


    </div>
    </div>
  );
}

export default AdsList;