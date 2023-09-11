import React, { useEffect,useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse } from 'matter-js';

import './Pinball.css'
import { div } from 'three/examples/jsm/nodes/Nodes.js';
import Coin from "./assets/coin.png";
import Pocket from "./assets/pocket.png";
import Bit from "./assets/bit.png"
import Dogi from "./assets/dogi.png"
import Yak from "./assets/yak.png";
import Nam from "./assets/nam.png"
import Bomb from "./assets/bomb.gif";
import Wafle from "./assets/wafle.png";
import Suma from "./assets/suma.png";

const width = window.innerWidth;
const height = window.innerHeight;

let B:any[]=[]
function App() {
  const [balls, setBalls] = useState<any[]>([]); 
  useEffect(() => {
    // Create a Matter.js engine
    const engine = Engine.create({});
// 중력 설정
engine.world.gravity.x = 0; // x 방향 중력을 0으로 설정
engine.world.gravity.y = 0.5; // y 방향 중력을 조절 (조절 값에 따라 다르게 설정 가능)

    // Create a renderer
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          background: 'white'
      }
  });

    // Create a mouse and add mouse interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        }
      }
    });

    // Add mouse constraint to the world
    World.add(engine.world, mouseConstraint);

    // Create ground

    console.log(width,height  )
    const ground = Bodies.rectangle(width, height, width*2, 40, { isStatic: true,render: {
      fillStyle: 'white', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall1 = Bodies.rectangle(width, height, 40, height*2, { isStatic: true,render: {
    fillStyle: 'white', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall2 = Bodies.rectangle(0, 0, 40, height*2, { isStatic: true,render: {
  fillStyle: 'white', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall3 = Bodies.rectangle(0, 0, width*2, 40, { isStatic: true,render: {
  fillStyle: 'white', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall4 = Bodies.circle(width/2, height/2, 50, { isStatic: true,render: {
    // fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });

    // Create cup-shaped boundary using vertices

    // Create balls array
    function rand(min:number, max:number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // const balls:any[] = [];
    const Color=[Coin,Pocket,Dogi,Nam]
    const X=[width/10,width*3/10,width*5/10,width*7/10,width*9/10]
    const Y=[height/10]
    // Listen for mouse clicks to create balls
    const clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    })();
    render.canvas.addEventListener(clickEvent, () => {
      
      for (let i = 0; i < 10; i++) {
      const ball = Bodies.circle(X[rand(0,4)], Y[0], 17.5, {
        restitution: 0.1,
        friction: 0.001,
        density: 1,
        isStatic: false,
        render: {
          fillStyle: 'rgba(255, 0, 0, 0.5)', // 공의 색상을 빨간색으로 설정
          strokeStyle: 'rgba(255, 0, 0, 0.5)', // 테두리를 투명하게
          lineWidth:3,
          sprite: {
            texture: Coin, // Replace with your image path
            xScale: 0.08, // Adjust the image scale as needed
            yScale: 0.08,
          },
        },
      });

      balls.push(ball);
      B=[...balls]
      World.add(engine.world, ball);
  }});

    // Add all bodies to the world
    const Boundary=[ground,wall1,wall2,wall3]
    World.add(engine.world, Boundary);

    // Run the engine and renderer
    Engine.run(engine);
    Render.run(render);
  }, []);
  function shuffleBalls() {
    const shuffledBalls = [...B]; // 복사본 생성
    console.log(shuffledBalls)
    for (let i = shuffledBalls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBalls[i], shuffledBalls[j]] = [shuffledBalls[j], shuffledBalls[i]]; // 배열 요소 무작위 교환
    }
    setBalls(shuffledBalls); // 상태 업데이트
  }

  return (
    <div id="canvas">
      <button onClick={shuffleBalls}>shuffle</button>

    </div>
    
  );
}

export default App;