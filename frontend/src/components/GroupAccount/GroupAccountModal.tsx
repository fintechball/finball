import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./GroupAccountModal.module.css";

const GroupAccountModal = (props) => {

  const data = props.data;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.bankInfo}>
          <div className={styles.bankName}>핀볼</div>
          <div className={styles.accountNo}>{data.accountNo}</div>
          <div className={styles.balance}>{data.balance}원</div>
        </div>
        <div>
          {data.member.map((member, index) => (
            <div key={index} className={styles.member}>
              <div className={styles.userContainer}>
                <span>
                  <img
                    src={member.profileImage}
                    className={styles.profileImage}
                  />
                </span>
                <div className={styles.userInfo}>
                  <div className={styles.username}>{member.name}</div>
                  {data.gameEnd != true && (<div className={styles.userBalance}>{member.balance}</div>)}
                  {/* 핀볼 거래내역에서 모달을 불렀다면.. value를 보여줌 */}
                  {data.gameEnd == true && (<div className={styles.userBalance}>- {member.value}</div>)}
                </div>
              </div>
            </div>
          ))}
          <div>
            <Link to="/transferGroupAccount">
              <button>이체하기</button>
            </Link>
            <button onClick={props.onClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupAccountModal;
