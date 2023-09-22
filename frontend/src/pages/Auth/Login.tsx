import { useState } from "react";
import styles from "./Login.module.css";
import finballImage from "../../assets/Logo.png";
// import { Button } from 'react-bootstrap';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInput, Button } from "@material-ui/core";
// import { relative } from "path";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokens } from "../../store/slices/tokenSlice";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [idcolor, setIdcolor] = useState("");
  const [pwcolor, setPwcolor] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doLogin = () => {
    axios
      .post(`${BASE_HTTP_URL}/user/login`, {
        username: userId,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        dispatch(setTokens(response.data.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const goSignup = () => {
    navigate("/signup");
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
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
          onClick={doLogin}
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
