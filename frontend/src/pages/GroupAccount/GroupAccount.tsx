import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./GroupAccount.module.css";
import Pinball from "../Pinball/Pinball";
import axios from "axios";
import { useSelector } from "react-redux";

const GroupAccount = () => {
  const [value, setValue] = useState({
    cost: 0,
    parent: "group_finball_container",
  });
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
      console.log(res);
      const balance = res.data.data.balance;
      setValue({ cost: balance, parent: "group_finball_container" });
    });
  }, []);

  return (
    <div>
      <div
        id="group_finball_container"
        style={{ width: "300px", height: "150px" }}
      >
        <Pinball value={value} />
      </div>
    </div>
  );
};

export default GroupAccount;
