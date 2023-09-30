import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import CardLogo from "./CardConnectLogo";
import styles from "./CardConnect.module.scss";

import { Switch } from "antd";

interface INfo {
  card: {
    name: string;
  };
}

export default function CardConnect() {
  const location = useLocation();
  const List = location.state?.list;
  const [state, setState] = useState<INfo[]>([]);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggledItems, setToggledItems] = useState({});
  const [chooseItems, setchooseItems] = useState([]);
  const response = localStorage.getItem("persist:root");
  const jsonObject: { auth: string } = JSON.parse(response || "{}");
  const authData = JSON.parse(jsonObject.auth || "{}");
  const accessToken = authData.accessToken;
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);

  const findCard = async () => {
    try {
      const res = await axios.post(
        "https://j9e106.p.ssafy.io/api/card",
        {
          cardCompanyCodeList: List,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setState(res.data.data.cardList);

      const initialToggledItems = {};
      let initialChooseItems: INfo[] = [];

      res.data.data.cardList.forEach((item) => {
        initialToggledItems[item.card.name] = false;
        initialChooseItems.push(item);
      });

      setToggledItems(initialToggledItems);
      setchooseItems(initialChooseItems);
    } catch (err) {
      console.log("삐빅", err);
    }
  };

  useEffect(() => {
    findCard();
  }, []);

  useEffect(() => {
    if (state.length >= 0) {
      setLoading(false);
      let count = 0;

      state.forEach((item) => {
        const Name = item.card.name;

        if (toggledItems[Name] === true) {
          count += 1;
          const index = chooseItems.findIndex((e) => e.card.name === Name);

          if (index === -1) {
            chooseItems.push(item);
          }
        } else {
          const index = chooseItems.findIndex((e) => e.card.name === Name);

          if (index !== -1) {
            chooseItems.splice(index, 1);
          }
        }

        setCnt(count);
      });
    }
  }, [toggledItems, state, List]);

  const handleChange = (name: string) => {
    setToggledItems((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // 전체 선택 버튼
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedToggledItems = {};
    state.forEach((item) => {
      updatedToggledItems[item.card.name] = newSelectAll;
    });
    setToggledItems(updatedToggledItems);
  };

  const selectAllText = selectAll ? "전체 선택 해제" : "전체 선택";

  const registerCard = async () => {
    try {
      await axios.post(
        "https://j9e106.p.ssafy.io/api/user/card",
        {
          updateWeek: 1,
          cardList: chooseItems,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      navigate("/");
    } catch (err) {
      console.log("삐빅", err);
    }
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : state.length === 0 ? (
        <div className={styles.container}>
          <h2>추가로 등록할 카드가 없습니다.</h2>
          <button
            className={`${styles.button} ${styles.float}`}
            onClick={() => navigate("/")}
          >
            메인으로 이동하기
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <h2>카드 연결하기</h2>
          <p>연결할 카드를 선택해주세요.</p>
          <button className={styles.bottommargin} onClick={handleSelectAll}>
            {selectAllText}
          </button>

          <div className={styles.minicontainer}>
            {state.map((v, i) => (
              <div className={styles.cardcontainer} key={i}>
                <div className={styles.left}>
                  <div className={styles.img}>
                    <CardLogo value={v} />
                  </div>

                  <div className={styles.text}>
                    <p>{v.card.name}</p>
                  </div>
                </div>

                <div className={styles.right}>
                  <Switch
                    checked={toggledItems[v.card.name]}
                    onChange={() => handleChange(v.card.name)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className={`${styles.button} ${styles.float}`}
            onClick={registerCard}
          >
            {cnt}개 연결하기
          </button>
        </div>
      )}
    </>
  );
}
