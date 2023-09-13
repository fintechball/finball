import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies } from 'matter-js';
import './Pinball.module.css';

function App() {
  const [engine, setEngine] = useState(null);
  const [render, setRender] = useState(null);

  // 부모 컨테이너의 크기를 가져오는 함수
  const getParentContainerSize = () => {
    const parentContainer = document.getElementById('home-canvas'); // 부모 컨테이너의 ID로 가져옴
    console.log(parentContainer.clientWidth,parentContainer.clientHeight)
    console.log(parentContainer)
    return {
      width: parentContainer.clientWidth,
      height: parentContainer.clientHeight,
    };
  };

  useEffect(() => {
    // 부모 컨테이너의 크기를 가져옴
    const parentSize = getParentContainerSize();
    // Create a Matter.js engine
    const newEngine = Engine.create({});
    setEngine(newEngine);

    // 중력 설정
    newEngine.world.gravity.x = 0;
    newEngine.world.gravity.y = 0.2;

    // Create a renderer
    const newRender = Render.create({
      element: document.getElementById('home-canvas'), // 렌더러를 부모 컨테이너에 적용
      engine: newEngine,
      options: {
        width: parentSize.width, // 부모 컨테이너의 가로 크기로 설정
        height: parentSize.height, // 부모 컨테이너의 세로 크기로 설정
        wireframes: false,
        background: 'white',
      },
    });
    setRender(newRender);

    // Create ground
    const ground = Bodies.rectangle(
      parentSize.width / 2,
      parentSize.height,
      parentSize.width * 2,
      parentSize.width * 0.01,
      {
        isStatic: true,
        render: {
          fillStyle: '#4C4499',
          strokeStyle: 'transparent',
        },
      }
    );
    const wall1 = Bodies.rectangle(parentSize.width, parentSize.height, parentSize.width*0.01, parentSize.height*2, { isStatic: true,render: {
      fillStyle: '#4C4499', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall2 = Bodies.rectangle(0, 0, parentSize.width*0.01, parentSize.height*2, { isStatic: true,render: {
      fillStyle: '#4C4499', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall3 = Bodies.rectangle(0, 0, parentSize.width*2, parentSize.width*0.01, { isStatic: true,render: {
      fillStyle: '#4C4499', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  

    // Create balls array
    const balls = [];
    for (let i = 0; i < 400; i++) {
      const ball = Bodies.circle(
        Math.random() * parentSize.width,
        Math.random() * parentSize.height,
        Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 55,
        {
          restitution: 0.01,
          friction: 0.001,
          density: 100,
          isStatic: false,
          render: {
            fillStyle: '#05CD01',
            strokeStyle: 'white',
            lineWidth: 3,
          },
        }
      );
      balls.push(ball);
    }

    const Boundary = [ground,wall1,wall2,wall3];
    World.add(newEngine.world, [...Boundary, ...balls]);

    // Run the engine and renderer
    Engine.run(newEngine);
    Render.run(newRender);

    // 윈도우 크기가 변경될 때 렌더러 크기를 업데이트
    window.addEventListener('resize', () => {
      const newSize = getParentContainerSize();
      Render.canvasSize(render, newSize.width, newSize.height);
      // 물리 엔진에서도 크기 업데이트 필요
      Bounds.update(render.bounds, newSize);
    });

    return () => {
      // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div id="pinball-canvas"></div>;
}

export default App;