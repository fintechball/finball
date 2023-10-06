import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Toast, {Error, Success, Celebrate} from "../../components/Toast/Toast";

import styles from "./MyDataAuth.module.scss"

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";

function MyDataAuth() {
  const [name, setName] = useState("");
  const [firstRegNum, setFirstRegNum] = useState("");
  const [lastRegNum, setLastRegNum] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const nextUrl = location.state?.url;
  const list = location.state?.list;

  useEffect(() => {}, []);

  const validationCheck = () => {
    if (name == "") {
      Error("이름을 입력해주세요.");
      return false;
    }
    if (firstRegNum.length != 6) {
      Error("앞 자리를 확인해주세요.");
      return false;
    }
    if (lastRegNum.length != 7) {
      Error("뒷 자리를 확인해주세요.");
      return false;
    }

    return true;
  };
  const doMyDataAuth = () => {
    const registrationNumber = firstRegNum + lastRegNum;

    if (!validationCheck()) {
      return;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: auth.accessToken,
    };

    axios
      .post(
        `${BASE_HTTP_URL}/api/my-data/user/auth`,
        {
          name: name,
          registrationNumber: registrationNumber,
        },
        {
          headers: headers,
        }
      )
      .then(() => {
        Success("마이데이터 인증에 성공했습니다.");
        navigate(nextUrl, {
          state: { list: list },
        });
      })
      .catch((err) => {
        Error("인증에 실패하였습니다. 다시 정보를 입력하세요");
      });
  };

  return (
    <div className={styles.container}>
      <Toast/>
      <h2>
        본인 인증을 위해 <span>(마이데이터)</span>
        <br />
        주민등록번호를 입력해주세요.
      </h2>
      <div className={styles.minicontainer}>
        <div>이름</div>
        <Input
          placeholder="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className={styles.minicontainer}>
        <div>주민등록번호</div>
        <div className={styles.codebox}>
          <Input
            placeholder="first"
            type="text"
            value={firstRegNum}
            onChange={(event) => setFirstRegNum(event.target.value)}
          />
          <span>-</span>
          <Input
            placeholder="last"
            type="password"
            value={lastRegNum}
            onChange={(event) => setLastRegNum(event.target.value)}
          />
        </div>
      </div>
      <button className={styles.button} onClick={doMyDataAuth}>
        주민번호 인증
      </button>
    </div>
  );
}

export default MyDataAuth;
