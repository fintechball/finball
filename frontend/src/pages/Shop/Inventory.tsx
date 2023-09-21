import { useEffect, useState } from "react";
import axios from "axios";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Inventory() {
  const [inventoryList, setInventoryList] = useState<any>(null);

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = () => {
    axios
      .get(`${BASE_HTTP_URL}/ball/inventory`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setInventoryList(response.data.data.inventoryDtoList);
      });
  };

  const selectSkin = (skinId: any) => {
    axios
      .post(
        `${BASE_HTTP_URL}/ball/select`,
        {
          id: skinId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then(() => {
        getInventory();
      });
  };

  return (
    <div>
      <h1>Inventory</h1>
      {inventoryList &&
        [...inventoryList].map((inventory, index) => (
          <div key={index}>
            <img src={inventory.image} width={100} />
            <p>{inventory.name}</p>
            {inventory.selected ? (
              <button>착용 중</button>
            ) : (
              <button onClick={() => selectSkin(inventory.id)}>착용하기</button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Inventory;
