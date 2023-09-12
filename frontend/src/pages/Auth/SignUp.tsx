import { useState } from "react";
import styles from "./SignUp.module.css";
import finballImage from "../../assets/Logo.png";
// import { Button } from 'react-bootstrap';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInput, Button } from "@material-ui/core";
import { relative } from "path";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [namecolor, setNamecolor] = useState("");
  const [Ecolor, setEcolor] = useState("");
  const [pwcolor, setPwcolor] = useState("");
  const [pwccolor, setPwccolor] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const goNext = () => {
    console.log("회원가입");
  };
  const focusName = () => {
    setNamecolor("#d1c4e9");
  };
  const defaultName = () => {
    setNamecolor("");
  };
  const focusEmail = () => {
    setEcolor("#d1c4e9");
  };
  const defaultEmail = () => {
    setEcolor("");
  };
  const focusPw = () => {
    setPwcolor("#d1c4e9");
  };
  const defaultPW = () => {
    setPwcolor("");
  };
  const focusPwc = () => {
    setPwccolor("#d1c4e9");
  };
  const defaultPWc = () => {
    setPwccolor("");
  };
  return (
    <div>
      <div className={styles.title_box}>회원가입</div>
      <div className={styles.main_container}>
        <div className={styles.logo_box}>
          <img src={finballImage} alt="pinball" className={styles.Logo} />
        </div>
        <div className={styles.input_box}>
          <div className={styles.innerinput_box}>
            <div className={styles.input_title}> 이름</div>
            <OutlinedInput
              placeholder="Full Name"
              type="text"
              className={styles.passwordIcon}
              style={{ backgroundColor: `${namecolor}` }}
              onFocus={focusName}
              onBlur={defaultName}
            />
          </div>
          <div className={styles.innerinput_box}>
            <div className={styles.input_title}>이메일</div>
            <OutlinedInput
              placeholder="Email Address"
              type="text"
              className={styles.passwordIcon}
              style={{ backgroundColor: `${Ecolor}` }}
              onFocus={focusEmail}
              onBlur={defaultEmail}
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
          <div className={styles.innerinput_box}>
            <div className={styles.input_title}>비밀번호 확인</div>
            <OutlinedInput
              placeholder="Password Confirm"
              type={showPasswordConfirm ? "text" : "password"}
              className={styles.passwordIcon}
              style={{ backgroundColor: `${pwccolor}` }}
              onFocus={focusPwc}
              onBlur={defaultPWc}
              endAdornment={
                <Button
                  onClick={handleTogglePasswordConfirmVisibility}
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
                  {showPasswordConfirm ? (
                    <VisibilityOff style={{ fontSize: "5vh" }} />
                  ) : (
                    <Visibility style={{ fontSize: "5vh" }} />
                  )}
                </Button>
              }
            />
          </div>
        </div>
        <Button
          className={styles.login_btn}
          variant="contained"
          style={{ backgroundColor: "#7165E3" }}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default Signup;
