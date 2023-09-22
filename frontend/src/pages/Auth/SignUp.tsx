import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";
import { useState } from "react";
import { Button, Input } from "antd";

interface IFormInput {
  name: string;
  userId: string;
  password: string;
  passwordConfirm: string;
}

const schema = yup.object({
  name: yup.string().required("이름은 필수 입력 항목입니다."),
  userId: yup
    .string()
    .required("아이디는 필수 입력 항목입니다")
    .min(6, "최소 6자리를 입력해주세요.")
    .max(20, "최대 20자리까지 가능합니다.")
    .matches(
      /^[a-z0-9]{6,20}$/,
      "영문, 숫자를 포함한 6자리 이상을 입력해주세요."
    ),
  password: yup
    .string()
    .required("비밀번호는 필수 입력 항목입니다")
    .min(8, "최소 8자리를 입력해주세요.")
    .max(20, "최대 20자리까지 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "영문, 숫자, 특수문자를 포함한 8자리 이상을 입력해주세요."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
});

function SignUp() {
  const navigate = useNavigate();
  const [isIdValid, setIsIdValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm<IFormInput>({ mode: "onChange", resolver: yupResolver(schema) });

  const idCheck = async () => {
    try {
      const requestBody = JSON.stringify(register("userId"));

      const response = await fetch(
        `https://j9e106.p.ssafy.io/user/authentication/id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
      console.log(requestBody);
      console.log(response);
      if (response.status === 200) {
        const responseData = await response.json();
        alert(responseData.message);
        setIsIdValid(true);
      } else {
        alert("사용 불가능한 아이디입니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: IFormInput) => {
    if (isIdValid) {
      const { passwordConfirm, ...signupData } = data;
      console.log(signupData);
      navigate("/signupcerti", { state: { formData: signupData } });
    } else {
      alert("아이디 중복 확인을 완료해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>SIGNUP</h1>
      <div className={styles.smallbox}>
        <p>이름</p>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className={styles.smallbox}>
        <p>아이디</p>
        <div className={styles.flexcontainer}>
          <input
            placeholder="ID"
            disabled={isIdValid}
            {...register("userId")}
          />
          {errors.userId && <p>{errors.userId.message}</p>}
          <Button className={styles.checkbutton} onClick={idCheck}>
            중복확인
          </Button>
        </div>
      </div>

      <div className={styles.smallbox}>
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div className={styles.smallbox}>
        <p>비밀번호 확인</p>
        <input
          type="password"
          placeholder="Password Confirm"
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>

      <Button type="primary" onClick={handleSubmit(onSubmit)}>
        다음
      </Button>
    </div>
  );
}

export default SignUp;
