import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import transfer2 from "../../assets/transfer2.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { setHistory } from "../../store/slices/groupfinballSlice";
import { StylesProvider } from "@material-ui/core";
import styles from "./TransferingGroupAccount.module.scss"
function TransferingGroupAccount() {
  const location = useLocation();
  const sendMoney = location.state.money;
  const navigate = useNavigate();
  const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";
  const receiverName = location.state.userName;
  const accountno=useSelector((state) => state.groupfinball.accountno)
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [sended, setSended] = useState(false);
  const [isbutton, setIsButton] = useState(false);
  const dispatch = useDispatch();
  function checkSended() {
    setSended(true);
  }
  function checkvisible() {
    setIsButton(true);
  }
  function findhistory(){
    axios
      .get(`${BASE_HTTP_URL}/api/group/account/`+accountno, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.data.tradeHistory)
        dispatch(setHistory({
          history:res.data.data.tradeHistory
        }))

      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    findhistory()
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
        <p><span>{sendMoney.toLocaleString()}원</span>을 송금했어요</p>
      ) : (
        <p><span>{sendMoney.toLocaleString()}원</span>을 송금중이에요</p>
      )}
      {isbutton ? (
        <button
          onClick={() => navigate("/game")}
          className={styles.subbutton}
        >
          확인
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TransferingGroupAccount;
