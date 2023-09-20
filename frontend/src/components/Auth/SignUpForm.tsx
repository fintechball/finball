import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  name: string;
  userId: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}

const schema = yup.object().shape({
  name: yup.string().required("이름은 필수 입력 항목입니다."),
  userId: yup.string().required("아이디는 필수 입력 항목입니다"),
  password: yup.string().required("비밀번호는 필수 입력 항목입니다"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  phoneNumber: yup
    .string()
    .required("휴대폰 번호는 필수 입력 항목입니다")
    .matches(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "올바른 형식이 아닙니다"
    ),
});

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <label>휴대폰 번호</label>
        <input {...register("phoneNumber")} />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default SignUpForm;
