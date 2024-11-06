import React from "react";
import { Button } from "./Button";
export const SendMoneyUser = ({ imgSrc, userName, onClick }) => {
  return (
    <div className="flex justify-between py-3 px-4">
      <div className="flex justify-start items-center gap-x-3">
        <img className="rounded-full w-10 h-10" src={imgSrc} />
        <span className="font-semibold">{userName}</span>
      </div>

      <div>
        <div>
          <Button onClick={onClick} buttonName="Send Money"></Button>
        </div>
      </div>
    </div>
  );
};
