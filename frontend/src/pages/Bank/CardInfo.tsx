import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardLogo from "./CardLogo";

import styles from "./CardInfo.module.scss";
import { Switch } from "antd";

interface INfo {
  name: string;
  code: number;
  img: string;
  connected: boolean;
}

export default function CardInfo() {
  const navigate = useNavigate();
  const [state, setState] = useState<INfo[]>([]);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [choose, setChoose] = useState<number[]>([]);
  const response = localStorage.getItem("persist:root");
  const jsonObject = JSON.parse(response || "{}");
  const authData = JSON.parse(jsonObject.auth || "{}");
  const accessToken = authData.accessToken;
  const [selectAll, setSelectAll] = useState(false);

  const findCard = async () => {
    await axios({
      method: "get",
      url: `https://j9e106.p.ssafy.io/api/company/card`,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        console.log(res.data.data.companyList)
        setState(res.data.data.companyList);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };

  useEffect(() => {
    findCard();
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      setLoading(false);
      let count = 0;
      let selectedCodes: number[] = [];
      state.forEach((item) => {
        if (item.connected) {
          count += 1;
          selectedCodes.push(item.code);
        }
      });
      setCnt(count);
      setChoose(selectedCodes);
    }
  }, [state]);

  const handleChange = (checked: boolean, name: string) => {
    setState((prevState) => {
      const updatedState = prevState.map((item) => {
        if (item.name === name) {
          return { ...item, connected: checked };
        }
        return item;
      });
      return updatedState;
    });
  };

  // 전체 선택 버튼
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    setState((prevState) => {
      return prevState.map((item) => {
        return { ...item, connected: newSelectAll };
      });
    });
  };

  const selectAllText = selectAll ? "전체 선택 해제" : "전체 선택";

  // const handleReset = () => {
  //   findCard();
  // };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className={styles.container}>
          <h2>카드 연결하기</h2>
          <p>연결할 타행 카드사를 선택해 주세요.</p>
          <button onClick={handleSelectAll}>{selectAllText}</button>
          <div className={styles.minicontainer}>
            {state.map((v, i) => (
              <div className={styles.cardcontainer} key={i}>
                <div className={styles.left}>
                  <div className={styles.img}>
                    <CardLogo value={v} />
                  </div>
                  <div className={styles.text}>
                    <p>{v.name}</p>
                  </div>
                </div>

                <div className={styles.right}>
                  <Switch
                    checked={v.connected}
                    onChange={(checked) => handleChange(checked, v.name)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className={`${styles.button} ${styles.float}`}
            onClick={() => {
              navigate("/my-data/auth", {
                state: {
                  list: choose,
                  url: "/card",
                },
              });
              // navigate("/card", { state: { cardCompanyCodeList: choose } });
            }}
          >
            {cnt}개 카드사 선택
          </button>
        </div>
      )}
    </>
  );
}
