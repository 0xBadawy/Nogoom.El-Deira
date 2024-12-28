
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const isDarkMode  =false;

  return (
    <div className="flex flex-col ">
      <Sidebar />
      <div
        className={`grow mr-16 md:mr-64 min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
