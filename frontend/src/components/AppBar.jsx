import React from "react";

export const AppBar = ({ title, userName, imgSrc }) => {
  return (
    <div className="bg-gray-100 py-3 mt-4 container mx-auto shadow-lg rounded-2xl border-[1px] border-gray-300">
      <div className="flex justify-between mx-4">
        <div className="font-sans font-bold text-2xl ">{title}</div>
        <div className="font-bold pt-1">
          Hello, <span className="pr-2">{userName}</span>
          <img className="rounded-full w-8 h-8 inline" src={imgSrc} />
        </div>
      </div>
    </div>
  );
};
