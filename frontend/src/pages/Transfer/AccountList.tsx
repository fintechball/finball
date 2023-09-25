import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AccountList.module.css";
import { setAccount } from "../../store/slices/accountSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountList() {
  const [accountList, setAccountList] = useState<any>([]);
  const [accessToken, setAccessToken] = useState<String>("");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);
        getAccountList(accessToken);
        getFinBallAccountList(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const getAccountList = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountList);
        setTotalBalance(response.data.data.totalBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <div>
        <div>총자산</div>
        <div>
          {totalBalance}
          <button>분석</button>
        </div>

        <div>입출금</div>
        {accountList.length != 0 ? (
          [...accountList].map((account, index) => (
            <div className={styles.container} key={index}>
              <img className={styles.leftAlign} src={account.company.logo} />
              <div className={(styles.leftAlign, styles.rightAlign)}>
                <p>{account.account.name}</p>
                <p>{account.account.balance}</p>
              </div>
              <button
                className={styles.rightAlign}
                onClick={() => goToAccountDetail(account)}
              >
                송금
              </button>
            </div>
          ))
        ) : (
          <>
            <div>연결된 계좌가 없습니다.</div>
            <button>계좌 연결하기</button>
          </>
        )}
      </div>
    </>
  );
}

export default AccountList;
