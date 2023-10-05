import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import transfer from "../../assets/transfer.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { setHistory } from "../../store/slices/groupfinballSlice";
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
    <>
      <Lottie animationData={transfer} loop={true} />
      <div>{receiverName}님께</div>
      {sended ? (
        <div>{sendMoney.toLocaleString()}원을 송금했어요</div>
      ) : (
        <div>{sendMoney.toLocaleString()}원을 송금중이에요</div>
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
          onClick={() => navigate("/game")}
        >
          확인
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default TransferingGroupAccount;
