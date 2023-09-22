import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BankAccount.module.scss";
import { useNavigate } from "react-router-dom";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function BankAccount() {
  const navigate = useNavigate();
  const [accountList, setAccountList] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/user/account`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        setAccountList(response.data.data.getCardDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {accountList && accountList.length !== 0 ? (
        [...accountList].map((account, index) => (
          <div key={index}>
            <img src={account.cardImage} width={200} />
            <p>{account.cardName}</p>
          </div>
        ))
      ) : (
        <>
          <div>연결된 계좌가 없습니다.</div>
          <button onClick={() => navigate("/company/bank")}>
            계좌 연결하기
          </button>
        </>
      )}
    </div>
  );
}

export default BankAccount;
