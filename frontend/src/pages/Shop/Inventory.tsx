import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSkin } from "../../store/slices/skinSlice";
import styles from "./inventory.module.scss";
import yellowball from "../../assets/yellowball.png";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import { RootState } from "../../store/store";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Inventory() {
  const [inventoryList, setInventoryList] = useState<any>(null);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = inventoryList && inventoryList.length;

  useEffect(() => {
    getPoint();
    getInventory();
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

  const getInventory = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/ball/inventory`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        setInventoryList(response.data.data.inventoryDtoList);
      });
  };

  const selectSkin = (skin: any) => {
    console.log(skin);
    axios
      .post(
        `${BASE_HTTP_URL}/api/ball/select`,
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
        dispatch(setSkin(skin));
        getInventory();
      });
  };

  const viewDetail = (index) => {
    setActiveStep(index);
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
    <div className={styles.container}>
      <div className={styles.pointbox}>
        <img src={yellowball} alt="" />
        <h3>{point} Point</h3>
      </div>
      <div className={styles.textbox}>
        <h2>보유중인 스킨</h2>
      </div>

      {isDetail ? (
        <div>
          <div className={styles.skinImgWrapper}>
            <img
              className={styles.skinImg}
              src={inventoryList[activeStep].image}
              // onClick={viewDetail}
            />
          </div>
          <p className={styles.skinName}>{inventoryList[activeStep].name}</p>
          <div>
            {/* <button
              className={styles.preview}
              onClick={() => preview(inventoryList[activeStep].id)}
              disabled={true}
            >
              내 계좌에서 미리보기
            </button> */}
          </div>
          <div>
            {inventoryList[activeStep].selected ? (
              <button className={styles.selectedButton} disabled={true}>
                착용 중
              </button>
            ) : (
              <button
                className={styles.unSelectedButton}
                onClick={() => selectSkin(inventoryList[activeStep])}
              >
                착용하기
              </button>
            )}
          </div>
          <div className={styles.stepperbox}>
            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              sx={{ maxWidth: 250, flexGrow: 1 }}
              activeStep={activeStep}
              nextButton={
                <Button
                  size="large"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  <strong>Next</strong>
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="large"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  <strong>Back</strong>
                </Button>
              }
            />
          </div>
          <button className={styles.subbutton} onClick={viewInventory}>
            목록가기
          </button>
        </div>
      ) : (
        inventoryList && (
          <div className={styles.inventoryList}>
            {[...inventoryList].map((inventory, index) => (
              <div className={styles.skinItem} key={index}>
                <img
                  className={styles.smallskinImg}
                  src={inventory.image}
                  onClick={() => viewDetail(index)}
                />
                <p className={styles.smallskinName}>{inventory.name}</p>
                {inventory.selected ? (
                  <button className={styles.selectedButton} disabled={true}>
                    착용 중
                  </button>
                ) : (
                  <button
                    className={`${styles.unSelectedButton} ${styles.bluebutton}`}
                    onClick={() => selectSkin(inventory)}
                  >
                    착용하기
                  </button>
                )}
              </div>
            ))}
          </div>
        )
      )}
      {!isDetail && (
        <button
          className={`${styles.subbutton} ${styles.floatbutton}`}
          onClick={() => navigate("/shop")}
        >
          <LocalMallOutlinedIcon />
          <span>상점 가기</span>
        </button>
      )}
    </div>
  );
}

export default Inventory;
