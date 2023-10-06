import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import styles from "./TransferGroupAccount.module.scss";
import { setOpposite } from "../../store/slices/oppositeSlice";
import OppositeShortGroupAccount from "./OppositeShortGroupAccount";
import { DeviceUnknown } from "@mui/icons-material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InputAdornment from "@mui/material/InputAdornment";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferGroupAccount() {
  const auth = useSelector((state) => state.auth);
  const [isEnterAccount, setIsEnterAccount] = useState(false);
  const [showBankList, setShowBankList] = useState(false);
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [bankList, setBankList] = useState(null);
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        .get(`${BASE_HTTP_URL}/api/company/bank`, {
          headers: {
            Authorization: auth.accessToken,
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
      console.log(bankName.code);
      console.log(bankAccount);
      find();
    } else {
      setIsError(false);
    }
  }, [showBankList, showNumberPad]);

  const find = () => {
    console.log("do find!!!");
    axios
      .post(
        `${BASE_HTTP_URL}/api/user/opposite/account`,
        {
          code: bankName.code,
          originNo: bankAccount,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          setOpposite({
            opposite: response.data.data.oppositeAccountDto,
          })
        );
        navigate("/transferValueGroupAccount");
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      {isEnterAccount && (
        <button onClick={cancelEnterAccount} className={styles.bluebutton}>
          <KeyboardArrowLeftIcon />
          뒤로가기
        </button>
      )}

      <h2 className={styles.bigText}>어디로 돈을 보낼까요?</h2>
      {/* <p>받는 분의 정보를 입력해 주세요.</p> */}
      <div className={styles.accountbox}>
        <span>계좌번호</span>
        <input
          className={styles.inputstylenone}
          id="numberPad"
          onClick={enterAccount}
          value={bankAccount}
          placeholder="계좌번호 입력"
          readOnly={true}
        ></input>
      </div>

      {isEnterAccount ? (
        <div className={styles.bankbox}>
          <span>은행</span>
          <input
            className={styles.inputStyle}
            id="selectBank"
            onClick={showBank}
            value={bankName.name}
            placeholder="은행 선택"
            readOnly={true}
          ></input>
          <br />
          {bankList && (
            <Slide direction="up" in={showBankList} mountOnEnter unmountOnExit>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 6, sm: 8, md: 12 }}
                >
                  {[...bankList].map((bank, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                      <div onClick={() => setBankName(bank)}>
                        <img className={styles.bank} src={bank.logo}></img>
                        <p>{bank.name}</p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Slide>
          )}
        </div>
      ) : (
        <OppositeShortGroupAccount />
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

      {isError && <p>해당하는 계좌가 없습니다. 다시 입력해 주세요.</p>}
    </div>
  );
}

export default TransferGroupAccount;
