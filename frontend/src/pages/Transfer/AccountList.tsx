import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AccountList.module.css";
import { setAccount } from "../../store/slices/accountSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountList() {
  const [accountList, setAccountList] = useState<any>([]);
  const [accessToken, setAccessToken] = useState<String>("");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listContainer = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);
        getAccountList(accessToken);
        getFinBallAccountList(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const getAccountList = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/account`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setAccountList(response.data.data.userAccountList);
        setTotalBalance(response.data.data.totalBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFinBallAccountList = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        // setAccountList([...accountList, response.data.data.userAccountList]);
        // setTotalBalance(totalBalance + response.data.data.totalBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToAccountDetail = (account) => {
    // 리덕스에 저장
    dispatch(
      setAccount({
        account: account.account,
        company: account.company,
      })
    );
    navigate("/accountDetail");
  };

  return (
    <>
      <div className={styles.container}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          subheader={<ListSubheader component="div">총자산</ListSubheader>}
        >
          <ListItem
            key="1"
            secondaryAction={<button>분석</button>}
            disablePadding
          >
            <ListItemButton>
              <ListItemText>
                <Typography
                  variant="body1"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  {totalBalance}원
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

        {accountList.length != 0 ? (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            subheader={<ListSubheader component="div">입출금</ListSubheader>}
          >
            {[...accountList].map((account, index) => {
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <button onClick={() => goToAccountDetail(account)}>
                      송금
                    </button>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar src={account.company.logo} />
                    </ListItemAvatar>
                    <List>
                      <ListItem style={{ padding: "0px" }}>
                        <ListItemText>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "10px" }}
                          >
                            {account.account.name}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem style={{ padding: "0px" }}>
                        <ListItemText>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {account.account.balance}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <>
            <div>연결된 계좌가 없습니다.</div>
            <button>계좌 연결하기</button>
          </>
        )}
      </div>
    </>
  );
}

export default AccountList;
