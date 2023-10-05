import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./NavPage.module.scss";

import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import MyInfo from "../../components/User/MyInfo"

function NavPage() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.accessToken) {
      setIsLogged(true);
    }
  }, [auth]);

  return (
    <div>
      <MyInfo />
      <div className={styles.container}>

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
    </div>
  );
}

export default NavPage;
