import { Link } from "react-router-dom";
import styles from "./NavPage.module.scss";

function NavPage() {
  return (
    <div className={styles.container}>
      <h1>NavPage</h1>
      <p>
        <Link to="/" className={styles.link}>
          메인화면
        </Link>
      </p>
      {/* <Link to="/counter"></Link> */}
      <p>
        <Link to="/login" className={styles.link}>
          로그인
        </Link>
      </p>
      <p>
        <Link to="/signup" className={styles.link}>
          회원가입
        </Link>
      </p>
      <p>
        <Link to="/pinball" className={styles.link}>
          핀볼
        </Link>
      </p>
      <p>
        <Link to="/card" className={styles.link}>
          카드
        </Link>
      </p>
      <p>
        <Link to="/game" className={styles.link}>
          게임
        </Link>
      </p>
      <p>
        <Link to="/signupconfrim" className={styles.link}>
          회원가입 확인
        </Link>
      </p>
      <p>
        <Link to="/securitykeypad" className={styles.link}>
          인증 키패드
        </Link>
      </p>
      <p>
        <Link to="/certificationnaver" className={styles.link}>
          네이버 인증서
        </Link>
      </p>
      <p>
        <Link to="/accounts" className={styles.link}>
          계좌조회
        </Link>
      </p>
      <p>
        <Link to="/accountbook" className={styles.link}>
          가계부
        </Link>
      </p>
      <p>
        <Link to="/testpage" className={styles.link}>
          프론트 테스트페이지
        </Link>
      </p>
    </div>
  );
}

export default NavPage;
