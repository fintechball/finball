import CardContainer from "../../components/Card/CardContainer";
import BankAccountContainer from "../../components/BankAccount/BankAccountContainer";
import GroupAccountContainer from "../../components/GroupAccount/GroupAccountContainer";

import Pinball from "../Pinball/Pinball";
import styles from "./Home.module.css";

function Home() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        <h2>우리 계좌</h2>

        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          <div style={{position:"absolute",right:"45px",fontWeight:"bold",fontSize:"15px"}}>5,000,000원</div>
          <Pinball />
        </div>
      </div>

      <div className={styles.minicontainer}>
        <h2>연결된 카드 목록</h2>
        <CardContainer />
      </div>

      <div className={styles.minicontainer}>
        <h2>연결된 타행계좌 목록</h2>
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
