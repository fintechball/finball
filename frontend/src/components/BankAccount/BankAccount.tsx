import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BankAccount.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function BankAccount() {
  const navigate = useNavigate();
  const [accountList, setAccountList] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<String>("");

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);
        getBankList(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const getBankList = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account/simple`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountSimpleList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transfer = (accountId) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        const userAccountList = response.data.data.userAccountList;
        navigate("/accountDetail", {
          state: userAccountList.find((item) => item.accountNo === accountId),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {accountList && accountList.length !== 0 ? (
        [...accountList].map((account, index) => (
          <div className={styles.container} key={index}>
            <img src={account.bankImage} width={50} height={50} />
            <div>
              <p>{account.name}</p>
              <p>{account.account}</p>
            </div>
            <button onClick={() => transfer(account.account)}>송금</button>
          </div>
        ))
      ) : (
        <>
          <div className={styles.noncontainer}>
            <div>연결된 계좌가 없습니다.</div>
            <button onClick={() => navigate("/company/bank")}>
              계좌 연결하기
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default BankAccount;
