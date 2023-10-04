import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import transfer from "../../assets/transfer.json";
import Lottie from "lottie-react";
import axios from "axios";
const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferingGroupAccountFill() {
  const auth = useSelector((state) => state.auth);
  const opposite = useSelector((state) => state.opposite);
  const account = useSelector((state) => state.account);
  const location = useLocation();
  const navigate = useNavigate();
  const sendMoney = location.state.money;
  const receiverName = location.state.userName;
  const [sended, setSended] = useState(false);
  const [isbutton, setIsButton] = useState(false);

  function checkSended() {
    setSended(true);
  }

  function checkvisible() {
    setIsButton(true);
  }

  function fillMoney() {
    console.log("실행되고 있음");
    const data = {
      value: sendMoney,
      accountNo: account.account.no,
    };
    console.log(data);
    axios.post(`${BASE_HTTP_URL}/api/group/account/fill`, data, {
      headers: {
        Authorization: auth.accessToken,
      },
    });
    navigate("/groupAccount/" + account.account.no);
  }

  useEffect(() => {
    setTimeout(() => {
      checkSended();
      checkvisible();
    }, 3000);
  });
  return (
    <>
      <Lottie animationData={transfer} loop={true} />
      <div>{receiverName}님께</div>
      {sended ? (
        <div>{sendMoney}원을 송금했어요</div>
      ) : (
        <div>{sendMoney}원을 송금중이에요</div>
      )}
      {isbutton ? (
        <button
          style={{
            width: "360px",
            backgroundColor: "#7165E3",
            color: "white",
            // position: "relative",
            // left: "0",
            // top: "130px",
          }}
          onClick={() => fillMoney()}
        >
          확인
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default TransferingGroupAccountFill;
