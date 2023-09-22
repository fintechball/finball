import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Card() {
  const [cardList, setCardList] = useState<any>(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/user/card`, {
        headers: {
          // Authorization: token.accessToken,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setCardList(response.data.data.getCardDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      {cardList ? (
        [...cardList].map((card, index) => (
          <div key={index}>
            <img src={card.cardImage} width={200} />
            <p>{card.cardName}</p>
          </div>
        ))
      ) : (
        <>
          <div>연결된 카드가 없습니다.</div>
          <button>카드 연결하기</button>
        </>
      )}
    </div>
  );
}

export default Card;
