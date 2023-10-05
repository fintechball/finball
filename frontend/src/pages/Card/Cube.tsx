import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { TextureLoader } from "three";
import "./Card.module.scss";
import cardImg from "../../assets/2489card.png";

function Cube(props) {
  const cubeRef = useRef();

  // 이미지 로드
  const textureLoader = new TextureLoader();
  textureLoader.setCrossOrigin("anonymous");

  const texture = textureLoader.load(props.cardImage);

  useFrame(({ clock }) => {
    // 시간에 따라 자동으로 회전
    cubeRef.current.rotation.y += 0.005; // 회전 속도 조절
  });

  return (
    <Box
      args={[2, 3, 0.02]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      ref={cubeRef}
      scale={4}
    >
      <meshPhongMaterial attach="material" map={texture} />
    </Box>
  );
}

export default Cube;
