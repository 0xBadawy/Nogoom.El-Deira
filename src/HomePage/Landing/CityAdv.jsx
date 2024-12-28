import i18n from "../../i18n";
import Image from "../../assets/Images/success.png";
import { useEffect, useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";
const CityAdv = () => {

     const [data,setData] = useState()
  
  const { getHomeData } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      const Data = await getHomeData();
      console.log(data);
      setData(Data);
    };
    fetchData();
  }, []);



  return (
    <div
      className="bg-[#fff] relative w-[95%] h-[vh] py-10 mt-5 md:px-14 px-4 rounded-3xl  mx-auto "
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center  text-right">
          <h2 className="text-4xl  font-extrabold text-right">
            {data?.ad_title}
          </h2>

          <p className="text-2xl font-bold  mt-10 text-gray-800 text-right">
            {data?.ad_description}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src={Image} alt="city" />
        </div>
      </div>
    </div>
  );
};

export default CityAdv;
