//import { Button, Input } from "antd";
import axios from "axios";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Transfer/AccountDetail.module.css";

import RefreshIcon from "@mui/icons-material/Refresh";
import TradeHistory from "../../components/Transfer/TradeHistory";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

interface account {
    no: string;
    balance: number;
    name: string;
    url: string;
}

interface company {
    code: number;
    name: string;
    logo: string;
    connected: boolean;
}

interface opposite {
    userName: string;
    accountNo: string;
    company: company;
}

interface result {
    name: string;
    value: number;
}

interface tradeHistory {
    id: number;
    value: number;
    balance: number;
    date: string;
    time: string;
    type: string;
    opposite: opposite;
    result: result[];
}

function GroupAccountHistory() {

    const auth: string = useSelector((state: RootState) => state.auth.accessToken);
    const groupAccountNo = useParams().no;
    //const [accessToken, setAccessToken] = useState<string>("");
    const [groupAccount, setGroupAccount] = useState<account>({
        no: "",
        balance: 0,
        name: "",
        url: ""
    });
    //const [tradeHistoryList, setTradeHistoryList] = useState<tradeHistory[]>([]);
    const [tradeHistoryDict, setTradeHistoryDict] = useState<any>(null);

    const refreshIconStyle = { fontSize: 12 };

    const getGroupAccount = () => {
        const headers: Record<string, string> = {
            'Authorization': auth,
        }

        axios.get(`${BASE_HTTP_URL}/api/group/account/${groupAccountNo}`,
            {
                headers: headers
            })
            .then((res) => {
                alert("성공 : " + res.data.message);
                const data = res.data.data;

                setGroupAccount({
                    no: data.accountNo,
                    balance: data.balance,
                    name: data.name,
                    url: data.url
                });
                //setTradeHistoryList(data.tradeHistory);
                setTradeHistoryDict(data.tradeHistory.reduce((dict, tradeHistory) => {
                    const groupKey = tradeHistory.date;

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
            })
    }

    useEffect(() => {
        getGroupAccount()
    }, []);

    return tradeHistoryDict && (
        <div>
            <div className={styles.container}>
                <br />
                <p className={styles.bankAccount}>
                    {groupAccount.name} 모임 통장
                </p>
                <span>{groupAccount.no}</span>
                <p className={styles.balance}>{groupAccount.balance}원</p>
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
    );
}

export default GroupAccountHistory;
