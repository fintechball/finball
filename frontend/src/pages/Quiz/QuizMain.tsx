import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Quiz.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { setQuiz, setIndex } from "../../store/slices/quizSlice";
import { RootState } from "../../store/store";
import yellowball from "../../assets/yellowball.png";
import clock from "../../assets/clock.png";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function QuizMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const quiz = useSelector((state: RootState) => state.quiz);
  const [progress, setProgress] = useState(100);

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
            <p className={styles.text}>오늘의 퀴즈를 모두 풀었습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizMain;
