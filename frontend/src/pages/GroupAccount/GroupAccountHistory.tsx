import axios from "axios";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Transfer/AccountDetail.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import TradeHistory from "../../components/Transfer/TradeHistory";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";
interface account {
  no: string;
  balance: number;
  name: string;
  url: string;
}

interface member {
  profileImage: string;
  name: string;
  value: number;
}

interface gameHistory {
  name: string;
  accountNo: string;
  balance: number;
  member: member[];
  gameEnd: boolean;
}

function GroupAccountHistory() {
  const auth: string = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const groupAccountNo = useParams().no;
  const [groupAccount, setGroupAccount] = useState<account>({
    no: "",
    balance: 0,
    name: "",
    url: "",
  });

  const [hostId, setHostId] = useState<string>("");
  const userId = useSelector((state: RootState) => state.auth.userId)

  const [tradeHistoryDict, setTradeHistoryDict] = useState<any>(null);
  const refreshIconStyle = { fontSize: 12 };
  const navigate = useNavigate();

  const makeMemberList = (resultList, memberList) => {
    const member: member[] = [];

    for (let i = 0; i < memberList.length; i++) {
      member.push({
        profileImage: memberList[i].profileImage,
        name: memberList[i].name,
        value: 0,
      });

      for (let j = 0; j < resultList.length; j++) {
        if (memberList[i].name === resultList[j].name) {
          member[i].value = resultList[j].value;
          break;
        }
      }
    }

    return member;
  };

  const addTradeHistory = (tradeHistory, data) => {
    const memberList: member[] = makeMemberList(
      tradeHistory.result,
      data.member
    );

    const gameHistory: gameHistory = {
      name: data.name,
      accountNo: data.accountNo,
      balance: tradeHistory.value,
      member: memberList,
      gameEnd: true,
    };

    return gameHistory;
  };

  const getGroupAccount = () => {
    const headers: Record<string, string> = {
      Authorization: auth,
    };

    axios
      .get(`${BASE_HTTP_URL}/api/group/account/${groupAccountNo}`, {
        headers: headers,
      })
      .then((res) => {
        const data = res.data.data;

        setGroupAccount({
          no: data.accountNo,
          balance: data.balance,
          name: data.name,
          url: data.url,
        });

        console.log("test");
        console.log(data.member);

        for (const idx in data.member) {

          if (data.member[idx].type == "HOST") {
            setHostId(data.member[idx].userId);

            break;
          }
        }

        setTradeHistoryDict(
          data.tradeHistory.reduce((dict, tradeHistory) => {
            const groupKey = tradeHistory.date;

            if (tradeHistory.result.length > 0) {
              tradeHistory.gameHistory = addTradeHistory(tradeHistory, data);
            }

            if (!dict[groupKey]) {
              dict[groupKey] = [];
            }

            dict[groupKey].push(tradeHistory);
            return dict;
          }, {})
        );
      })
      .catch((err) => {
        alert("에러발생 : " + err);
      });
  };

  useEffect(() => {
    getGroupAccount();
  }, []);

  const openInvitePage = () => {
    navigate("/invite/group-account", { state: { name: groupAccount.name, url: groupAccount.url } });
  }

  return (
    tradeHistoryDict && (
      <div>
        <div className={styles.container}>
          <p className={styles.bankAccount}>{groupAccount.name} 모임 통장</p>
          <span>{groupAccount.no}</span>
          <p className={styles.balance}>{groupAccount.balance}원</p>

          <button>
            채우기
          </button>
          {
            userId == hostId && (
              <button onClick={openInvitePage}>
                초대하기
              </button>)
          }

          <hr />
          <div className={styles.date}>
            <p className={styles.total}>전체</p>
            <p className={styles.bankAccount}>
              방금전 <RefreshIcon style={refreshIconStyle} />
            </p>
          </div>

          <TradeHistory tradeHistoryDict={tradeHistoryDict} />
        </div>
      </div>
    )
  );
}

export default GroupAccountHistory;
