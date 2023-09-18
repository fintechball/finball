import styles from "./Header.module.scss";
import finballLogo from "../../assets/finballLogo.png";

function Header() {
  const title = "";

  return (
    <div>
      <div className={styles.header}>
        <img src={finballLogo} alt="Finball Logo" />
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Header;
