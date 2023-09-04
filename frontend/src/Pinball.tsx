import React, { useEffect,useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse } from 'matter-js';
import './Pinball.css'
import { div } from 'three/examples/jsm/nodes/Nodes.js';
const width = window.innerWidth;
const height = window.innerHeight;
let B:any[]=[]
function App() {
  const [balls, setBalls] = useState<any[]>([]); 
  const [renderKey, setRenderKey] = useState(0);
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
      fillStyle: '#ffcc00', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall1 = Bodies.rectangle(width, height, 40, height*2, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall2 = Bodies.rectangle(0, 0, 40, height*2, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall3 = Bodies.rectangle(0, 0, width*2, 40, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall4 = Bodies.circle(width/2, height/2, 50, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });

    // Create cup-shaped boundary using vertices

    // Create balls array
    function rand(min:number, max:number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // const balls:any[] = [];
    const Color=['red','green','blue','white','yellow','green','purple','grey']
    const X=[width/10,width*3/10,width*5/10,width*7/10,width*9/10]
    const Y=[height/10]
    // Listen for mouse clicks to create balls
    var clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    })();
    render.canvas.addEventListener(clickEvent, () => {
      
      for (let i = 0; i < 10; i++) {
      const ball = Bodies.circle(X[rand(0,4)], Y[0], 16.5, {
        restitution: 0.5,
        friction: 0.001,
        density: 1,
        isStatic: false,
        render: {
        fillStyle: Color[rand(0,7)], // 공의 색상을 빨간색으로 설정
        strokeStyle: 'white', // 테두리를 투명하게
        lineWidth:3,
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
    const shuffledBalls = [...balls];
    for (let i = shuffledBalls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBalls[i], shuffledBalls[j]] = [shuffledBalls[j], shuffledBalls[i]];
    }
    setBalls(shuffledBalls);
    setRenderKey(renderKey + 1); // 키 값을 변경하여 리렌더링
  }

  return (
    <div id="canvas" key={renderKey}>
      <button onClick={shuffleBalls}>shuffle</button>
<svg width={width} height={height}>
        {balls.map((ball, index) => (
          <circle
            key={index}
            cx={ball.position.x}
            cy={ball.position.y}
            r={ball.circleRadius}
            fill={ball.render.fillStyle}
            stroke={ball.render.strokeStyle}
            strokeWidth={ball.render.lineWidth}
          >
            <text
              x={ball.position.x}
              y={ball.position.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="16"
              fill="white"
            >
              {index + 1}
            </text>
          </circle>
        ))}
      </svg>
    </div>
    
  );
}

export default App;
