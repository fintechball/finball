import React, { useState, MouseEvent, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./SecurityKeypad.module.css";
import Password from "./Certification";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
const PASSWORD_MAX_LENGTH = 6; // 비밀번호 입력길이 제한 설정
const PASSWORD_INPUT_TEXT = "설정할 비밀번호를 입력하세요.";
const PASSWORD_REINPUT_Text = "설정할 비밀번호를 다시 입력해주세요.";

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

const SecuritySetting = () => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const auth = useSelector((state: RootState) => state.auth);
  const [nums, setNums] = useState([...nums_init, "", " "]);
  const [accessToken, setAccessToken] = useState("");
  const [isInputPassword, setIsInputPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(PASSWORD_INPUT_TEXT);

  useEffect(() => {
    let nums_random = Array.from({ length: 10 }, (v, k) => k); // 이 배열을 변경해 입력문자 변경 가능
    setNums(shuffle([...nums_random, "", ""]));
  }, []);

  useEffect(() => {
    if (password.length == PASSWORD_MAX_LENGTH && !isInputPassword) {
      setIsInputPassword(true);
      setPassword2(password);
      setMessage(PASSWORD_REINPUT_Text);
      setPassword("");
    } else if (password.length == PASSWORD_MAX_LENGTH && isInputPassword) {
      // 만약 1차 비밀번호와 2차비밀번호가 같지 않다면 다시 1차 비밀번호 입력하도록 한다.
      if (password != password2) {
        alert("1차 비밀번호와 2차 비밀번호가 같지 않습니다.");
        setIsInputPassword(false);
        setPassword2("");
        setMessage(PASSWORD_INPUT_TEXT);
        setPassword("");
      } else {
        alert("2차 비밀번호까지 완료!" + password2);
        saveMyEasyPassword();
      }
    }
  }, [password]);

  const saveMyEasyPassword = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: auth.accessToken,
    };

    axios
      .post(
        `${BASE_HTTP_URL}/api/user/easyPassword`,
        {
          easyPassword: password2,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        alert("성공 : " + res.data.message);
        // 성공하면 메인 페이지로 보내기...
      })
      .catch((err) => {
        alert("에러발생 : " + err);
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

  const onClickSubmitButton = (e: MouseEvent) => {
    // 비밀번호 제출
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!");
    } else {
      alert(password + "을 입력하셨습니다.");
    }
  };
  return (
    <>
      <Password value={password} />
      <div>{message}</div>
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
        <button
          type="submit"
          className={styles.bottom_btm}
          onClick={onClickSubmitButton}
        >
          제출
        </button>
      </div>
    </>
  );
};

export default SecuritySetting;
