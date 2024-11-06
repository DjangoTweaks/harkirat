import React from "react";

export const Heading = ({children}) => {
  return (
    <div className="font-sans font-extrabold text-4xl text-center text-black">
      {children}
    </div>
  );
};
