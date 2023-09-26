import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Quiz.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { setQuiz, setIndex } from "../../store/slices/quizSlice";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const quiz = useSelector((state) => state.quiz);
  const [progress, setProgress] = useState(0);
  const [isGoodVisible, setIsGoodVisible] = useState(false);
  const [isBadVisible, setIsBadVisible] = useState(false);

  useEffect(() => {
    setProgress(0);
    // 날짜가 다른 경우 quiz 불러옴
    if (quiz.date !== new Date().toDateString()) {
      getNewQuiz();
    }
    // 날짜가 같으면
    else {
      if (quiz.index !== 5) {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              bad();
              dispatch(setIndex(quiz.index + 1));
              return 0;
            }
            const diff = 0.1;
            return Math.min(oldProgress + diff, 100);
          });
        }, 10);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [quiz]);

  const getNewQuiz = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/quiz`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        dispatch(
          setQuiz({
            date: new Date().toDateString(),
            quiz: response.data.data.quizInfoList,
            index: 0,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  const checkAnswer = (answer) => {
    if (answer === quiz.quiz[quiz.index].answer) {
      good();
      getPoint(Math.round(5 * (100 - progress)));
    } else {
      bad();
    }
    dispatch(setIndex(quiz.index + 1));
    setProgress(0);
  };

  const getPoint = (point) => {
    axios
      .post(
        `${BASE_HTTP_URL}/api/user/quiz/point`,
        {
          point: point,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  const good = () => {
    setIsGoodVisible(true);

    // 1초 후에 컴포넌트를 숨김
    const timeout = setTimeout(() => {
      setIsGoodVisible(false);
    }, 500);

    // 컴포넌트가 언마운트될 때 타임아웃을 정리
    return () => clearTimeout(timeout);
  };

  const bad = () => {
    setIsBadVisible(true);

    // 1초 후에 컴포넌트를 숨김
    const timeout = setTimeout(() => {
      setIsBadVisible(false);
    }, 500);

    // 컴포넌트가 언마운트될 때 타임아웃을 정리
    return () => clearTimeout(timeout);
  };

  return (
    <div className={styles.container}>
      <h1>OX 퀴즈</h1>
      {quiz.index < 5 ? (
        <div>
          <p className={styles.text}>{quiz.quiz[quiz.index].body}</p>
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <p className={styles.text}>
            {Math.round(5 * (100 - progress))} Point
          </p>
        </div>
      ) : (
        <p className={styles.text}>오늘의 퀴즈를 모두 풀었습니다.</p>
      )}
      <div className={styles.answerButton}>
        <button className={styles.yes} onClick={() => checkAnswer(true)}>
          O
        </button>
        <button className={styles.no} onClick={() => checkAnswer(false)}>
          X
        </button>
      </div>
      {/* <button onClick={() => dispatch(setIndex(0))}>초기화</button> */}
      {isGoodVisible && <SentimentSatisfiedAltIcon sx={{ fontSize: 50 }} />}
      {isBadVisible && <SentimentVeryDissatisfiedIcon sx={{ fontSize: 50 }} />}
    </div>
  );
}

export default Quiz;
