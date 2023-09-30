import PinballJeongHui from "../../pages/Pinball/PinballJeongHui";
import styles from "./TestPage.module.scss";

function JeongHui() {
  return (
    <div className={styles.minicontainer}>
      <h2>김정희 테스트</h2>
      <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
        <PinballJeongHui
          value={{ parent: "home-canvas", width: "300px", height: "150px" }}
        />
      </div>
    </div>
  );
}

export default JeongHui;
