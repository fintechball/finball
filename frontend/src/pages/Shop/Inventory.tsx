import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Inventory() {
  const [inventoryList, setInventoryList] = useState<any>(null);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = inventoryList && inventoryList.length;

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = () => {
    axios
      .get(`${BASE_HTTP_URL}/ball/inventory`, {
        headers: {
          Authorization: token.accessToken,
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
            Authorization: token.accessToken,
          },
        }
      )
      .then(() => {
        getInventory();
      });
  };

  const viewDetail = () => {
    setIsDetail(true);
  };

  const viewInventory = () => {
    setIsDetail(false);
  };

  const preview = (id) => {
    console.log(id, "미리보기 기능");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <h1>Inventory</h1>
      {isDetail ? (
        <div>
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <img
              src={inventoryList[activeStep].image}
              width={50}
              onClick={viewDetail}
            />
            <p>{inventoryList[activeStep].name}</p>
            <div>
              <button onClick={() => preview(inventoryList[activeStep].id)}>
                내 계좌에서 미리보기
              </button>
            </div>
            <div>
              {inventoryList[activeStep].selected ? (
                <button>착용 중</button>
              ) : (
                <button
                  onClick={() => selectSkin(inventoryList[activeStep].id)}
                >
                  착용하기
                </button>
              )}
            </div>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
          <button onClick={viewInventory}>목록가기</button>
        </div>
      ) : (
        inventoryList && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 6, sm: 8, md: 12 }}
            >
              {[...inventoryList].map((inventory, index) => (
                <Grid xs={2} sm={4} md={4} key={index}>
                  <img src={inventory.image} width={50} onClick={viewDetail} />
                  <p>{inventory.name}</p>
                  {inventory.selected ? (
                    <button>착용 중</button>
                  ) : (
                    <button onClick={() => selectSkin(inventory.id)}>
                      착용하기
                    </button>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      )}
      {!isDetail && (
        <button onClick={() => navigate("/shop")}>상점 가기</button>
      )}
    </div>
  );
}

export default Inventory;
