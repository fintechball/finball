import { useNavigate } from "react-router-dom";
import styles from "./NavPage.module.scss";

import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

function NavPage() {
  const navigate = useNavigate();
  const isLogged = useSelector((state: RootState) => state.logged.isLogged);

  return (
    <div className={styles.container}>
      <h1>NavPage</h1>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <p>메인화면</p>
      </div>
      {!isLogged ? (
        <>
          <div
            onClick={() => {
              navigate("/login");
            }}
          >
            <p>로그인</p>
          </div>
          <div
            onClick={() => {
              navigate("/signup");
            }}
          >
            <p>회원가입</p>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            로그아웃
          </div>
          <div
            onClick={() => {
              navigate("/certificationnaver");
            }}
          >
            <p>네이버 인증서</p>
          </div>
          <div
            onClick={() => {
              navigate("/company/bank");
            }}
          >
            <p>계좌조회</p>
          </div>
          <div
            onClick={() => {
              navigate("/company/card");
            }}
          >
            <p>카드조회</p>
          </div>
          <div
            onClick={() => {
              navigate("/accountbook");
            }}
          >
            <p>가계부</p>
          </div>
          <div
            onClick={() => {
              navigate("/transfering");
            }}
          >
            <p>송금</p>
          </div>
          <div
            onClick={() => {
              navigate("/groupaccount");
            }}
          >
            <p>모임통장</p>
          </div>
        </>
      )}
    </div>
  );
}

export default NavPage;
