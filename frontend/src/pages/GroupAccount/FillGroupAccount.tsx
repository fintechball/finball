import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "../Transfer/TransferAccount.module.css";
import { setOpposite } from "../../store/slices/oppositeSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function FillGroupAccount() {
  const [userAccountList, setUserAccountList] = useState<Array<Object>>([]);
  const account = useSelector((state) => state.account);
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAccount();
    getFinBallAccountList();
  }, []);

  const getAccount = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setUserAccountList((prevList) => [
          ...prevList,
          ...response.data.data.userAccountList,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFinBallAccountList = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setUserAccountList((prevList) => [...prevList, response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bigText}>어디에서 돈을 가져올까요?</div>
      <div className={styles.smallText}>내 계좌</div>
      {userAccountList &&
        [...userAccountList].map((userAccount, index) => {
          if (userAccount.account.no === account.account.no) {
            return null; // 렌더링하지 않음
          }

          return (
            <div key={index} className={styles.account}>
              <img src={userAccount.company.logo} />
              <div>
                <p className={styles.balance}>{userAccount.account.name}</p>
                <p className={styles.text}>
                  {userAccount.company.name}
                  {userAccount.account.no}
                </p>
              </div>
              <button
                onClick={() => {
                  dispatch(
                    setOpposite({
                      opposite: {
                        accountNo: userAccount.account.no,
                        company: userAccount.company,
                        name: auth.name,
                      },
                    })
                  );
                  navigate("/transferValueGroupAccountFill", {
                    state: { fill: true },
                  });
                }}
              >
                채우기
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default FillGroupAccount;
