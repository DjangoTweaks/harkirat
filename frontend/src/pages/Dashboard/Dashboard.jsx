import React, { useEffect, useState } from "react";
import { AppBar } from "../../components/AppBar";
import { Card } from "../../components/Card";
import { Balance } from "../../components/Balance";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { SendMoneyUser } from "../../components/SendMoneyUser";
import { ModalSendMoney } from "../../components/ModalSendMoney";


export default function Dashboard() {
  const [openState, setOpenState] = useState(false);

  function setModal() {
    setOpenState(!openState);
  }

  useEffect(() => {
    console.log("From Use Effect: ", openState);
  }, [openState]);

  return (
    <div className="container mx-auto">
      <AppBar
        title="Payments App"
        userName="Akshat"
        imgSrc="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
      />
      <Card>
        <Balance balance="$5000"></Balance>
      </Card>

      <Card>
        <div className="p-4 pb-0 font-bold text-xl">Users</div>

        <div className="px-4 pb-4">
          <TextInput placeholder="Search Users..."></TextInput>
        </div>

        <div>
          <SendMoneyUser
            onClick={setModal}
            userName="Akshat"
            imgSrc="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
          />
          {openState && (
            <div>
              <ModalSendMoney setModal={setModal} onClick={setModal} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
