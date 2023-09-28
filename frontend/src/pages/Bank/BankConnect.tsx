import * as React from "react";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Logo from "./BankConnectLogo";
import Button from "@mui/material/Button";
import styles from "./BankInfo.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function BankConnect() {
  const location = useLocation();
  const List = location.state?.list;
  const [state, setState] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggledItems, setToggledItems] = useState({});
  const [chooseItems, setchooseItems] = useState([]);
  const response = localStorage.getItem("persist:root");
  const jsonObject: { auth: string } = JSON.parse(response);
  const authData = JSON.parse(jsonObject.auth);
  const accessToken = authData.accessToken;
  const navigate = useNavigate();
  const findAccount = async () => {
    await axios({
      method: "post",
      url: `https://j9e106.p.ssafy.io/api/bank/account`,
      headers: {
        Authorization: accessToken,
      },
      data: {
        bankCodeList: List,
      },
    })
      .then((res) => {
        console.log(res.data.data.bankAccountDtoList);
        setState(res.data.data.bankAccountDtoList);
        const initialToggledItems = {};
        let initialChooseItems = [];
        res.data.data.bankAccountDtoList.map((item) => {
          initialToggledItems[item.account.name] = true; // 예를 들어, 항목의 고유 ID를 사용
          initialChooseItems.push(item);
        });

        setToggledItems(initialToggledItems);
        setchooseItems(initialChooseItems);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  useEffect(() => {
    console.log(List);
    findAccount();
  }, []);
  useEffect(() => {
    if (state.length >= 0) {
      setLoading(false);
      let count = 0;
      for (let i = 0; i < state.length; i++) {
        const Name = state[i].account.name;
        console.log(Name);
        if (toggledItems[Name] == true) {
          count += 1;
          let cnt = 0;
          var index = chooseItems.findIndex((e) => e.account.name === Name);
          if (index == -1) {
            cnt++;
          }
          if (cnt != 0) {
            chooseItems.push(state[i]);
          }
        } else {
          chooseItems.splice(i, 1);
        }
        setCnt(count);
      }
    }
  }, [toggledItems, state, List]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggledItems((prevState) => {
      const Name = event.target.name;
      console.log(Name);
      console.log(event.target.name);
      console.log(prevState);
      return { ...state, [Name]: !prevState[Name] };
      // 변경할 필요가 없는 항목은 그대로 반환
    });
  };
  const handlereset = () => {
    for (let i = 0; i < toggledItems.length; i++) {
      setToggledItems((state) => {
        const Name = state[i].name;
        return { ...state, [Name]: !state[Name] };
      });
    }
  };
  console.log(chooseItems);
  const registerAccount = async () => {
    await axios({
      method: "post",
      url: `https://j9e106.p.ssafy.io/api/user/account`,
      headers: {
        Authorization: accessToken,
      },
      data: {
        updateWeek: 1,
        bankAccountList: chooseItems,
      },
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  console.log(state);
  console.log(toggledItems);
  console.log(chooseItems);
  return (
    <>
      {loading ? (
        "Lodaing..."
      ) : state.length == 0 ? (
        <div>계좌가 없어요</div>
      ) : (
        <FormControl
          component="fieldset"
          variant="standard"
          style={{ width: "100%" }}
        >
          <div className={styles.head}>
            <div style={{ fontSize: "3vh", fontWeight: "bold" }}> 은행</div>
            <div
              style={{ fontSize: "1vh", alignItems: "center" }}
              onClick={handlereset}
            >
              선택 해제
            </div>
          </div>
          <div style={{ fontSize: "2vh", color: "grey", textAlign: "start" }}>
            연결할 계좌를 선택해주세요
          </div>
          <FormGroup>
            {state.map((v, i) => (
              <div className={styles.labelbox} key={i}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={toggledItems[v.account.name]}
                      onChange={handleChange}
                      name={v.account.name}
                    />
                  }
                  label={<Logo value={v} />}
                  labelPlacement="start"
                />
              </div>
            ))}
          </FormGroup>
          <button
            style={{
              color: "white",
              position: "sticky",
              bottom: "62px",
              backgroundColor: "#7165E3",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
            onClick={registerAccount}
          >
            <label
              style={{
                backgroundColor: "#7165E3",
                margin: "0",
                paddingLeft: "130px",
                display: "inline-block",
              }}
            >
              {cnt}개 연결하기
            </label>
          </button>
        </FormControl>
      )}
    </>
  );
}
