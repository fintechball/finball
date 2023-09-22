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
  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        <h2>우리 계좌</h2>

        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          <Pinball />
          <div style={{position:"relative",top:"25px",left:"200px",margin:"opx",fontWeight:"bold",fontSize:"15px",width:"90px"}}>5,000,000원</div>
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
