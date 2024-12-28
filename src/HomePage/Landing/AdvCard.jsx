import React from "react";
import { ArrowLeft } from "lucide-react";

export const AdvCard = ({ Title, Link, Img, des, category }) => {
  const translations = {
    events: "مناسبات",
    real_estate: "عقارات",
    cars: "سيارات",
    electronics: "إلكترونيات",
    services: "خدمات",
    home_supplies: "لوازم منزلية",
    personal_supplies: "لوازم شخصية",
    animals: "حيوانات",
  };

  return (
    <div className="my-4 bg-white h-full min-h-[400px] rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-[1.02] group">
      <div className="flex flex-col h-full min-h-[400px]">
        <div className="relative mb-4 overflow-hidden rounded-2xl">
          <img
            src={Img}
            alt={Title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {category && (
            <span className="absolute top-2 text-white left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {translations[category]}
            </span>
          )}
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-16">
            {Title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3 min-h-[4rem]">
            {des}
          </p>
        </div>
        <div className="mt-auto">
          <a
            href={`ads/${Link}`}
            className="inline-flex text-white font-semibold items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm uppercase tracking-wider transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            المزيد
            <ArrowLeft className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
