import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import transfer from "../../assets/transfer2.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Transfering.module.scss";

function Transfering() {
  const location = useLocation();
  const account = useSelector((state) => state.account);
  const sendMoney = location.state.money;
  const navigate = useNavigate();

  const receiverName = location.state.userName;
  const [sended, setSended] = useState(false);
  const [isbutton, setIsButton] = useState(false);
  function checkSended() {
    setSended(true);
  }
  function checkvisible() {
    setIsButton(true);
  }

  const goToDetail = () => {
    if (account.company.code === 106) {
      navigate("/accountBook");
    } else {
      navigate("/accountDetail");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkSended();
      checkvisible();
    }, 3000);
  });
  return (
    <div className={styles.container}>
      <Lottie animationData={transfer} loop={true} />
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
        <button onClick={() => goToDetail()} className={styles.subbutton}>
          확인
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Transfering;
