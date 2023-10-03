import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import Modal from "@mui/material/Modal";
import styles from "./Shop.module.scss";
import yellowball from "../../assets/yellowball.png"

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "80%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function Shop() {
  const [skinList, setSkinList] = useState<any>(null);
  const [index, setIndex] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const auth = useSelector((state : RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getPoint();
    getSkin();
  }, []);

  const getPoint = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/user/point`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setPoint(response.data.data.point);
      });
  };

  const getSkin = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data.data.skin)
        setSkinList(response.data.data.skin);
      });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (index: number) => {
    setOpen(true);
    setIndex(index);
  };
  const handleClose = () => setOpen(false);

  const buySkin = (skin) => {
    console.log(skin.id);
    axios
      .post(
        `${BASE_HTTP_URL}/api/ball/purchase`,
        {
          id: skin.id,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then(() => {
        getPoint();
        getSkin();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <button className={`${styles.subbutton} ${styles.floatbutton}` } onClick={() => navigate("/inventory")}>
        내 인벤토리 가기
      </button>
      <div className={styles.pointbox}>
        <img src={yellowball} alt="" />
        <h3>{point} Point</h3>
      </div>
      <h2>포인트 상점</h2>
      {skinList && skinList.length !== 0 && (
        <div className={styles.skinContainer}>
          {skinList.map((skin, index) => (
            <div className={styles.skinItem} key={index}>
              <img
                src={skin.image}
                className={styles.skinImg}
                onClick={() => handleOpen(index)}
              />
              <p className={styles.skinName}>{skin.name}</p>
              {skin.invented ? (
                <p className={styles.skinPoint}>보유중</p>
              ) : (
                <div className={styles.skinPointBox}>
<img src={yellowball} alt="" />
                  <p className={styles.skinPoint}>{skin.value}</p>
                </div>
              )}
              {skin.invented ? (
                <button className={styles.hadbutton} disabled={true}>보유중</button>
              ) : (
                <button className={styles.buybutton} onClick={() => buySkin(skin)}>구매</button>
              )}
            </div>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style}>
              <div style={divStyle}>
                <img
                  src={skinList[index].image}
                  className={styles.skinImg}
                  onClick={() => handleOpen(index)}
                />
                <p className={styles.skinName}>{skinList[index].name}</p>
                {skinList[index].invented ? (
                  <button className={styles.hadbutton} disabled={true}>보유중</button>
                ) : (
                  <button className={styles.buybutton} onClick={() => buySkin(skinList[index])}>구매</button>
                )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Shop;
