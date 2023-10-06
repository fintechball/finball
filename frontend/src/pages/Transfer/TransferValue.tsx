import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TransferValue.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Toast, { Error, Success, Normal } from "../../components/Toast/Toast";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

const makeAccount = () => {
  const opposite = useSelector((state) => state.opposite);
  const auth = useSelector((state) => state.auth);
  console.log(opposite);
  const account = {
    account: {
      no: opposite.opposite.accountNo,
      name: auth.name,
      balance: 0,
    },
    company: opposite.opposite.company,
  };

  return account;
};

let makeOpposite = () => {
  const account = useSelector((state) => state.account);
  const auth = useSelector((state) => state.auth);

  console.log(account);

  const opposite = {
    opposite: {
      accountNo: account.account.no,
      company: account.company,
      name: account.account.name,
    },
  };

  console.log(opposite);

  return opposite;
};

function TransferValue() {
  const location = useLocation();
  const fill = location.state?.fill;

  const auth = useSelector((state) => state.auth);
  let account = fill ? makeAccount() : useSelector((state) => state.account);
  const opposite = fill
    ? makeOpposite()
    : useSelector((state) => state.opposite);
  const [value, setValue] = useState<string>("");
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (fill) {
      console.log(opposite);
      getBalance(account.account.no);
    }
  }, []);

  useEffect(() => {
    if (value === "0" || value === "00") {
      setValue("");
    }
  }, [value]);

  const getBalance = (no) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account/balance/${no}`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setBalance(response.data.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    setValue(value + (fill ? balance : account.account.balance));
  };

  const doTransfer = () => {
    if (value > (fill ? balance : account.account.balance)) {
      Error(
        `최대 ${
          fill
            ? balance.toLocaleString()
            : account.account.balance.toLocaleString()
        }원을 이체할 수 있습니다.`
      );
    } else {
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
          navigate("/securitykeypad", {
            state: {
              money: parseInt(value),
              userName: opposite.opposite.name,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <Toast />
      <p className={styles.bigText}>내 {account.account.name}에서</p>
      <p className={styles.smallText}>
        잔액{" "}
        {fill
          ? balance.toLocaleString()
          : account.account.balance.toLocaleString()}
        원
      </p>

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
        // readOnly={true}
      />

      {!value && !showNumberPad && (
        <button className={styles.totalBalanceButton} onClick={transferAll}>
          잔액{" "}
          {fill
            ? balance.toLocaleString()
            : account.account.balance.toLocaleString()}
          원 입력
        </button>
      )}

      {/* {showNumberPad && (
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
      )} */}

      {value && !showNumberPad && (
        <>
          <div>{Number(value).toLocaleString()}원을 옮길까요?</div>
          <div className={styles.transfer}>
            <div>
              <button className={styles.smallButton}>
                받는 분에게 표시 {auth.name}
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

export default TransferValue;
