import React, { useEffect, useState } from "react";
import Card from "../Card";

import { FaHome, FaEye, FaEyeSlash, FaCog } from 'react-icons/fa';

// import { useDataContext } from "../../context/DataContext";

const Apartments = () => {
  const { apartments, TogileDisplay } = useDataContext();
  const [apartmentsData, setApartmentsData] = useState([]);

  const [numbers, setNumbers] = useState({
    Apartments: 0,
    Hidin: 0,
    Display: 0,
    Settings: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Sort apartments by ID in descending order
      const sortedApartments = apartments.sort((a, b) => b.id - a.id);
      setApartmentsData(sortedApartments);
    };
    fetchData();
  }, [apartments]);

  useEffect(() => {
    const fetchData = async () => {
      let Count = 0;
      let Hidin = 0;
      let Display = 0;

      apartmentsData.forEach((apartment) => {
        Count++;
        if (apartment.display) {
          Display++;
        } else {
          Hidin++;
        }
      });
      console.log(Count, Hidin, Display);
      setNumbers({
        Apartments: Count,
        Hidin: Hidin,
        Display: Display,
        Settings: 11,
      });
    };
    fetchData();
  }, [apartmentsData]);

  // Function to toggle the display state of an apartment
  const handleDisplayToggle = async (id, display) => {
    try {
      await TogileDisplay(id, !display);
      setApartmentsData((prevData) =>
        prevData.map((apartment) =>
          apartment.id === id ? { ...apartment, display: !display } : apartment
        )
      );
    } catch (error) {
      console.error("Error updating apartment display:", error);
    }
  };

  return (
    <div className="grow p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-white">Apartments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card icon={<FaHome />} title="Apartments" value={numbers.Apartments} />
  <Card icon={<FaEye />} title="Displayed" value={numbers.Hidin}/>
  <Card icon={<FaEyeSlash />} title="Hidden" value={numbers.Display} />
  <Card icon={<FaCog />} title="Settings" value={numbers.Hidin} />
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Apartments List
        </h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 border-b">
              {[
                "Name",
                "Price",
                "Location Area",
                "Location City",
                "Location Floor",
                "ID",
                "Display",
                "Badge",
                "Action",
              ].map((column, index) => (
                <th
                  key={index}
                  className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-white"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apartmentsData.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } dark:bg-gray-700`}
              >
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.name.substring(0, 20)}
                  {row.name.length > 20 && "..."}
                </td>
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.Price.price}
                </td>
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.Location.area}
                </td>
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.Location.city}
                </td>
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.Location.floor}
                </td>
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.id}
                </td>
                <td className="py-2 px-6 text-sm font-bold text-gray-900 dark:text-white">
                  {!row.display ? "true" : "false"}
                </td>
                <td className="py-2 px-6 text-sm text-gray-900 dark:text-white">
                  {row.Badge || ""}
                </td>
                <td className="py-2 px-6 text-sm">
                  <button
                    onClick={() => handleDisplayToggle(row.id, row.display)}
                    className="bg-blue-500 w-28 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {row.display ? (
                      <>
                        <FaEye className="inline-block text-green-500 " />{" "}
                        Display
                      </>
                    ) : (
                      <>
                        <FaEyeSlash className="inline-block text-red-500 " />{" "}
                        Hide
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Apartments;
