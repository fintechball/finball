import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "@react-three/drei";
import { TextureLoader } from "three";
import "./Card.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cardImg from "../../assets/2489card.png";
import styles from "./Card.module.scss";
import BBox from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Cube from "./Cube";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

// function Cube() {
//   const cubeRef = useRef();

//   // 이미지 로드
//   const textureLoader = new TextureLoader();

//   cardList[activeStep].card.name;

//   const texture = textureLoader.load(cardImg);

//   useFrame(({ clock }) => {
//     // 시간에 따라 자동으로 회전
//     cubeRef.current.rotation.y += 0.005; // 회전 속도 조절
//   });

//   return (
//     <Box
//       args={[2, 3, 0.02]}
//       position={[0, 0, 0]}
//       rotation={[0, 0, 0]}
//       ref={cubeRef}
//       scale={3}
//     >
//       <meshPhongMaterial attach="material" map={texture} />
//     </Box>
//   );
// }

function Card() {
  const navigate = useNavigate();

  const [cardList, setCardList] = useState<any>(null);
  const auth = useSelector((state) => state.auth);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = cardList && cardList.length;

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
        setCardList(response.data.data.getCardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={styles.container}>
      {cardList ? (
        <>
          <BBox sx={{ maxWidth: 400, flexGrow: 1 }}>
            <div className={styles.total}>
              <p className={styles.balance}>카드 목록</p>
              <button
                onClick={() => navigate("/company/card")}
                className={`${styles.bluebutton} ${styles.small}`}
              >
                + 추가 등록
              </button>
            </div>
            <div>
              <Canvas
                camera={{ fov: 75, near: 1, far: 20, position: [7, 7, 0] }}
                style={{ height: "400px" }}
              >
                <ambientLight intensity={1} />
                <directionalLight position={[1, 2, 4]} intensity={1} />
                <Cube cardImage={cardList[activeStep].card.image} />
                <OrbitControls />
              </Canvas>
            </div>
            <p className={styles.cardname}>{cardList[activeStep].card.name}</p>
            <div className={styles.stepperbox}>
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
            </div>
          </BBox>
          <button
            className={styles.sublightbutton}
            onClick={() => navigate("/qrScanner")}
          >
            이 카드로 결제하기
          </button>
        </>
      ) : (
        <>
          <div className={styles.noncontainer}>
            <p>연결된 카드가 없습니다.</p>
            <button onClick={() => navigate("/company/card")}>
              + 카드 연결하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
