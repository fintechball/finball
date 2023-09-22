import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountDetail() {
  const location = useLocation();
  const account = location.state;
  const [tradeHistoryList, setTradeHistoryList] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/user/account/${account.accountNo}`, {
        headers: {
          // Authorization: token.accessToken,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setTradeHistoryList(response.data.data.tradeHistoryDtoList);
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
            <button onClick={() => navigate("/")}>보내기</button>
          </div>

          <p>전체</p>
          <p>방금전</p>
          {[...tradeHistoryList].map((tradeHistory, index) => (
            <div key={index}>
              <div>{tradeHistory.date}</div>
              <div>{tradeHistory.time}</div>
              <div>{tradeHistory.oppositeBankDto.target}</div>
              <div>{tradeHistory.value}</div>
              <div>{tradeHistory.remain}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AccountDetail;
