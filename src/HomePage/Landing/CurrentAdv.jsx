import React from "react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { AdvCard } from "./AdvCard";
import Image from "../../assets/Images/Digital-Marketing.jpg";
const CurrentAdv = () => {
  const { t } = useTranslation();
  //Title,Link,Img,des
  const arr = [
    {
      Title: t("عنوان الإعلان"),
      Link: "/",
      Img: Image,
      des: t("  وصف الإعلان ومعلومات إضافية عن الإعلان وما إلى ذلك"),
    },
    {
      Title: t("عنوان الإعلان"),
      Link: "/",
      Img: Image,
      des: t("  وصف الإعلان ومعلومات إضافية عن الإعلان وما إلى ذلك"),
    },
    {
      Title: t("عنوان الإعلان"),
      Link: "/",
      Img: Image,
      des: t("  وصف الإعلان ومعلومات إضافية عن الإعلان وما إلى ذلك"),
    },
   
  ];
  return (
    <div
      className="bg-[#fff] relative w-[95%] h-[vh] py-10 mt-5 md:px-14 px-4 rounded-3xl  mx-auto "
      style={{ direction: "rtl", fontFamily: "Cairo" }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{i18n.t("currentAdv.Title")} </h1>
        <button className="text-[#FF6B6B] border-[#FF6B6B] border-2 px-4 py-1 rounded-full">
          المزيد
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {arr.map((item, index) => {
          return (
            <AdvCard
              key={index}
              Title={item.Title}
              Link={item.Link}
              Img={item.Img}
              des={item.des}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CurrentAdv;
