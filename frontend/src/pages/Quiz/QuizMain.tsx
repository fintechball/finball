import styles from "./QuizMain.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function QuizMain() {
  const navigate = useNavigate();
  const quiz = useSelector((state: RootState) => state.quiz);

  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <div className={styles.title}>
          <h2>OX퀴즈</h2>
        </div>
        <div className={styles.body}>
          {quiz.date !== new Date().toDateString() ||
          (quiz.quiz.length !== 0 && quiz.index < 5) ? (
            <button onClick={() => navigate("/quiz")}>퀴즈 시작하기</button>
          ) : (
            <div className={styles.endbox}>
              <p>
                퀴즈를 모두 풀었습니다. <br />
                내일 다시 도전해주세요.
              </p>
              <div className={styles.btnbox}>
                <h3>오늘의 성적</h3>
              </div>
              <p>맞춘 갯수: {quiz.resultScore}/5</p>
              <p>획득한 포인트: {quiz.resultPoint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizMain;
