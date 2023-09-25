import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AccountDetail.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountDetail() {
  const [accessToken, setAccessToken] = useState<String>("");
  const [tradeHistoryList, setTradeHistoryList] = useState<any>([]);
  const [tradeHistory, setTradeHistory] = useState<any>(null);
  const account = useSelector((state) => state.account);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(account);
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;
      if (accessToken) {
        setAccessToken(accessToken);
        getTradeHistory(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const getTradeHistory = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account/${account.account.no}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        setTradeHistoryList(response.data.data.tradeHistoryDtoList);
        setTradeHistory(
          response.data.data.tradeHistoryDtoList.reduce(
            (tradeHistorys, tradeHistory) => {
              const groupKey = tradeHistory.date;
              if (!tradeHistorys[groupKey]) {
                tradeHistorys[groupKey] = [];
              }
              tradeHistorys[groupKey].push(tradeHistory);
              return tradeHistorys;
            },
            {}
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (tradeHistory) {
      {
        [...tradeHistory].map((value, index) => console.log(value));
      }
    }
  }, [tradeHistory]);

  return (
    <>
      {account && (
        <div className={styles.container}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            subheader={
              <ListSubheader component="div">
                {account.company.name}은행 {account.account.no}
              </ListSubheader>
            }
          >
            <ListItem key="돈" disablePadding>
              <ListItemButton>
                <ListItemText>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    {account.account.balance}원
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key="버튼" disablePadding>
              <button className={styles.button}>채우기</button>
              <button
                className={styles.button}
                onClick={() => navigate("/transferAccount")}
              >
                보내기
              </button>
            </ListItem>
          </List>

          <p>전체</p>
          <p>방금전</p>
          {Object.keys(tradeHistory).map((key, index) =>
            tradeHistory[key].map((history, idx) => <div></div>)
          )}
          {/* {[...tradeHistoryList].map((tradeHistory, index) => (
            <div key={index}>
              <div>{tradeHistory.date}</div>
              <div>{tradeHistory.time}</div>
              <div>{tradeHistory.oppositeDto.userName}</div>
              <div>{tradeHistory.value}</div>
              <div>{tradeHistory.remain}</div>
            </div>
          ))} */}
        </div>
      )}
    </>
  );
}

export default AccountDetail;
