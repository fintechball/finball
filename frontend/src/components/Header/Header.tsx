import styles from "./Header.module.scss";
import finballLogo from "../../assets/finballLogo.png";
// import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import Logout from "../Auth/Logout";

// 유저 정보 계속 업데이트
import UserInfo from "../Auth/userInfo";

function Header() {
  const navigate = useNavigate();
  const title = "";

  const isLogged = useSelector((state: RootState) => state.logged.isLogged);

  return (
    <div>
      <UserInfo />
      <div className={styles.header}>
        <img src={finballLogo} alt="Finball Logo" />
        <p>{title}</p>
        {isLogged ? (
          <Logout />
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
