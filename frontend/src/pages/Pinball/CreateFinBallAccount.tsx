import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateFinBallAccount.module.scss";

import { Dropdown, Menu, Space, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Toast, {Error, Success, Normal} from "../../components/Toast/Toast";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";
function CreateFinBallAccount() {
  const navigate = useNavigate();
  const [usageList, setUsageList] = useState<string[]>([]);
  const [moneySourceList, setMoneySourceList] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [usage, setUsage] = useState("");
  const [moneySource, setMoneySource] = useState("");
  const [isTexted, setIsTexted] = useState(false);

  const validationCheck = () => {
    if (usage == "") {
      Error("사용 목적을 선택해주세요");
      return false;
    }
    if (moneySource == "") {
      Error("자금 출처를 선택해주세요");
      return false;
    }

    return true;
  };
  const createFinBallAccount = () => {
    const headers: Record<string, string> = {
      Authorization: accessToken,
      "Content-Type": "application/json",
    };

    if (!validationCheck()) {
      return;
    }

    axios
      .post(
        `${BASE_HTTP_URL}/api/account/fin-ball`,
        {
          usage: usage,
          moneySource: moneySource,
          isTexted: isTexted,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        Success("계좌 생성이 완료되었습니다.");
        console.log("계좌 생성 완료 " + res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getUsageAndMoneySource = (accessToken: string) => {
    const headers = {
      Authorization: accessToken,
    };

    axios
      .get(`${BASE_HTTP_URL}/api/usage-and-moneysource`, {
        headers: headers,
      })
      .then((res) => {
        setUsageList(res.data.data.usageList);
        setMoneySourceList(res.data.data.moneySourceList);

        setUsage(usageList[0]);
        setMoneySource(moneySourceList[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");

    const fetchData = () => {
      if (jsonString) {
        const jsonObject = JSON.parse(jsonString);
        const authData = JSON.parse(jsonObject.auth);
        const accessToken = authData.accessToken;

        if (accessToken) {
          setAccessToken(accessToken);
          getUsageAndMoneySource(accessToken);
        } else {
          console.log("accessToken이 존재하지 않습니다.");
        }
      } else {
        console.log("localStorage가 존재하지 않습니다.");
      }
    };
    fetchData();
  }, []);

  const usageMenu = (
    <Menu onClick={(e) => setUsage(e.key)}>
      {usageList.map((usage) => (
        <Menu.Item key={usage}>{usage}</Menu.Item>
      ))}
    </Menu>
  );

  const moneySourceMenu = (
    <Menu onClick={(e) => setMoneySource(e.key)}>
      {moneySourceList.map((moneySource) => (
        <Menu.Item key={moneySource}>{moneySource}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.container}>
      <Toast/>
      <h2>
        안전한 거래를 위해
        <br />
        아래의 내용을 확인해주세요.
      </h2>
      <label>사용목적</label>
      <Dropdown overlay={usageMenu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {usage || "선택하세요"} <DownOutlined />
        </a>
      </Dropdown>
      <br />
      <label>자금출처</label>
      <Dropdown overlay={moneySourceMenu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {moneySource || "선택하세요"} <DownOutlined />
        </a>
      </Dropdown>
      <br />
      <div>
        <span>해외에 세금을 내고 있나요?</span>
        <Checkbox
          id="isTexted"
          name="isTexted"
          onChange={(event) => setIsTexted(event.target.checked)}
          className={styles.checkbox}
        />
      </div>
      <br />
      {/* <Button type="primary" onClick={createFinBallAccount}>
        계좌 생성하기
      </Button> */}
      <button
        className={`${styles.button} ${styles.small}`}
        onClick={createFinBallAccount}
      >
        계좌 생성하기
      </button>
    </div>
  );
}

export default CreateFinBallAccount;
