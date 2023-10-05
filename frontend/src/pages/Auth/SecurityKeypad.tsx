import React, { useState, MouseEvent, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SecurityKeypad.module.css";
import Password from "./Certification";
import { RootState } from "../../store/store";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast, {Error, Success, Celebrate} from "../../components/Toast/Toast";

const PASSWORD_MAX_LENGTH = 6; // 비밀번호 입력길이 제한 설정
const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";

const shuffle = (nums: number[]) => {
  // 배열 섞는 함수
  let num_length = nums.length;
  while (num_length) {
    let random_index = Math.floor(num_length-- * Math.random());
    let temp = nums[random_index];
    nums[random_index] = nums[num_length];
    nums[num_length] = temp;
  }
  return nums;
};

const SecurityKeypad = () => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const receiverName = location.state.userName;
  const sendMoney = location.state.money;

  const [nums, setNums] = useState([...nums_init, "", " "]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    let nums_random = Array.from({ length: 10 }, (v, k) => k); // 이 배열을 변경해 입력문자 변경 가능
    setNums(shuffle([...nums_random, "", ""]));
  }, []);

  useEffect(() => {
    if (password.length === PASSWORD_MAX_LENGTH) {
      sendAuthEasyPassword();
    }
  }, [password]);

  const sendAuthEasyPassword = async () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: auth.accessToken,
    };

    axios
      .post(
        `${BASE_HTTP_URL}/api/user/auth/easyPassword`,
        {
          easyPassword: password,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        Success("간편 비밀번호 인증에 성공했습니다.");
        navigate("/transfering", {
          state: {
            money: sendMoney,
            userName: receiverName,
          },
        });
      })
      .catch(() => {
        Error("비밀번호를 잘못 입력하였습니다.");
        setPassword("");
      });
  };

  const handlePasswordChange = useCallback(
    (num) => {
      if (password.length === PASSWORD_MAX_LENGTH) {
        return;
      }
      setPassword(password + num.toString());
    },
    [password]
  );

  const erasePasswordOne = useCallback(
    (e: MouseEvent) => {
      setPassword(
        password.slice(0, password.length === 0 ? 0 : password.length - 1)
      );
    },
    [password]
  );

  const erasePasswordAll = useCallback((e: MouseEvent) => {
    setPassword("");
    let nums_random = Array.from({ length: 10 }, (v, k) => k); // 이 배열을 변경해 입력문자 변경 가능
    setNums(shuffle([...nums_random, "", ""]));
  }, []);

  const shuffleNums = useCallback(
    (num: number) => (e: MouseEvent) => {
      // 0 ~ 9 섞어주기
      // let nums_random = Array.from({ length: 10 }, (v, k) => k) // 이 배열을 변경해 입력문자 변경 가능
      // setNums(shuffle([...nums_random,"",""]))
      handlePasswordChange(num);
    },
    [handlePasswordChange]
  );

  return (
    <>
    <Toast/>
      <Password value={password} />
      <div className={styles.inputer}>
        {[
          ...nums.map((n, i) => (
            <button
              value={n}
              onClick={shuffleNums(n)}
              key={i}
              className={styles.btn}
            >
              {n}
            </button>
          )),
        ]}
      </div>

      <div>
        <button
          className="num-button"
          onClick={erasePasswordAll}
          key="eraseAll"
          className={styles.bottom_btm}
        >
          X
        </button>
        <button
          className="num-button"
          onClick={erasePasswordOne}
          key="eraseOne"
          className={styles.bottom_btm}
        >
          ←
        </button>
        {/* <button
          type="submit"
          className={styles.bottom_btm}
          onClick={onClickSubmitButton}
        >
          제출
        </button> */}
      </div>
    </>
  );
};

export default SecurityKeypad;
