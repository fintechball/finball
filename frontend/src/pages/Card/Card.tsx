import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from '@react-three/drei';
import './Card.module.css'

function Cube() {
  const cubeRef = useRef();

  useFrame(({ clock }) => {
    // 시간에 따라 자동으로 회전
    cubeRef.current.rotation.y += 0.005; // 회전 속도 조절
  });

  return (
    <Box args={[2, 3, 0.02]} position={[0, 0, 0]} rotation={[0, 0, 0]} ref={cubeRef}  scale={1.5}>
      <meshPhongMaterial attach="material" color={0x44a88} />
    </Box>
  );
}

function Card() {
  return (
    <div>
    <Canvas
    camera={
      {fov:75,
        near:1,
        far:20,
        position:[7,7,0]
    }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 4]} intensity={1} />
      <Cube />
      <OrbitControls />
    </Canvas>
    </div>
  );
}

export default Card;
