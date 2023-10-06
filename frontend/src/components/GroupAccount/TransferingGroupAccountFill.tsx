import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import transfer2 from "../../assets/transfer2.json";
import Lottie from "lottie-react";
import axios from "axios";
import styles from "./TransferingGroupAccountFill.module.scss";
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
    <div className={styles.container}>
      <Lottie animationData={transfer2} loop={true} />
      <p>{receiverName}님께</p>
      {sended ? (
        <p>
          <span>{sendMoney.toLocaleString()}원</span>을 송금했어요
        </p>
      ) : (
        <p>
          <span>{sendMoney.toLocaleString()}원</span>을 송금중이에요
        </p>
      )}
      {isbutton ? (
        <button onClick={() => fillMoney()} className={styles.subbutton}>
          확인
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TransferingGroupAccountFill;
