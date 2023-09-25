import { useState } from "react";
import styles from "./Login.module.scss";
import finballImage from "../../assets/Logo.png";
// import { Button } from 'react-bootstrap';
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { OutlinedInput, Button } from "@material-ui/core";
// import { relative } from "path";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";

import { persistor, RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [idcolor, setIdcolor] = useState("");
  const [pwcolor, setPwcolor] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // const { accessToken, refreshToken, name, userId } = useSelector((state: RootState) => state.auth);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doLogin = () => {
    console.log("asdf");
    axios
      .post(`${BASE_HTTP_URL}/api/user/login`, {
        username: id,
        password: password,
      })
      .then((response) => {
        console.log(response.data.data);
        dispatch(
          setAuth({
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
            name: response.data.data.name,
            userId: response.data.data.userId
          })
        )
        navigate("/");
      })
      .catch((error) => {
        console.log({
          username: id,
          password: password,
        })
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
    <div className={styles.container}>
      <h1>LOGIN</h1>
      <div className={styles.smallbox}>
        <div className={styles.label}>아이디</div>
        <Input
          placeholder="ID"
          type="text"
          className={styles.input}
          onFocus={focusId}
          onBlur={defaultId}
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </div>
      <div className={styles.smallbox}>
        <div className={styles.label}>비밀번호</div>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className={styles.input}
          // style={{ backgroundColor: `${pwcolor}` }}
          onFocus={focusPw}
          onBlur={defaultPW}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          // endAdornment={
          //   <Button onClick={handleTogglePasswordVisibility}>
          //     {showPassword ? (
          //       <VisibilityOff style={{ fontSize: "5vh" }} />
          //     ) : (
          //       <Visibility style={{ fontSize: "5vh" }} />
          //     )}
          //   </Button>
          // }
        />
      </div>
      <Button type="primary" onClick={doLogin}>
        로그인
      </Button>
      <div onClick={goSignup} className={styles.signupbox}>
        <span>아직 회원이 아니신가요?</span>
        <p>회원가입하러 가기</p>
      </div>
    </div>
  );
}

export default Login;
