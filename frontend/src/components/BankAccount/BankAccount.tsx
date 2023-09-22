import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function BankAccount() {
  const [accountList, setAccountList] = useState<any>(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/user/account/simple`, {
        headers: {
          // Authorization: token.accessToken,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountSimpleList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      {accountList ? (
        [...accountList].map((account, index) => (
          <div key={index}>
            <img src={account.bankImage} width={50} />
            <p>{account.name}</p>
            <p>{account.account}</p>
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
