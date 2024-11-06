import React, { useRef } from "react";
import { Card } from "./Card";
import { TextInput } from "./TextInput";
import { MdClose } from "react-icons/md";

export const ModalSendMoney = ({ onClick, setModal, ...props }) => {
  const clickOutRef = useRef();

  function outsideModalClick(e) {
    if (clickOutRef.current === e.target) {
      setModal();
    }
  }

  return (
    <div
      ref={clickOutRef}
      onClick={outsideModalClick}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="bg-gray-100 p-8 rounded-lg drop-shadow-lg">
        <div onClick={setModal} className="w-full  flex justify-end">
          <MdClose className="w-8 h-8 cursor-pointer hover:w-9 hover:h-9 hover:duration-150 hover:ease-in-out fixed " />
        </div>
        <h1 className="text-3xl font-extrabold text-center pb-24">
          Send Money
        </h1>
        <div className="flex items-center gap-x-3 text-xl font-bold">
          <img
            className="rounded-full w-10 h-10"
            src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
          />
          Friend's Name
        </div>
        <p className="pt-3 pb-1 font-semibold text-sm "> Amount (in Rs.)</p>

        <form>
          <TextInput required={true} placeholder="Enter Amount"></TextInput>

          <button className="bg-green-500 w-full mt-3 py-3 rounded-lg hover:duration-150 hover:bg-green-600 font-semibold text-2xl text-white">
            Initiate Transfer
          </button>
        </form>
      </div>
    </div>
  );
};
