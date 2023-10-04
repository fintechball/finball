import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./QuizMain.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import yellowball from "../../assets/yellowball.png";

function QuizMain() {
  const navigate = useNavigate();
  const quiz = useSelector((state: RootState) => state.quiz);
  const auth = useSelector((state: RootState) => state.auth);
  const [point, setPoint] = useState<number>(0);

  const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

  const getPoint = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/point`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setPoint(response.data.data.point);
      });
  };

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <div className={styles.title}>
          <h2>OX퀴즈</h2>
        </div>
        <div className={styles.body}>
          {quiz.date !== new Date().toDateString() ||
          (quiz.quiz.length !== 0 && quiz.index < 5) ? (
            <div className={styles.startbox}>
              <p>
                하루에 총 5개의 금융 퀴즈에 <br />
                도전할 수 있습니다.
              </p>
              <p>
                퀴즈를 풀고 <span>포인트</span>를 얻어보세요!
              </p>
              <p className={styles.semibold}>현재 보유중인 포인트</p>
              <div className={styles.pointbox}>
                <img src={yellowball} alt="" />
                <h3>{point} Point</h3>
              </div>
              <button
                onClick={() => navigate("/quiz")}
                className={styles.subbutton}
              >
                퀴즈 시작하기
              </button>
            </div>
          ) : (
            <div className={styles.endbox}>
              <p>퀴즈를 모두 풀었습니다.</p>
              <p>내일 다시 도전해주세요.</p>
              <div className={styles.btnbox}>
                <p>오늘의 성적</p>
              </div>
              <p>
                맞춘 갯수: <span>{quiz.resultScore}/5</span>
              </p>
              <p>
                획득한 포인트: <span>{quiz.resultPoint}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizMain;
