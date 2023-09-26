import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./GroupAccount.module.css";
import Pinball from "../Pinball/Pinball";
import axios from "axios";
import { useSelector } from "react-redux";

function formatMoney(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const GroupAccount = () => {
  const [value, setValue] = useState({ cost: 0, parent: "home-canvas" });
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    axios({
      method: "GET",
      // url: "https://j9e106.p.ssafy.io/api/group/account/31942-202934-614",
      url: "http://localhost:8080/api/group/account/31942-202934-614",
      headers: {
        Authorization: accessToken,
      },
    }).then((res) => {
      const balance = res.data.data.balance;
      setResponse(res.data.data);
      setValue({ cost: balance, parent: "home-canvas" });
      // setData(res.data.data);
      console.log(res.data.data.name);
    });
  }, []);

  useEffect(() => {
    if (response) {
      setData(response); // response가 존재할 때만 복사
    }
  }, [response]);

  useEffect(() => {
    if (data) {
      setBalance(formatMoney(data.balance)); // data가 변경될 때만 실행
    }
  }, [data]);

  return (
    <div className={styles.container}>
      {data ? (
        <div>
          <div className={styles.head}>
            <div className={styles.contents}>
              <div className={styles.name}>{data.name}</div>
              <div className={styles.bankInfo}>
                <div className={styles.bankName}>핀볼</div>
                <div className={styles.accountNo}>{data.accountNo}</div>
                <div className={styles.balance}>{balance}원</div>
              </div>
            </div>
            <div className={styles.members}>
              <button></button>
              {data.member.map((member, index) => (
                <div key={index} className={styles.member}>
                  <span>{member.name}</span>
                  <span>{member.balance}</span>
                </div>
              ))}
            </div>
          </div>
          <div id="home-canvas" className={styles.finballBox}>
            <Pinball value={value} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GroupAccount;
