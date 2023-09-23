import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TransferValue.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferValue() {
  const location = useLocation();
  const accountObject = location.state;
  const token = useSelector((state) => state.token);
  const [value, setValue] = useState<string>("");
  const [showNumberPad, setShowNumberPad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(accountObject);
  }, [accountObject]);

  const clickButton = (number) => {
    if (number === "<-") {
      setValue(value.slice(0, -1));
    } else {
      setValue(value + number);
    }
  };

  const ShowNumberPad = () => {
    setShowNumberPad(true);
  };

  const transferAll = () => {
    setValue(value + accountObject.currentAccount.balance);
  };

  const doTransfer = () => {
    // 여기 수정 들어가야 됨
    // axios
    //   .post(
    //     `${BASE_HTTP_URL}/api/user/transfer`,
    //     {
    //       name: "",
    //       plusBankCode: accountObject.oppositeAccount.id,
    //       plusAccountNumber: accountObject.oppositeAccount.accountNo,
    //       minusBankCode: accountObject.currentAccount.id,
    //       minusAccountNumber: accountObject.currentAccount.accountNo,
    //       value: value,
    //       password: "",
    //     },
    //     {
    //       headers: {
    //         // Authorization: token.accessToken,
    //         Authorization: localStorage.getItem("accessToken"),
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    navigate("/transfering", { state: parseInt(value) });
  };

  useEffect(() => {
    const handleNumberPad = (e) => {
      if (showNumberPad && e.target.id !== "numberPad") {
        setShowNumberPad(false);
      }
    };

    document.addEventListener("click", handleNumberPad);

    return () => {
      document.removeEventListener("click", handleNumberPad);
    };
  }, [showNumberPad]);

  return (
    <>
      <div>내 {accountObject.currentAccount.name}에서</div>
      <div>잔액 {accountObject.currentAccount.balance}원</div>

      <div>{accountObject.currentAccount.name}으로</div>
      <div>
        {accountObject.currentAccount.company.cpName}
        {accountObject.currentAccount.accountNo}
      </div>
      <input
        id="numberPad"
        value={value}
        placeholder="얼마나 옮길까요?"
        onClick={ShowNumberPad}
      />

      {!value && !showNumberPad && (
        <button onClick={transferAll}>
          잔액{accountObject.currentAccount.balance}원 입력
        </button>
      )}

      {showNumberPad && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 6, sm: 8, md: 12 }}
          >
            {[
              ...["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "<-"],
            ].map((number, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <button id="numberPad" onClick={() => clickButton(number)}>
                  {number}
                </button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {value && !showNumberPad && (
        <div>
          <div>{value}원을 옮길까요?</div>
          <div>받는 분에게 표시 {}</div>
          <button onClick={doTransfer}>옮기기</button>
          <div>평생 수수료 무료</div>
        </div>
      )}
    </>
  );
}

export default TransferValue;
