import styles from "./Header.module.scss";
import finballLogo from "../../assets/finballLogo.png";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import Logout from "../Auth/Logout";

function Header() {
  const navigate = useNavigate();
  const title = "";

  const isLogged = useSelector((state: RootState) => state.logged.isLogged);

  return (
    <div>
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
