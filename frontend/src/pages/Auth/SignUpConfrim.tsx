import { useState } from "react";
// import styles from "./SignUp.module.css";
import finballImage from "../../assets/Logo.png";
// import { Button } from 'react-bootstrap';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInput, Button } from "@material-ui/core";
import { relative } from "path";
import Password from "./Certification";

function SignupConfirm() {
  const [namecolor, setNamecolor] = useState("");

  const goNext = () => {
    console.log("회원가입");
  };
  const focusName = () => {
    setNamecolor("#d1c4e9");
  };
  const defaultName = () => {
    setNamecolor("");
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
            <div className={styles.input_title}>휴대폰번호</div>
            <OutlinedInput
              placeholder="Phone"
              type="text"
              className={styles.passwordIcon}
              style={{ backgroundColor: `${namecolor}` }}
              onFocus={focusName}
              onBlur={defaultName}
            />
            <Button variant="contained">인증번호 전송</Button>
          </div>
          <div> 인증번호를 입력하세요.</div>
          <Password value={""} />
          <Button variant="contained">인증하기</Button>
        </div>
        <Button
          className={styles.login_btn}
          variant="contained"
          style={{ backgroundColor: "#7165E3" }}
        >
          가입하기
        </Button>
      </div>
    </div>
  );
}

export default SignupConfirm;
