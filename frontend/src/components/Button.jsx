import React from "react";

export const Button = ({ onClick, buttonName }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-black rounded-lg p-3 w-full hover:duration-150 hover:bg-gray-900  "
    >
      {buttonName}
    </button>
  );
};
