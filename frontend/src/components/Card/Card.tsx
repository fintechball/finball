import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Card() {
  const navigate = useNavigate();

  const [cardList, setCardList] = useState<any>(null);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getCardList();
  }, []);

  const getCardList = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/card`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data.data.getCardList);
        setCardList(response.data.data.getCardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      {cardList && cardList.length !== 0 ? (
        [...cardList].map((cardinfo, index) => (
          <div className={styles.cardBox} key={index}>
            <img className={styles.rotatedImage} src={cardinfo.card.image} />
            <p className={styles.text}>{cardinfo.card.name}</p>
          </div>
        ))
      ) : (
        <div className={styles.noncontainer}>
          <p>연결된 카드가 없습니다.</p>
          <button onClick={() => navigate("/company/card")}>
            + 카드 연결하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
