import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Card() {
  const navigate = useNavigate();

  const [cardList, setCardList] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<String>("");

  useEffect(() => {
    const jsonString = localStorage.getItem("persist:root");
    if (jsonString) {
      const jsonObject: { auth: string } = JSON.parse(jsonString);
      const authData = JSON.parse(jsonObject.auth);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);
        getCardList(accessToken);
      } else {
        console.log("accessToken이 존재하지 않습니다.");
      }
    } else {
      console.log("localStorage가 존재하지 않습니다.");
    }
  }, []);

  const getCardList = (accessToken) => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/card`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setCardList(response.data.data.getCardDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      {cardList && cardList.length !== 0 ? (
        [...cardList].map((card, index) => (
          <div key={index}>
            <img src={card.cardImage} width={200} />
            <p>{card.cardName}</p>
          </div>
        ))
      ) : (
        <>
          <div>연결된 카드가 없습니다.</div>
          <button onClick={() => navigate("/company/card")}>
            카드 연결하기
          </button>
        </>
      )}
    </div>
  );
}

export default Card;
