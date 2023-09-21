import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  name: string;
  userId: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}

const schema = yup.object().shape({
  phoneNumber: yup.string().required("휴대폰 번호는 필수 입력 항목입니다"),
  // .matches(
  //   /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  //   "올바른 형식이 아닙니다."
  // ),
});

function SignUpCerti() {
  const location = useLocation();
  const formData = location.state?.formData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const updatedFormData: FormData = {
      ...formData,
      phoneNumber: data.phoneNumber,
    };

    // try {
    //   const response = await axios.post('서버 엔드포인트 URL', updatedFormData);
    //   console.log('데이터 전송 성공', response);
    // } catch (error) {
    //   console.error('데이터 전송 실패', error);
    // }

    console.log(updatedFormData);
  };

  return (
    <div>
      <h2>휴대폰 인증</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>휴대폰 번호</label>
        <input {...register("phoneNumber")} />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        <br />

        <input
          type="button"
          value="가입하기"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
}

export default SignUpCerti;
