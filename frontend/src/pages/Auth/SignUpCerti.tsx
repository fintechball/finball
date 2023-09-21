import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  name: string;
  userId: string;
  password: string;
  phoneNumber: string;
}

const schema = yup.object({
  phoneNumber: yup
    .string()
    .required("휴대폰 번호는 필수 입력 항목입니다.")
    .matches(/^\d{11}$/, "정확한 휴대폰 번호를 입력해 주세요."),
});

function SignUpCerti() {
  const location = useLocation();
  const formData = location.state?.formData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });

  const getCode = () => {};

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const updatedFormData: FormData = {
      ...formData,
      phoneNumber: data.phoneNumber,
    };
    try {
      const requestBody = JSON.stringify(updatedFormData);

      const response = await fetch(`https://j9e106.p.ssafy.io/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      console.log(response);
      if (response.status === 200) {
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (error) {
      console.error("데이터 전송 실패", error);
    }

    console.log(updatedFormData);
  };

  return (
    <div>
      <h2>휴대폰 인증</h2>
      <p>휴대폰 번호</p>
      <input placeholder="Phone" {...register("phoneNumber")} />
      {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

      <button type="button" onClick={getCode}>
        인증번호 전송
      </button>

      <button type="button" onClick={handleSubmit(onSubmit)}>
        가입하기
      </button>
    </div>
  );
}

export default SignUpCerti;
