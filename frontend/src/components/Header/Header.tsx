import styles from "./Header.module.scss";
import finballLogo from "../../assets/finballLogo.png";
import { useState, useEffect } from "react";

function Header() {
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
        {isLogged ? <button>Logout</button> : <button>Login</button>}
      </div>
    </div>
  );
}

export default Header;
