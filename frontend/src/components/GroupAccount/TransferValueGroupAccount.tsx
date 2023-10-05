import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TransferValueGroupAccount.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { setPayment, setHistory } from "../../store/slices/groupfinballSlice";
const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferValueGroupAccount() {
  const auth = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const opposite = useSelector((state) => state.opposite);
  const [value, setValue] = useState<string>("");
  const [showNumberPad, setShowNumberPad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        console.log(value);
        dispatch(
          setPayment({
            payment: value,
          })
        );
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
      <h2 className={styles.bigText}>{account.account.name} 에서</h2>
      <p className={styles.smallText}>
        잔액 {account.account.balance.toLocaleString()}원
      </p>

      <p className={styles.bigText}>{opposite.opposite.name} 에게</p>
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
        readOnly={true}
      />

      {!value && !showNumberPad && (
        <button className={styles.totalBalanceButton} onClick={transferAll}>
          잔액{account.account.balance.toLocaleString()}원 입력
        </button>
      )}

{showNumberPad && (
  <div className={styles.keypadcontainer}>
    <div className={styles.keypad}>
      {[
        ...["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "<-"],
      ].map((number, index) => (
        <div
        className={styles.buttonbox}
          key={index}
          onClick={() => clickButton(number)}
          id="numberPad"
        >
            {number}
        </div>
      ))}
    </div>
  </div>
)}

      {value && !showNumberPad && (
        <>
        <div className={styles.textbox}>
          <h3>{value.toLocaleString()}원을 옮길까요?</h3>

        </div>
          <div className={styles.transfer}>
            <div>
              <button className={styles.smallButton}>
                받는 분에게 표시 : {account.account.name}
              </button>
            </div>
            <div>
              <button className={styles.bigButton} onClick={doTransfer}>
                옮기기
              </button>
            </div>
            {/* <p className={styles.smallText}>평생 수수료 무료</p> */}
          </div>
        </>
      )}
    </div>
  );
}

export default TransferValueGroupAccount;
