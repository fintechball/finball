import CardContainer from "../../components/Card/CardContainer";
import BankAccountContainer from "../../components/BankAccount/BankAccountContainer";
import GroupAccountContainer from "../../components/GroupAccount/GroupAccountContainer";
import FinBallContainer from "../../components/FinBall/FinBallContainer";
import styles from "./Home.module.scss";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../../store/slices/quizSlice";


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        <h2 onClick={() => navigate("/accountBook")}>우리 계좌</h2>
        <div className={styles.finballcontainer}>
          <FinBallContainer />
        </div>
      </div>
      <div className={styles.minicontainer}>
        <h2 onClick={() => navigate("/cardView")}>연결된 카드 목록</h2>
        <CardContainer />
      </div>
      <div className={styles.minicontainer}>
        <h2 onClick={() => navigate("/accountList")}>연결된 타행계좌 목록</h2>
        <BankAccountContainer />
      </div>
      <div className={styles.minicontainer}>
        <h2>연결된 모임통장 목록</h2>{" "}
        <GroupAccountContainer />
        <button onClick={() => navigate("/create/group-account")} className={`${styles.button} ${styles.groupaccountbutton}`}>
          + 모임 통장 생성하기
        </button>
      </div>
      <button onClick={() => dispatch(setDate("123123"))}>초기화</button>
      {/* <button onClick={() => navigate("/jeonghui")}>김정희 테스트</button> */}
    </div>
  );
}

export default Home;
