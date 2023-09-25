import CardContainer from "../../components/Card/CardContainer";
import BankAccountContainer from "../../components/BankAccount/BankAccountContainer";
import GroupAccountContainer from "../../components/GroupAccount/GroupAccountContainer";

import Pinball from "../Pinball/Pinball";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const state = { cost: "5,000,000", parent: "home-canvas" };

  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        <h2>우리 계좌</h2>
          <button onClick={() => navigate("/my-data/auth")}>
            핀볼 계좌 생성하기
          </button>
        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          <Pinball value={state}/>
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
