import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BankAccount.module.scss";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "../../store/slices/accountSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function BankAccount() {
  const [accountList, setAccountList] = useState<any>(null);
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getBankList();
  }, []);

  const getBankList = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountList);
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
    <div className={styles.container}>
      {accountList && accountList.length !== 0 ? (
        [...accountList].map((account, index) => (
          <div className={styles.account} key={index}>
            <img src={account.company.logo} className={styles.logoimg}/>
            <div className={styles.accountbox}>
              <p className={styles.text}>{account.account.name}</p>
              <p className={styles.balance}>{account.account.no}</p>
            </div>
            <button className={`${styles.subbutton} ${styles.accountbutton}`} onClick={() => goToAccountDetail(account)}><span>송금</span></button>
          </div>
        ))
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
    </div>
  );
}

export default BankAccount;
