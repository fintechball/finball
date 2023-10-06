import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { TextureLoader } from "three";
import "./Card.module.scss";
import cardImg from "../../assets/2489card.png";

function Cube(props) {
  const cubeRef = useRef();
  const { camera } = useThree();

  // 이미지 로드
  const textureLoader = new TextureLoader();
  textureLoader.setCrossOrigin("anonymous");
  const url = props.cardImage + "?not-from-cache-please";

  const texture = textureLoader.load(url);
  console.log(props.cardImage)
  console.log(texture)


  useFrame(({ clock }) => {
    // 시간에 따라 자동으로 회전
    cubeRef.current.rotation.y += 0.005; // 회전 속도 조절
    // cubeRef.current.rotation.y += 0; // 회전 속도 조절
    // 카메라 시점 변경 예제: 카메라를 위로 이동
    camera.position.set(0, 0, 10); // X, Y, Z 축을 따라 카메라의 위치를 설정
    camera.lookAt(0, 0, 1); // 카메라가 바라볼 대상을 설정
  });

  return (
    <Box
      args={[4.2, 3, 0.02]}
      position={[0, 0, 0]}
      rotation={[0, 6.27, 0]}
      ref={cubeRef}
      scale={2}
    >
      <meshPhongMaterial attach="material" map={texture} />
    </Box>
  );
}

export default Cube;
