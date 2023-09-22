import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferAccount() {
  const location = useLocation();
  const currentAccount = location.state;
  const token = useSelector((state) => state.token);
  const [accountNumber, setAccountNumber] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //   .get(`${BASE_HTTP_URL}/api/user/account`, {
    //     headers: {
    //       // Authorization: token.accessToken,
    //       Authorization: localStorage.getItem("accessToken"),
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [token]);

  useEffect(() => {
    console.log(accountNumber);
  }, [accountNumber]);

  useEffect(() => {
    console.log(currentAccount);
  });

  return (
    <>
      <div>어디로 돈을 보낼까요</div>
      <input onChange={(event) => setAccountNumber(event.target.value)}></input>
      <div>내 계좌</div>
      <div>최근 보낸 계좌</div>
      <img src={currentAccount.company.cpLogo} width={50} height={50} />
      <div>
        <p>{currentAccount.name}</p>
        <p>{currentAccount.balance}</p>
      </div>
      <button
        onClick={() =>
          navigate("/transferValue", {
            state: {
              currentAccount: currentAccount,
              oppositeAccount: currentAccount,
            },
          })
        }
      >
        송금
      </button>
    </>
  );
}

export default TransferAccount;
