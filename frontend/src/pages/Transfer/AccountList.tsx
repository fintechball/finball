import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./AccountList.module.css";
import AccountShort from "../../components/Transfer/AccountShort";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountList() {
  const [accountList, setAccountList] = useState<any>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getOtherBankAccount();
    getFinBallAccountList();
  }, []);

  const getOtherBankAccount = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setAccountList((prevList) => [
          ...prevList,
          ...response.data.data.userAccountList,
        ]);
        setTotalBalance(
          (prevValue) => prevValue + response.data.data.totalBalance
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFinBallAccountList = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setAccountList((prevList) => [...prevList, response.data.data]);
        setTotalBalance(
          (prevValue) => prevValue + response.data.data.account.balance
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {accountList.length != 0 ? (
        <div className={styles.container}>
          <p className={styles.part}>총자산</p>
          <div className={styles.total}>
            <p className={styles.balance}>{totalBalance}원</p>
            <button onClick={() => navigate("/company/bank")}>추가 등록</button>
          </div>

          <AccountShort accountList={accountList} />
        </div>
      ) : (
        <>
          <div className={styles.noncontainer}>
            <p>연결된 계좌가 없습니다.</p>
            <button onClick={() => navigate("/company/bank")}>
              + 계좌 연결하기
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AccountList;
