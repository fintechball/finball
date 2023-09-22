import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "80%",
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  // p: 4,
};

const divStyle = {
  display: "flex", // 자식 요소들을 가로로 정렬하기 위해 flex 사용
  flexDirection: "column", // 자식 요소들을 세로로 배치
  alignItems: "center", // 수직 중앙 정렬
  justifyContent: "center", // 수평 중앙 정렬
};

function Shop() {
  const [skinList, setSkinList] = useState<any>(null);
  const token = useSelector((state) => state.token);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    getSkin();
  }, [token]);

  const getSkin = () => {
    axios
      .get(`${BASE_HTTP_URL}/ball`, {
        headers: {
          Authorization: token.accessToken,
        },
      })
      .then((response) => {
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
    axios
      .post(
        `${BASE_HTTP_URL}/ball/purchase`,
        {
          id: skin.id,
        },
        {
          headers: {
            Authorization: token.accessToken,
          },
        }
      )
      .then(() => {
        getSkin();
      });
  };

  return (
    <div>
      <h1>Shop</h1>
      {skinList && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 6, sm: 8, md: 12 }}
            >
              {[...skinList].map((skin, index) => (
                <Grid xs={2} sm={4} md={4} key={index}>
                  <img
                    src={skin.image}
                    width={50}
                    onClick={() => handleOpen(index)}
                  />
                  <p>{skin.name}</p>
                  {skin.invented ? <p>보유중</p> : <p>{skin.value}</p>}
                </Grid>
              ))}
            </Grid>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={divStyle}>
                <img
                  src={skinList[index].image}
                  width={50}
                  onClick={() => handleOpen(index)}
                />
                <p>{skinList[index].name}</p>
                {skinList[index].invented ? (
                  <button>보유중</button>
                ) : (
                  <button onClick={() => buySkin(skinList[index])}>구매</button>
                )}
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Shop;
