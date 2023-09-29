import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./TransferGroupAccount.module.css";
import { setOpposite } from "../../store/slices/oppositeSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function OppositeShortGroupAccount() {
  const [recentSendAccount, setRecentSendAccount] = useState<Array<any>>([]);
  const auth = useSelector((state) => state.auth);
  const tradeHistory = useSelector((state) => state.tradeHistory);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    removeDuplicates(tradeHistory.tradeHistory);
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setUserAccountList(response.data.data.userAccountList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const removeDuplicates = (tradeHistoryList) => {
    const uniqueMap = new Map();

    const uniqueArray = tradeHistoryList.filter((tradeHistory) => {
      const id = tradeHistory.opposite.accountNo;

      if (!uniqueMap.has(id)) {
        uniqueMap.set(id, true);
        return true;
      }

      return false;
    });

    const recentOppositeAccount = new Array<Object>();

    uniqueArray.map((element) => {
      const object = {
        opposite: element.opposite,
      };
      // setRecentSendAccount((recent) => recent.push(object));
      recentOppositeAccount.push(object);
    });

    setRecentSendAccount(recentOppositeAccount);
  };

  return (
    <>
      <div className={styles.smallText}>최근 보낸 계좌</div>
      {recentSendAccount &&
        [...recentSendAccount].map((recentAccount, index) => (
          <div key={index} className={styles.account}>
            <img
              src={recentAccount.opposite.company.logo}
              width={50}
              height={50}
            />
            <div>
              <p className={styles.balance}>
                {recentAccount.opposite.userName}
              </p>
              <p className={styles.text}>
                {recentAccount.opposite.company.name}
                {recentAccount.opposite.accountNo}
              </p>
            </div>
            <button
              onClick={() => {
                dispatch(
                  setOpposite({
                    opposite: {
                      accountNo: recentAccount.opposite.accountNo,
                      company: recentAccount.opposite.company,
                      name: recentAccount.opposite.userName,
                    },
                    // opposite: recentAccount.opposite,
                  })
                );
                navigate("/transferValueGroupAccount");
              }}
            >
              송금
            </button>
          </div>
        ))}
    </>
  );
}

export default OppositeShortGroupAccount;
