import { useEffect, useState } from "react";
import axios from "axios";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Shop() {
  const [skinList, setSkinList] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/ball`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        setSkinList(response.data.data.skin);
      });
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {skinList &&
        [...skinList].map((skin, index) => (
          <div key={index}>
            <img src={skin.image} width={100} />
            <p>{skin.name}</p>
            {skin.invented ? <p>보유중</p> : <p>{skin.value}</p>}
          </div>
        ))}
    </div>
  );
}

export default Shop;
