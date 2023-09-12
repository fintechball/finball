import { useState } from "react";
import styles from "./Login.module.css";
import finballImage from "../../assets/Logo.png";
// import { Button } from 'react-bootstrap';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInput, Button } from "@material-ui/core";
import { relative } from "path";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [idcolor, setIdcolor] = useState("");
  const [pwcolor, setPwcolor] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goSignup = () => {
    console.log("회원가입");
  };
  const focusId = () => {
    setIdcolor("#d1c4e9");
  };
  const defaultId = () => {
    setIdcolor("");
  };
  const focusPw = () => {
    setPwcolor("#d1c4e9");
  };
  const defaultPW = () => {
    setPwcolor("");
  };
  return (
    <div>
      <div className={styles.title_box}>로그인</div>
      <div className={styles.main_container}>
        <div className={styles.logo_box}>
          <img src={finballImage} alt="pinball" className={styles.Logo} />
        </div>
        <div className={styles.input_box}>
          <div className={styles.innerinput_box}>
            <div className={styles.input_title}>아이디</div>
            <OutlinedInput
              placeholder="ID"
              type="text"
              className={styles.passwordIcon}
              style={{ backgroundColor: `${idcolor}` }}
              onFocus={focusId}
              onBlur={defaultId}
            />
          </div>
          <div className={styles.innerinput_box}>
            <div className={styles.input_title}>비밀번호</div>
            <OutlinedInput
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className={styles.passwordIcon}
              style={{ backgroundColor: `${pwcolor}` }}
              onFocus={focusPw}
              onBlur={defaultPW}
              endAdornment={
                <Button
                  onClick={handleTogglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "5vh",
                    height: "100%",
                  }}
                >
                  {showPassword ? (
                    <VisibilityOff style={{ fontSize: "5vh" }} />
                  ) : (
                    <Visibility style={{ fontSize: "5vh" }} />
                  )}
                </Button>
              }
            />
          </div>
        </div>
        {/* <div> */}
        <Button
          className={styles.login_btn}
          variant="contained"
          style={{ backgroundColor: "#7165E3" }}
        >
          로그인
        </Button>
        <div
          onClick={goSignup}
          style={{
            width: "100%",
            textAlign: "center",
            position: "relative",
            bottom: "200%",
          }}
        >
          회원가입하러가기
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Login;
