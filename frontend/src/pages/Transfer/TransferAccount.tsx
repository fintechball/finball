import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import styles from "./TransferAccount.module.css";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferAccount() {
  const location = useLocation();
  const account = useSelector((state) => state.account);
  const [isEnterAccount, setIsEnterAccount] = useState(false);
  const [showBankList, setShowBankList] = useState(false);
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [bankList, setBankList] = useState(null);
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState<string>("");
  const [accessToken, setAccessToken] = useState<String>("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const enterAccount = () => {
    if (!isEnterAccount) {
      setIsEnterAccount(true);
    } else {
      setShowNumberPad(true);
    }
  };

  const cancelEnterAccount = () => {
    if (isEnterAccount) {
      setIsEnterAccount(false);
      setBankName("");
      setBankAccount("");
      setIsError(false);
    }
  };

  // 은행 선택 관련
  const showBank = () => {
    setShowBankList(true);
    if (bankList === null) {
      axios
        .get(`https://j9e106.p.ssafy.io/api/company/bank`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log(response);
          setBankList(response.data.data.companyList);
        })
        .catch((err) => {
          console.log("삐빅", err);
        });
    }
  };

  useEffect(() => {
    const handleShowBankList = (e) => {
      if (showBankList && e.target.id !== "selectBank") {
        setShowBankList(false);
      }
    };

    document.addEventListener("click", handleShowBankList);

    return () => {
      document.removeEventListener("click", handleShowBankList);
    };
  }, [showBankList]);

  // 계좌번호 입력 관련
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

  const clickButton = (number) => {
    if (number === "<-") {
      setBankAccount(bankAccount.slice(0, -1));
    } else {
      setBankAccount(bankAccount + number);
    }
  };

  // 계좌번호와 은행의 입력이 모두 끝난 경우
  useEffect(() => {
    if (
      bankAccount !== "" &&
      bankName !== "" &&
      !showBankList &&
      !showNumberPad
    ) {
      console.log("상대방을 찾아주자");
      const find = false;
      // 상대방의 계좌를 찾아서 있는 경우는 다음으로 넘어가고
      if (find) {
        navigate("/transferValue", {
          state: {
            currentAccount: currentAccount,
            oppositeAccount: currentAccount,
          },
        });
      }
      // 상대방의 계좌가 존재하지 않는다면 에러 메시지 뿌려주기
      else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  }, [showBankList, showNumberPad]);

  const find = () => {};

  return (
    <>
      {isEnterAccount && <button onClick={cancelEnterAccount}>뒤로가기</button>}

      <div>어디로 돈을 보낼까요</div>
      <input
        id="numberPad"
        onClick={enterAccount}
        value={bankAccount}
        placeholder="계좌번호 입력"
      ></input>

      {isEnterAccount ? (
        <>
          <input
            id="selectBank"
            onClick={showBank}
            value={bankName}
            placeholder="은행 선택"
          ></input>
          {bankList && (
            <Slide direction="up" in={showBankList} mountOnEnter unmountOnExit>
              <Box sx={{ flexGrow: 1 }}>
                <div>은행을 선택해주세요</div>
                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 6, sm: 8, md: 12 }}
                >
                  {[...bankList].map((bank, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                      <div onClick={() => setBankName(bank.name)}>
                        <img className={styles.bank} src={bank.logo}></img>
                        <p>{bank.name}</p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Slide>
          )}
        </>
      ) : (
        <>
          <div>내 계좌</div>
          <div>최근 보낸 계좌</div>
          <img src={account.company.logo} width={50} height={50} />
          <div>
            <p>{account.account.name}</p>
            <p>{account.account.balance}</p>
          </div>
          <button
            onClick={() =>
              navigate("/transferValue", {
                state: {
                  currentAccount: account,
                  oppositeAccount: account,
                },
              })
            }
          >
            송금
          </button>
        </>
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

      {isError && <p>해당하는 계좌가 없습니다!! 다시 입력하세요</p>}
    </>
  );
}

export default TransferAccount;
