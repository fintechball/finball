import CardContainer from "../../components/Card/CardContainer";
import BankAccountContainer from "../../components/BankAccount/BankAccountContainer";
import GroupAccountContainer from "../../components/GroupAccount/GroupAccountContainer";

import Pinball from "../Pinball/Pinball";
import styles from "./Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFinBallAccount } from "../../store/slices/finBallAccountSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Home() {
  const navigate = useNavigate();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const state = { cost: "5,000,000", parent: "home-canvas" };

  const auth = useSelector((state) => state.auth);
  const finBallAccount = useSelector((state) => state.finBallAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    getFinBAllAccount();
  }, []);

  const getFinBAllAccount = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        if (finBallAccount.account.no !== undefined) {
          console.log("차액");
          console.log(
            response.data.data.account.balance - finBallAccount.account.balance
          );
        }
        dispatch(
          setFinBallAccount({
            account: response.data.data.account,
            company: response.data.data.company,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        <h2>우리 계좌</h2>
        <button onClick={() => navigate("/create/finball/auth")}>
          핀볼 계좌 생성하기
        </button>
        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          <Pinball value={{parent: "home-canvas",width: "300px", height: "150px"}} />
        </div>
      </div>

      <div className={styles.minicontainer}>
        <h2>연결된 카드 목록</h2>
        <CardContainer />
      </div>

      <div className={styles.minicontainer}>
        <h2 onClick={() => navigate("/accountList")}>연결된 타행계좌 목록</h2>
        <BankAccountContainer />
      </div>

      <div className={styles.minicontainer}>
        <h2>연결된 모임통장 목록</h2>
        <GroupAccountContainer />
      </div>
    </div>
  );
}

export default Home;
