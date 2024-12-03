import React from "react";

export const AdvCard = ({Title,Link,Img,des}) => {
return (
    <div className="bg-[#F9F9F9] rounded-3xl p-5">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl">{Title}</h1>
            <a href={Link} className="text-[#FF6B6B] border-[#FF6B6B] border-2 px-4 py-1 rounded-full">
                المزيد
            </a>
        </div>
        <img
            src={Img}
            alt="Ad Image"
            className="w-full h-auto mt-5 rounded-3xl"
        />
        <p className="text-[#707070] mt-5">
            {des}
        </p>
    </div>
);
};
