import React from "react";

export const Balance = ({balance}) => {
  return (
    <div className="font-bold text-lg py-4 ml-4 ">
      Your Balance: <span className="text-md">{balance}</span>{" "}
    </div>
  );
};
