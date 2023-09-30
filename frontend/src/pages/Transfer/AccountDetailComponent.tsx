import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AccountDetail.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import { setTradeHistorys } from "../../store/slices/tradeHistorySlice";
import { setBalance } from "../../store/slices/accountSlice";
import TradeHistory from "../../components/Transfer/TradeHistory";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";

function AccountDetailComponent(props) {
  const [tradeHistoryDict, setTradeHistoryDict] = useState<any>(null);
  const account = props.isFinBall
    ? useSelector((state) => state.finBallAccount)
    : useSelector((state) => state.account);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshIconStyle = { fontSize: 12 };

  useEffect(() => {
    console.log(account.company.code);
    getHistory(
      props.isFinBall
        ? "/api/fin-ball/history"
        : account.company.code === 106
          ? "/api/fin-ball/history"
          : `/api/user/account/${account.account.no}`
    );
    refreshBalance();
  }, []);

  const getHistory = (url) => {
    axios
      .get(`${BASE_HTTP_URL}${url}`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {

        let index = 0;
        console.log(url);
        console.log(response);
        dispatch(
          setTradeHistorys({
            tradeHistory: response.data.data.tradeHistoryList,
          })
        );

        setTradeHistoryDict(
          response.data.data.tradeHistoryList.reduce((dict, tradeHistory) => {
            const groupKey = tradeHistory.date;
            const clonedTradeHistory = { ...tradeHistory }; // 객체 복제
            clonedTradeHistory.index = index++;
            if (!dict[groupKey]) {
              dict[groupKey] = [];
            }
            dict[groupKey].push(clonedTradeHistory);

            return dict;
          }, {})
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshBalance = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account/balance/${account.account.no}`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        dispatch(setBalance(response.data.data.balance));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {account && (
        <div className={styles.container}>
          <p className={styles.bankAccount}>
            {account.company.name}은행 {account.account.no}
          </p>
          <p className={styles.balance}>{account.account.balance}원</p>
          <div className={styles.buttonBox}>
            <button
              onClick={() => navigate("/fillAccount")}
              className={styles.fill}
            >
              채우기
            </button>
            <button
              className={styles.send}
              onClick={() => navigate("/transferAccount")}
            >
              보내기
            </button>
          </div>

          <div className={styles.date}>
            <p className={styles.total}>전체</p>
            <p className={styles.bankAccount}>
              방금전 <RefreshIcon style={refreshIconStyle} />
            </p>
          </div>

          <TradeHistory tradeHistoryDict={tradeHistoryDict} isFinBall={props.isFinBall} />
        </div>
      )}
    </>
  );
}

export default AccountDetailComponent;
