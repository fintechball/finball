import CardContainer from "../../components/Card/CardContainer";
import BankAccountContainer from "../../components/BankAccount/BankAccountContainer";
import GroupAccountContainer from "../../components/GroupAccount/GroupAccountContainer";
import FinBallContainer from "../../components/FinBall/FinBallContainer";

import styles from "./Home.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDate } from "../../store/slices/quizSlice";

function Home() {
  const navigate = useNavigate();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const state = { parent: "home-canvas" };

  const auth = useSelector((state) => state.auth);
  const finBallAccount = useSelector((state) => state.finBallAccount);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>

      <div className={styles.minicontainer}>
        <h2>우리 계좌</h2>
        <FinBallContainer />
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

      <button onClick={() => dispatch(setDate("123123"))}>초기화</button>
    </div>
  );
}

export default Home;
