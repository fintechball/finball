import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm<IFormInput>({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    const { passwordConfirm, ...signupData } = data;
    console.log(signupData);
    navigate("/signupcerti", { state: { formData: signupData } });
  };

  return (
    <div className={styles.signupform}>
      <p>이름</p>
      <input placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      <br />

      <p>아이디</p>
      <input placeholder="ID" {...register("userId")} />
      {errors.userId && <p>{errors.userId.message}</p>}
      <br />

      <p>비밀번호</p>
      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      <br />

      <p>비밀번호 확인</p>
      <input
        type="password"
        placeholder="Password Confirm"
        {...register("passwordConfirm")}
      />
      {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      <br />

      <button type="button" onClick={handleSubmit(onSubmit)}>
        다음
      </button>
    </div>
  );
}

export default SignUp;
