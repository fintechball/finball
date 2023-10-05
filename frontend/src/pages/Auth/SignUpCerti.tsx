import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./SignUpCerti.module.scss";
import Toast, {Error, Success, Celebrate} from "../../components/Toast/Toast";

interface FormData {
  name: string;
  userId: string;
  password: string;
  phoneNumber: string;
}

function SignUpCerti() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [validCode, setValidCode] = useState("xxxx");
  const [code, setCode] = useState("");

  const getCode = async () => {
    try {
      const requestBody = JSON.stringify({
        recipientPhoneNumber: phoneNumber,
      });

      const response = await fetch(`https://j9e106.p.ssafy.io/api/user/sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      // console.log(requestBody);
      // console.log(response);
      if (response.status === 200) {
        const responseData = await response.json();
        Success("sms 인증 요청을 보냈습니다. 인증 번호를 입력해주세요.");
        setValidCode(responseData.data.certificationNumber);
        // console.log("인증번호:", responseData.data.certificationNumber);
      } else {
        Error("죄송합니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const codeCheck = () => {
    if (code === validCode) {
      Success("인증이 완료되었습니다.");
      setIsPhoneValid(true);
    }
  };

  const onSubmit = async () => {
    console.log(isPhoneValid);
    if (isPhoneValid) {
      const updatedFormData: FormData = {
        ...formData,
        phoneNumber: phoneNumber,
      };

      navigate("/securitySetting", { state: { formData: updatedFormData } });
    } else {
      Error("휴대폰 인증을 완료해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <Toast/>
      <h2>휴대폰 인증</h2>
      <div className={styles.minicontainer}>
        <p>휴대폰 번호</p>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isPhoneValid}
        />
      </div>

      <button className={styles.button} onClick={getCode}>
        인증번호 전송
      </button>

      <div className={styles.minicontainer}>
        <p>인증번호 입력</p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isPhoneValid}
        />
      </div>

      <button className={styles.button} onClick={codeCheck}>
        인증하기
      </button>

      <button className={styles.button} onClick={onSubmit}>
        가입하기
      </button>
    </div>
  );
}

export default SignUpCerti;
