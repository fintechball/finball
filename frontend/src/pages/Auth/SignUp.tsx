import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  userId: string;
  password: string;
  passwordConfirm: string;
}

const schema = yup.object().shape({
  name: yup.string().required("이름은 필수 입력 항목입니다."),
  userId: yup.string().required("아이디는 필수 입력 항목입니다"),
  password: yup.string().required("비밀번호는 필수 입력 항목입니다"),
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
    getValues,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    navigate("/signupcerti", { state: { formData: getValues() } });
  };

  return (
    <div>
      <form>
        <label>이름</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
        <br />

        <label>아이디</label>
        <input {...register("userId")} />
        {errors.userId && <p>{errors.userId.message}</p>}
        <br />

        <label>비밀번호</label>
        <input {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <br />

        <label>비밀번호 확인</label>
        <input {...register("passwordConfirm")} />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        <br />

        <input type="button" value="다음" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
}

export default SignUp;
