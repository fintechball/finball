import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
      alert("이름을 입력해주세요.");
      return false;
    }
    if (firstRegNum.length != 6) {
      alert("앞 자리를 확인해주세요.");
      return false;
    }
    if (lastRegNum.length != 7) {
      alert("뒷 자리를 확인해주세요.");
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
        // alert("성공 : " + res.data.message);
        // navigate(-1); //이전 페이지로 이동
        navigate(nextUrl, {
          state: { list: list },
        });
      })
      .catch((err) => {
        alert("인증에 실패하였습니다. 다시 정보를 입력하세요" + err);
      });
  };

  return (
    <div>
      <h1>마이데이터 인증</h1>
      <hr />
      <p>마이데이터 인증을 위해 이름과 주민등록번호를 입력해주세요.</p>
      <div>
        <div>이름</div>
        <Input
          placeholder="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <div>주민번호</div>
        <div>
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
      <Button type="primary" onClick={doMyDataAuth}>
        주민번호 인증
      </Button>
    </div>
  );
}

export default MyDataAuth;
