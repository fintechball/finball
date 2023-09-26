import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AccountList.module.css";
import { setAccount } from "../../store/slices/accountSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountList() {
  const [accountList, setAccountList] = useState<any>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountList);
        setTotalBalance(response.data.data.totalBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getFinBallAccountList = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        // setAccountList([...accountList, response.data.data.userAccountList]);
        // setTotalBalance(totalBalance + response.data.data.totalBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToAccountDetail = (account) => {
    // 리덕스에 저장
    dispatch(
      setAccount({
        account: account.account,
        company: account.company,
      })
    );
    navigate("/accountDetail");
  };

  return (
    <>
      {accountList.length != 0 ? (
        <div className={styles.container}>
          <p className={styles.part}>총자산</p>
          <div className={styles.total}>
            <p className={styles.balance}>{totalBalance}원</p>
            <button>분석</button>
          </div>

          <p className={styles.part}>입출금</p>
          {[...accountList].map((account, index) => (
            <div key={index} className={styles.account}>
              <img src={account.company.logo} />
              <div>
                <p className={styles.text}>{account.account.name}</p>
                <p className={styles.balance}>{account.account.balance}원</p>
              </div>
              <button onClick={() => goToAccountDetail(account)}>송금</button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div>연결된 계좌가 없습니다.</div>
          <button>계좌 연결하기</button>
        </>
      )}
    </>
  );
}

export default AccountList;
