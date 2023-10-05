import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import cardsuccess from "../../assets/cardsuccess.json";
import styles from "./PaymentDone.module.scss";

function PaymentDone() {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentValue = location.state.value;

  return (
    <div className={styles.container}>
      <Lottie
        animationData={cardsuccess}
        loop={true}
        style={{ width: "200px" }}
      />
      <h2>{paymentValue}원</h2>
      <h3>카드 결제가 완료되었어요.</h3>
      <button
        onClick={() => navigate("/cardView")}
        className={styles.subbutton}
      >
        확인
      </button>
    </div>
  );
}

export default PaymentDone;
