import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AccountList.module.css";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountDetail() {
  const location = useLocation();
  const account = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(account);
    axios
      .get(`${BASE_HTTP_URL}/user/account/${account.accountNo}`, {
        headers: {
          // Authorization: token.accessToken,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [account]);

  return (
    <>
      {account && (
        <div>
          <div>
            {account.company.cpName}은행 {account.accountNo}
          </div>
          <div>{account.balance}원</div>
          <div>
            <button>채우기</button>
            <button>보내기</button>
          </div>

          <p>전체</p>
          <p>방금전</p>
        </div>
      )}
    </>
  );
}

export default AccountDetail;
