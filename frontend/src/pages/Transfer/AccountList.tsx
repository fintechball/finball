import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./AccountList.module.css";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountList() {
  const [accountList, setAccountList] = useState<any>([]);
  const token = useSelector((state) => state.token);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [finBallAccount, setFinBallAccount] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/user/account`, {
        headers: {
          // Authorization: token.accessToken,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountList);
        setTotalBalance(response.data.data.totalBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    //여기는 핀볼 계좌 정보 들고오는 로직 들어갈꺼임
    //핀볼 계좌 정보 가져오고 나서 totalBalance에 값 더해주기 ^^
  }, [accountList]);

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
              <img
                className={styles.leftAlign}
                src={account.company.cpLogo}
                width={50}
                height={50}
              />
              <div className={styles.leftAlign}>
                <p>{account.name}</p>
                <p>{account.balance}</p>
              </div>
              <button
                className={styles.rightAlign}
                onClick={() => navigate("/accountDetail", { state: account })}
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
