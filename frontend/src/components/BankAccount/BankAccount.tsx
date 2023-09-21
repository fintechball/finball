import { useEffect, useState } from "react";
import axios from "axios";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function BankAccount() {
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
    <div>
      {accountList ? (
        [...accountList].map((account, index) => (
          <div key={index}>
            <img src={account.cardImage} width={200} />
            <p>{account.cardName}</p>
          </div>
        ))
      ) : (
        <>
          <div>연결된 계좌가 없습니다.</div>
          <button>계좌 연결하기</button>
        </>
      )}
    </div>
  );
}

export default BankAccount;
