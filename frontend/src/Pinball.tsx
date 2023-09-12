import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies } from 'matter-js';
import './Pinball.module.css'
const width = window.innerWidth;
const height = window.innerHeight;

function App() {
  const dummy=[{totalCnt:500}]
  const X = [
    width / 40, 
    width * 3 / 40, 
    width * 5 / 40,
    width * 7 / 40,
    width * 9 / 40,
    width * 11 / 40,
    width * 13 / 40,
    width * 15 / 40,
    width * 17 / 40,
    width * 19 / 40,
    width * 21 / 40,
    width * 23 / 40,
    width * 25 / 40,
    width * 27 / 40,
    width * 29 / 40,
    width * 31 / 40,
    width * 33 / 40,
    width * 35 / 40,
    width * 37 / 40,
    width * 39 / 40,

  ];
  const Y = [height / 30,height / 40,height / 35,height / 25];
  const [balls, setBalls] = useState([]);
  let engine, render;
  function start() {
    for (let i = 0; i < dummy[0]["totalCnt"]; i++) {
      const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], Math.sqrt(width**2+height**2)/55, {
        restitution: 0.01,
        friction: 0.001,
        density: 100,
        isStatic: false,
        render: {
          fillStyle: "#05CD01",
          strokeStyle: 'white',
          lineWidth: 3,
        },
      });
      balls.push(ball);
      World.add(engine.world, ball);
    }};
  useEffect(() => {
    // Create a Matter.js engine
    engine = Engine.create({});

    // 중력 설정
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.2;

    // Create a renderer
    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "white"

      }
    });
    // Create ground
    const ground = Bodies.rectangle(width, height, width*2, width*0.01, { isStatic: true,render: {
      fillStyle: '#4C4499', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall1 = Bodies.rectangle(width, height, width*0.01, height*2, { isStatic: true,render: {
    fillStyle: '#4C4499', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall2 = Bodies.rectangle(0, 0, width*0.01, height*2, { isStatic: true,render: {
    fillStyle: '#4C4499', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall3 = Bodies.rectangle(0, 0, width*2, width*0.01, { isStatic: true,render: {
    fillStyle: '#4C4499', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });

    // Create balls array
    const Boundary=[wall1,wall2,wall3,ground]
    World.add(engine.world, Boundary);

    // Run the engine and renderer
    Engine.run(engine);
    Render.run(render);
    start()
  }, []);
  return (
    <div id="canvas">
    </div>
  );
}

export default App;
