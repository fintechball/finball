import * as React from 'react';
import { useState, useEffect } from "react";
import styles from "./GroupAccount.module.css"
import Pinball from "../Pinball/Pinball";
import axios from 'axios';
import { useSelector } from 'react-redux';

const GroupAccount = () => {
  const [groupAccountData, setGroupAccountData] = useState([]);
  const [value, setValue] = useState({cost: 0, parent: "home-canvas"});
  const authData = useSelector(state => state.user)
  // console.log(authData);
  useEffect((

  ) => {
    console.log("hi");
    axios({
      method: "get",
      // url: `https://j9e106.p.ssafy.io/api/group/account/31942-202934-614`,
      url: `http://localhost:8080/api/group/account/31942-202934-614`,
      headers: {
        Authorization: authData.accessToken
      },
    }) 
    .then((res) => {
      setGroupAccountData(res.data.data)
      // setValue({cost : res.data.data.balance, parent: "home-canvas"})
      setValue({...value, cost:res.data.data.balance})
    })
  },[])
  // console.log(groupAccountData);
 
  return (
    <div>
        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          <Pinball value={value}/>
        </div>
    </div>
  );
}

export default GroupAccount;
