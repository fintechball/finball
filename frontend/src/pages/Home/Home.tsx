import CardContainer from "../../components/Card/CardContainer";
import BankAccountContainer from "../../components/BankAccount/BankAccountContainer";
import GroupAccountContainer from "../../components/GroupAccount/GroupAccountContainer";
import FinBallContainer from "../../components/FinBall/FinBallContainer";

import styles from "./Home.module.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../../store/slices/quizSlice";

//테스트용
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { setGroupFinball } from "../../store/slices/groupfinballSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //테스트용
  const isready = useSelector((state) => state.isready)
  const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";
  const my = "12345-123456-123"
  const auth = useSelector((state) => state.auth);
  const result = useSelector((state => state.groupfinball.result))
  useEffect(() => {
    getGroupFinBAllAccount();
  }, []);
  const getGroupFinBAllAccount = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/group/account/${my}`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {

        console.log(response.data.data)
        dispatch(
          setGroupFinball({
            // ballunit:response.data.data.balance/40,
            ballunit: 1000,
            members: response.data.data.member,
            balance: response.data.data.balance,
          })
        );
      })
      .catch(() => {
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
        {/* 테스트용 */}
        <div onClick={() => navigate("/game")}>game</div>
        <div onClick={() => navigate("/groupaccount/12345-123456-123")}>group</div>
        {/*  */}
        <h2 onClick={() => navigate("/accountBook")}>우리 계좌</h2>
        <FinBallContainer />
      </div>
      <div className={styles.minicontainer}>
        <h2 onClick={() => navigate("/cardView")}>연결된 카드 목록</h2>
        <CardContainer />
      </div>
      <div className={styles.minicontainer}>
        <h2 onClick={() => navigate("/accountList")}>연결된 타행계좌 목록</h2>
        <BankAccountContainer />
      </div>
      <div className={styles.minicontainer}>
        <h2>연결된 모임통장 목록</h2> <button onClick={() => navigate("/create/group-account")}>모임 통장 생성</button>
        <GroupAccountContainer />
      </div>
      {/* <button onClick={() => dispatch(setDate("123123"))}>초기화</button>
      <div className={styles.noncontainer}>
        <p>연결된 카드가 없습니다.</p>
        <button onClick={() => navigate("/company/card")}>
          + 카드 연결하기
        </button>
      </div> */}
      {/* <button onClick={() => navigate("/jeonghui")}>김정희 테스트</button> */}
    </div>
  );
}

export default Home;
