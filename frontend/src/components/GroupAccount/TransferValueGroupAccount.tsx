import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TransferValueGroupAccount.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferValueGroupAccount() {
  const auth = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const opposite = useSelector((state) => state.opposite);
  const [value, setValue] = useState<string>("");
  const [showNumberPad, setShowNumberPad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(account);
    console.log(opposite);
    console.log(auth);
  }, []);

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
    setValue(value + account.account.balance);
  };

  const doTransfer = () => {
    console.log(account);
    console.log(opposite);
    console.log(auth);
    axios
      .post(
        `${BASE_HTTP_URL}/api/user/transfer`,
        {
          minusBank: {
            accountNo: account.account.no,
            companyId: account.company.code,
            userName: auth.name,
            balance: null, //  finball 계좌는 서버에서 balance 넣어줘야됨
          },
          plusBank: {
            accountNo: opposite.opposite.accountNo,
            companyId: opposite.opposite.company.code,
            userName: opposite.opposite.name,
            balance: null, //  finball 계좌는 서버에서 balance 넣어줘야됨
          },
          value: value,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then(() => {
        navigate("/transferingGroupAccount", {
          state: {
            money: parseInt(value),
            userName: opposite.opposite.name,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className={styles.container}>
      <p className={styles.bigText}>내 {account.account.name}에서</p>
      <p className={styles.smallText}>잔액 {account.account.balance}원</p>

      <p className={styles.bigText}>{opposite.opposite.name}에게</p>
      <p className={styles.smallText}>
        {opposite.opposite.company.name}
        {opposite.opposite.accountNo}
      </p>
      <input
        className={styles.inputStyle}
        id="numberPad"
        value={value}
        placeholder="얼마나 옮길까요?"
        onClick={ShowNumberPad}
      />

      {!value && !showNumberPad && (
        <button className={styles.totalBalanceButton} onClick={transferAll}>
          잔액{account.account.balance}원 입력
        </button>
      )}

      {showNumberPad && (
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
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
        <>
          <div>{value}원을 옮길까요?</div>
          <div className={styles.transfer}>
            <div>
              <button className={styles.smallButton}>
                받는 분에게 표시 {account.account.name}
              </button>
            </div>
            <div>
              <button className={styles.bigButton} onClick={doTransfer}>
                옮기기
              </button>
            </div>
            <p className={styles.smallText}>평생 수수료 무료</p>
          </div>
        </>
      )}
    </div>
  );
}

export default TransferValueGroupAccount;
