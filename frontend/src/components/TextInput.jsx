import React from "react";

export const TextInput = ({ placeholder, ...props }) => {
  return (
    <input
      {...props}
      placeholder={placeholder}
      className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2  mt-2"
    ></input>
  );
};
