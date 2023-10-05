import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Card.module.scss";
import "./Card.module.scss";

function PaymentDone() {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentValue = location.state.value;

  return (
    <div className={styles.container}>
      <div>결제가 완료되었습니다.</div>
      <div>결제 금액 : {paymentValue}</div>
      <button onClick={() => navigate("/cardView")}>확인</button>
    </div>
  );
}

export default PaymentDone;
