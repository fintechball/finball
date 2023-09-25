import styles from "./Header.module.scss";
import finballLogo from "../../assets/finballLogo.png";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import Logout from "../Auth/Logout";

function Header() {
  const navigate = useNavigate();
  const title = "";
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <img src={finballLogo} alt="Finball Logo" />
        <p>{title}</p>
        {/* {isLogged ?
          <Logout /> : (
          <Button
            type="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )} */}

        <Logout />
      </div>
    </div>
  );
}

export default Header;
