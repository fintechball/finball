import Pinball from "../Pinball/Pinball";
import styles from "./Home.module.css";
function Home() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        <h2>우리 계좌</h2>
        <div id="home-canvas" style={{ width: "300px", height: "300px" }}>
          <Pinball />
        </div>
      </div>

      <div className={styles.minicontainer}>
        <h2>연결된 카드 목록</h2>
      </div>
    </div>
  );
}

export default Home;
