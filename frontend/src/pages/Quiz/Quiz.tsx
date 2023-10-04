import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Quiz.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { setQuiz, setIndex } from "../../store/slices/quizSlice";
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { RootState } from "../../store/store";
import yellowball from "../../assets/yellowball.png";
import clock from "../../assets/clock.png";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const quiz = useSelector((state: RootState) => state.quiz);
  const [progress, setProgress] = useState(100);
  const [isGoodVisible, setIsGoodVisible] = useState(false);
  const [isBadVisible, setIsBadVisible] = useState(false);
  const [totalPoint, setTotalPoint] = useState(0);

  const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ededed",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 15,
      backgroundColor: "#eb4034",
    },
  }));

  // useEffect(() => {
  //   console.log(quiz);
  //   console.log(quiz.index);
  //   console.log(quiz.quiz);
  // }, []);

  useEffect(() => {
    setProgress(100);
    // 날짜가 다른 경우 quiz 불러옴
    if (quiz.date !== new Date().toDateString()) {
      getNewQuiz();
    }
    // 날짜가 같으면
    else {
      if (quiz.index !== 5) {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress <= 0) {
              bad();
              dispatch(setIndex(quiz.index + 1));
              return 100;
            }
            const diff = 0.1;
            return Math.min(oldProgress - diff, 100);
          });
        }, 10);

        return () => {
          clearInterval(timer);
        };
      } else {
        dispatch(setIndex(0));
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
        console.log(response.data.data);
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
      getPoint(Math.round(5 * progress));
      setTotalPoint(
        (prevTotalPoint) => prevTotalPoint + Math.round(5 * progress)
      );
    } else {
      bad();
    }
    dispatch(setIndex(quiz.index + 1));
    setProgress(100);
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
      <div className={styles.paper}>
        <div className={styles.title}>
          <h2>OX퀴즈</h2>
        </div>
        <div className={styles.body}>
          {quiz.quiz.length !== 0 && quiz.index < 5 ? (
            <div>
              <div className={styles.quiz}>
                <p className={styles.quiztext}>{quiz.quiz[quiz.index].body}</p>
              </div>
              <div className={styles.progress}>
                <img src={clock} alt="" />
                <RedLinearProgress variant="determinate" value={progress} />
              </div>
              <div className={styles.point}>
                <div className={styles.pointimg}>
                  <img src={yellowball} alt="" />
                </div>
                <div className={styles.pointtext}>
                  {Math.round(5 * progress)}
                </div>
                <div className={styles.pointpoint}>Point</div>
              </div>
            </div>
          ) : (
            <p className={styles.text}>오늘의 퀴즈를 모두 풀었습니다.</p>
          )}
          {isGoodVisible && (
            <div>
              <p>정답입니다!</p>
              <p>현재까지 획득한 포인트: {totalPoint}</p>
            </div>
          )}
          {isBadVisible && (
            <div>
              <p>오답입니다.</p>
              <p>현재까지 획득한 포인트: {totalPoint}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.answerButton}>
        <button className={styles.yes} onClick={() => checkAnswer(true)}>
          <span>O</span>
        </button>
        <button className={styles.no} onClick={() => checkAnswer(false)}>
          <span>X</span>
        </button>
      </div>
    </div>
  );
}

export default Quiz;
