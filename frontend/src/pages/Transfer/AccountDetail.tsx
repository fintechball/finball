import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AccountDetail.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import { setTradeHistorys } from "../../store/slices/tradeHistorySlice";
import { setBalance } from "../../store/slices/accountSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountDetail() {
  const [tradeHistoryDict, setTradeHistoryDict] = useState<any>(null);
  const account = useSelector((state) => state.account);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshIconStyle = { fontSize: 12 };

  useEffect(() => {
    getHistory();
    refreshBalance();
  }, []);

  const getHistory = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account/${account.account.no}`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        dispatch(
          setTradeHistorys({
            tradeHistory: response.data.data.tradeHistoryDtoList,
          })
        );
        setTradeHistoryDict(
          response.data.data.tradeHistoryDtoList.reduce(
            (dict, tradeHistory) => {
              const groupKey = tradeHistory.date;
              if (!dict[groupKey]) {
                dict[groupKey] = [];
              }
              dict[groupKey].push(tradeHistory);
              return dict;
            },
            {}
          )
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
            <button className={styles.fill}>채우기</button>
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

          {tradeHistoryDict &&
            Object.keys(tradeHistoryDict).map((key) =>
              tradeHistoryDict[key].map((tradeHistory, index) => (
                <>
                  {index === 0 ? (
                    <p className={styles.bankAccount}>
                      {key.split("-")[1]}월 {key.split("-")[2]}일
                    </p>
                  ) : (
                    <></>
                  )}
                  <div className={styles.part}>
                    <div>
                      <p className={styles.name}>
                        {tradeHistory.oppositeDto.userName}
                      </p>
                      <p className={styles.time}>{tradeHistory.time}</p>
                    </div>
                    <div className={styles.money}>
                      <p className={styles.value}>{tradeHistory.value}원</p>
                      <p className={styles.remain}>{tradeHistory.remain}원</p>
                    </div>
                  </div>
                </>
              ))
            )}
        </div>
      )}
    </>
  );
}

export default AccountDetail;
