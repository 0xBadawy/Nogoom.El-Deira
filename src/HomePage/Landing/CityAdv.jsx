import i18n from "../../i18n";
import Image from "../../assets/Images/success.png";
const CityAdv = () => {
  return (
    <div
      className="bg-[#fff] relative w-[95%] h-[vh] py-10 mt-5 px-14 rounded-3xl  mx-auto "
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center  text-right">
          <h2 className="text-4xl  font-extrabold text-right">
            {i18n.t("cityAdv.firstTitle")} {"الحاجر"}{" "}
            {i18n.t("cityAdv.secondTitle")}
          </h2>

          <p className="text-2xl font-bold  mt-10 text-gray-800 text-right">
            {i18n.t("cityAdv.firstDescription")} {"الحاجر"}{" "}
            {i18n.t("cityAdv.secondDescription")}
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
