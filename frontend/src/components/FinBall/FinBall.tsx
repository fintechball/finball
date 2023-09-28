import Pinball from "../../pages/Pinball/Pinball";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFinBallAccount } from "../../store/slices/finBallAccountSlice";
import styles from "./FinBall.module.scss";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function FinBall() {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const skin = useSelector((state) => state.skin);
  const finBallAccount = useSelector((state) => state.finBallAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(skin);
    getFinBAllAccount();
  }, []);

  const getFinBAllAccount = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        if (finBallAccount.account.no !== undefined) {
          console.log("차액");
          console.log(
            response.data.data.account.balance - finBallAccount.account.balance
          );
        }
        dispatch(
          setFinBallAccount({
            account: response.data.data.account,
            company: response.data.data.company,
          })
        );
      })
      .catch(() => {
        dispatch(
          setFinBallAccount({
            account: {},
            company: {},
          })
        );
      });
  };

  return (
    <>
      {finBallAccount.account.balance === undefined ? (
        <div className={styles.noncontainer}>
          <p>연결된 핀볼 계좌가 없습니다.</p>
          <button onClick={() => navigate("/create/finball/auth")}>
            + 계좌 생성하기
          </button>
        </div>
      ) : (
        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          {auth.accessToken == "" ? (
            "login이 필요합니다"
          ) : (
            <Pinball
              value={{ parent: "home-canvas", width: "300px", height: "150px" }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default FinBall;
