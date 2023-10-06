import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast, {Error, Success, Celebrate} from "../../components/Toast/Toast";
import styles from "./CreateFinBallAccountAuth.module.scss";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";

function CreateFinBallAccountAuth() {
  const [name, setName] = useState("");
  const [firstRegNum, setFirstRegNum] = useState("");
  const [lastRegNum, setLastRegNum] = useState("");
  const [accessToken, setAccessToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;
      console.log(accessToken);

      if (accessToken) {
        setAccessToken(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const validationCheck = () => {
    if (name == "") {
      Error("이름을 입력해주세요.")
      return false;
    }
    if (firstRegNum.length != 6) {
      Error("앞 자리를 확인해주세요.")
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
      Authorization: accessToken,
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
      .then((res) => {
        Celebrate("핀볼계정 생성 완료")
        navigate("/create/finball-account");
      })
      .catch((err) => {
        Error("예상치 못한 오류가 일어났습니다.");
      });
  };

  return (
    <div className={styles.container}>
      <Toast/>
      <h2>
        계좌 생성을 위해
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
      {/* <Button type="primary" onClick={doMyDataAuth}>
        주민번호 인증
      </Button> */}
      <button className={styles.button} onClick={doMyDataAuth}>
        주민번호 인증
      </button>
    </div>
  );
}

export default CreateFinBallAccountAuth;
