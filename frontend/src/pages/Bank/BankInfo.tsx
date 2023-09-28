import * as React from "react";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Logo from "./Logo";
import Button from "@mui/material/Button";
import styles from "./BankInfo.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function BankInfo() {
  interface INfo {
    name: string;
    img: string;
    code: number;
    connected: boolean;
  }
  const [state, setState] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [choose, setChoose] = useState([]);
  const response=localStorage.getItem("persist:root")
  const jsonObject: { auth: string } = JSON.parse(response);
  const authData = JSON.parse(jsonObject.auth);
  const accessToken = authData.accessToken;
  const findBank = async () => {
    await axios({
      method: "get",
      url: `https://j9e106.p.ssafy.io/api/company/bank`,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        setState(res.data.data.companyList);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  useEffect(() => {
    findBank();
  }, []);
  useEffect(() => {
    if (state.length > 0) {
      setLoading(false);
      let count = 0;
      let L = [];
      for (let i = 0; i < state.length; i++) {
        // console.log(state[Object.keys(state)[i]])
        if (state[Object.keys(state)[i]].connected) {
          count += 1;
          L = [...L, Number(state[Object.keys(state)[i]].code)];
        }
      }
      setCnt(count);
      // console.log(L)
      setChoose(L);
    }
  }, [state]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => {
      // 새로운 배열을 생성하고 이전 상태를 복사
      const updatedState = prevState.map((item) => {
        // 원하는 항목을 찾아서 업데이트
        if (item.name === event.target.name) {
          return { ...item, connected: !item.connected }; // img 프로퍼티를 업데이트
        }
        // 변경할 필요가 없는 항목은 그대로 반환
        return item;
      });

      return updatedState; // 업데이트된 배열을 반환하여 상태를 업데이트
    });
  };
  const handlereset = () => {
    findBank();
  };
  return (
    <>
      {loading ? (
        "Lodaing..."
      ) : (
        <FormControl component="fieldset" variant="standard">
          <div className={styles.head}>
            <div style={{ fontSize: "3vh", fontWeight: "bold" }}> 은행</div>
            <div
              style={{ fontSize: "1vh", alignItems: "center" }}
              onClick={handlereset}
            >
              선택 해제
            </div>
          </div>
          <div style={{ fontSize: "1vh", color: "grey", textAlign: "start" }}>
            한 곳에서 계좌 잔액을 확인하세요!
          </div>
          <FormGroup
            style={{ height: "220vh", width: "360px", marginLeft: "0px" }}
          >
            {state.map((v, i) => (
              <div className={styles.labelbox} key={i}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={v.connected}
                      onChange={handleChange}
                      name={v.name}
                    />
                  }
                  label={<Logo value={v} />}
                  labelPlacement="start"
                />
              </div>
            ))}
          </FormGroup>
          <Link
            to="/bank/account"
            state={{ bankCodeList: choose }}
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
          >
            <label
              style={{
                backgroundColor: "#7165E3",
                margin: "0",
                paddingLeft: "130px",
                display: "inline-block",
              }}
            >
              {cnt}개 은행 선택
            </label>
          </Link>
        </FormControl>
      )}
    </>
  );
}
