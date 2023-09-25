import { useNavigate } from "react-router-dom";

function toLogin() {
  const navigate = useNavigate();
  return (
    <div>
      <p>로그인이 필요한 페이지입니다.</p>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인
      </button>
    </div>
  );
}

export default toLogin;
