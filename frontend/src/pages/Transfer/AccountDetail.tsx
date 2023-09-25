import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountDetail() {
  const [accessToken, setAccessToken] = useState<String>("");
  const [tradeHistoryList, setTradeHistoryList] = useState<any>([]);
  const account = useSelector((state) => state.account);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(account);
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;
      if (accessToken) {
        setAccessToken(accessToken);
        getTradeHistory(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const getTradeHistory = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account/${account.account.no}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setTradeHistoryList(response.data.data.tradeHistoryDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {account && (
        <div>
          <div>
            {account.company.name}은행 {account.account.no}
          </div>
          <div>{account.account.balance}원</div>
          <div>
            <button>채우기</button>
            <button onClick={() => navigate("/transferAccount")}>보내기</button>
          </div>

          <p>전체</p>
          <p>방금전</p>
          {[...tradeHistoryList].map((tradeHistory, index) => (
            <div key={index}>
              <div>{tradeHistory.date}</div>
              <div>{tradeHistory.time}</div>
              <div>{tradeHistory.opposite.userName}</div>
              <div>{tradeHistory.balance}</div>
              <div>{tradeHistory.remain}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AccountDetail;
