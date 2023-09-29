import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "./BankConnectLogo";
import styles from "./BankConnect.module.scss";

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

  const findAccount = async () => {
    try {
      const res = await axios.post(
        "https://j9e106.p.ssafy.io/api/bank/account",
        {
          bankCodeList: List,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setState(res.data.data.bankAccountDtoList);

      const initialToggledItems = {};
      let initialChooseItems: INfo[] = [];

      res.data.data.bankAccountDtoList.forEach((item) => {
        initialToggledItems[item.account.name] = false;
        initialChooseItems.push(item);
      });

      setToggledItems(initialToggledItems);
      setchooseItems(initialChooseItems);
    } catch (err) {
      console.log("삐빅", err);
    }
  };

  useEffect(() => {
    findAccount();
  }, []);

  useEffect(() => {
    if (state.length >= 0) {
      setLoading(false);
      let count = 0;

      state.forEach((item) => {
        const Name = item.account.name;

        if (toggledItems[Name] === true) {
          count += 1;
          const index = chooseItems.findIndex((e) => e.account.name === Name);

          if (index === -1) {
            chooseItems.push(item);
          }
        } else {
          const index = chooseItems.findIndex((e) => e.account.name === Name);

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
      updatedToggledItems[item.account.name] = newSelectAll;
    });
    setToggledItems(updatedToggledItems);
  };

  const selectAllText = selectAll ? "전체 선택 해제" : "전체 선택";

  const registerAccount = async () => {
    try {
      await axios.post(
        "https://j9e106.p.ssafy.io/api/user/account",
        {
          updateWeek: 1,
          bankAccountList: chooseItems,
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
        <div>계좌가 없어요</div>
      ) : (
        <div className={styles.container}>
          <h2>계좌 연결하기</h2>
          <p>연결할 계좌를 선택해주세요.</p>
          <button className={styles.bottommargin} onClick={handleSelectAll}>
            {selectAllText}
          </button>

          <div className={styles.minicontainer}>
            {state.map((v, i) => (
              <div className={styles.cardcontainer} key={i}>
                <div className={styles.left}>
                  <div className={styles.img}>
                    <Logo value={v} />
                  </div>

                  <div className={styles.text}>
                    <p>{v.account.name}</p>
                    <span>{v.company.name}</span>
                    <span>{v.account.no}</span>
                  </div>
                </div>

                <div className={styles.right}>
                  <Switch
                    checked={toggledItems[v.account.name]}
                    onChange={() => handleChange(v.account.name)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className={`${styles.button} ${styles.float}`}
            onClick={registerAccount}
          >
            {cnt}개 연결하기
          </button>
        </div>
      )}
    </>
  );
}
