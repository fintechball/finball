import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse, Body,Events,Common,Constraint,Runner } from 'matter-js';

import Modal from 'react-modal';
import finball from "../../assets/finball.png" 
import styles from './Game.module.css';
import decomp from 'poly-decomp';
import { Float } from '@react-three/drei';
const width = 360;
const height = 1800;
const Payment = 1;
const theme = '#4C4499';
  const dummy=
    [
    {"user_name":"김정희","ball_id":0,"cnt":10,"user_color":''},
    {"user_name":"서정희","ball_id":3,"cnt":10,"user_color":''},
    {"user_name":"신현탁","ball_id":1,"cnt":10,"user_color":''},
    {"user_name":"정영빈","ball_id":2,"cnt":10,"user_color":''},
    {"user_name":"정현우","ball_id":5,"cnt":10,"user_color":''},
    {"user_name":"하성호","ball_id":5,"cnt":10,"user_color":''},
      ]

function App() {

  const [balls, setBalls] = useState([]);
  const [ballTexts, setBallTexts] = useState([]);
  const [isGroundRemoved, setIsGroundRemoved] = useState(false);
  const [ballCount, setBallCount] = useState(0);
  const Pay=[];
  const [redCount, setRedCount] = useState(0);
  const [blueCount, setBlueCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [yellowCount, setYellowCount] = useState(0);
  const [purpleCount, setPurpleCount] = useState(0);
  const [orangeCount, setOrangeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonOpen, setisButtonOpen] = useState('visible');
  const [once,setOnce]=useState(false);
  const [finx,finy]=[102,103];
  const word=width*0.04+'px';
  const [userColor, setUserColor] = useState({
    "red":"unknown",
    "blue":"unknown",
    "green":"unknown",
    "orange":"unknown",
    "purple":"unknown",
    "yellow":"unknown",
  });
  const [balllist, setBalllist] = useState([]);
  const X = [
    width / 40, 
    width * 2 / 40,
    width * 3 / 40, 
    width * 4 / 40,
    width * 5 / 40,
    width * 6 / 40,
    width * 7 / 40,
    width * 8 / 40,
    width * 9 / 40,
    width * 10 / 40,
    width * 11 / 40,
    width * 12/ 40,
    width * 13/ 40,
    width * 14 / 40,
    width * 15 / 40,
    width * 16 / 40,
    width * 17 / 40,
    width * 18 / 40,
    width * 19 / 40,
  ];
  const Y = [height / 30,height / 40,height / 35];
  const [totalCnt,setTotalCnt] = useState(0)
  const [engine, setEngine] = useState(null); // 엔진 상태 추가
  let render;
  let angle=0;
  const Color = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  function openModal() {
    setIsModalOpen(true);
  }
  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    location.reload();
  };
// 중복 없이 랜덤 값을 추출하는 함수
function getRandomUniqueItems(array, count) {
  const shuffled = array.slice(); // 원본 배열을 복제하여 새 배열 생성
  let currentIndex = shuffled.length, temporaryValue, randomIndex;

  // 배열을 섞는 Fisher-Yates 알고리즘
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  // 앞에서부터 count 개수만큼 추출
  return shuffled.slice(0, count);
}

// 예제 사용법
const myArray = [0,1,2,3,4,5];
const randomItems = getRandomUniqueItems(myArray, 6); // 3개의 중복 없는 랜덤 값 추출

const setColor = () => {
  let B=[];
  let tmp = 0;
  for (let i = 0; i < Color.length; i++) {
    tmp += dummy[i]["cnt"];
    dummy[i]["user_color"] = Color[randomItems[i]];
    setUserColor((prevState) => ({
      ...prevState,
      [Color[randomItems[i]]]: dummy[i]["user_name"],
    }));
  }

  let sum = 0;
  for (let i = 0; i < dummy.length; i++) {
    sum += dummy[i].cnt;
    for (let j = 0; j<dummy[i].cnt;j++){
      B.push(dummy[i].user_color)
    }
  }
  setTotalCnt(sum);
  const shuffledBall = shuffleArray(B);
  setBalllist(shuffledBall);
};
const setGravity = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    engine.gravity.y = 0.20
    engine.gravity.scale=0.001
    console.log(engine.gravity.scale)
  } else {
    engine.gravity.y = 0.20
    engine.gravity.scale=0.001
    console.log(engine.gravity.scale)
  }
};

function start() {
  for (let i = 0; i < totalCnt; i++) {
    const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], width/70, {
      restitution: 1,
      friction: 0.1,
      density: 5,
      isStatic: false,
      render: {
        fillStyle: balllist[i],
        strokeStyle: 'white',
        lineWidth: 1,
      },
    });
    balls.push(ball);
    const rootDiv = document.getElementById('canvas');
    const textElement = document.createElement('div');
    textElement.textContent = `${userColor[balllist[i]]}`; // 원하는 텍스트를 추가하세요.
    textElement.id=`${balls[i].id}`
    textElement.style.position = 'absolute';
    textElement.style.zIndex = "1";
    textElement.style.color = balllist[i];
    textElement.style.top = `${ball.position.y-10}px`; // 초기 위치 설정
    textElement.style.left = `${width/2-180-ball.position.x}px`;
    rootDiv.appendChild(textElement);
    // document.body.div.appendChild(textElement);
    ballTexts.push(textElement);
      World.add(engine.world, ball);
    }};
    
  function shuffleArray(array) {
    // 배열의 복사본을 만듭니다.
    const shuffledArray = [...array];
  
    // Fisher-Yates 알고리즘을 사용하여 배열을 섞습니다.
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }
  
useEffect(() => {
  if (totalCnt !== 0) {
    start(); // totalCnt가 0이 아닐 때 start 실행
    
  }
}, [totalCnt]);
  useEffect(() => {
    async function initialize() {
    const engine = Engine.create({
      timing:{
        // frameRate: 60,     // 초당 60프레임
        timestamp:2000,
      }})
    render = Render.create({
      element: document.getElementById('canvas'),
      engine: engine,
      options: {
        fps: 30,
        isFixed: true,
        width: 360,
        height: 1800,
        wireframes: false,
        isFixed: true,
        background: 'black',
      },
    });
    console.log(render)
    
    Common.setDecomp(decomp);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      engine.gravity.y = 0.20
      // engine.gravity.scale=0.0001
    console.log(engine.gravity.scale)
    console.log(engine.timing)
    console.log(engine)
    } else {
      engine.gravity.y = 0.20
    console.log(engine.gravity.scale)

    }
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, mouseConstraint);

    const ground = Bodies.rectangle(width/2, height , width, height*0.005, {
      isStatic: true,
      label:"Ground",
      render: {
        fillStyle: theme,
        strokeStyle: 'transparent',
      },
    });

    const wall1 = Bodies.rectangle(width, height*0.5, width*0.02, height, {
      isStatic: true,
      render: {
        fillStyle: theme,
        strokeStyle: 'transparent',
      },
    });
    const block = Bodies.rectangle(width*0.5, height*0.03, width*0.02, height*0.06, {
      isStatic: true,
      render: {
        fillStyle:theme,
        strokeStyle: 'transparent',
      },
    });

    const wall2 = Bodies.rectangle(0, height*0.5, width*0.02, height, {
      isStatic: true,
      render: {
        fillStyle: theme,
        strokeStyle: 'transparent',
      },
    });

    const wall3 = Bodies.rectangle(width*0.5, 0, width, width*0.02, {
      isStatic: true,
      render: {
        fillStyle: theme,
        strokeStyle: 'transparent',
      },
    });

    const wall4 = Bodies.rectangle(width*0.25, height*0.06, width*0.5, width*0.02, {
      isStatic: true,
      label:"start",
      render: {
        fillStyle: theme,
        strokeStyle: 'transparent',
      },
    });
    //x,y,width,height
    //대각선
    const dia1 = Bodies.rectangle(width*3/4, height*0.0888, height*0.1152, width*0.02, {
        isStatic: true,
        angle: Math.PI /6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });

      const dia2 = Bodies.rectangle(height*0.0866, height*0.13, height*0.2, width*0.02, {
        isStatic: true,
        angle: Math.PI /6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      //순서
      const wall5 = Bodies.rectangle(height*0.173, height*0.2, width*0.02, height*0.043, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const dia3 = Bodies.rectangle(height*0.1065, height*0.258, height*0.15357, width*0.02, {
        isStatic: true,
        angle: -Math.PI/6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const dia4 = Bodies.rectangle(width, height*0.258, height*0.15357, width*0.02, {
        isStatic: true,
        angle: -Math.PI /6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const wall6 = Bodies.rectangle(height*0.13299, height*0.336, width*0.02, height*0.081, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const wall7 = Bodies.rectangle(width*0.2, height*0.336, width*0.02, height*0.081, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const dia5 = Bodies.rectangle(0, height*0.398094, height*0.09236, width*0.02, {
        isStatic: true,
        angle: -Math.PI/6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const dia6 = Bodies.rectangle(width, height*0.4136, height*0.154, width*0.02, {
        isStatic: true,
        angle: +Math.PI /6, 
        render: {
          fillStyle:theme,
          strokeStyle: 'transparent',
        },
      });
      const dia7 = Bodies.rectangle(0, height*0.9, height*0.2, width*0.02, {
        isStatic: true,
        angle: Math.PI/6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const dia8 = Bodies.rectangle(width, height*0.9, height*0.2, width*0.02, {
        isStatic: true,
        angle: -Math.PI /6, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const wall8 = Bodies.rectangle(height*0.0860, height*0.975, width*0.02, height*0.053, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const wall9 = Bodies.rectangle(height*0.1145, height*0.975, width*0.02, height*0.053, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      
      const FinBallLogo = Bodies.rectangle(width * 0.5, height * 0.5, width * 0.3, width * 0.3, {
        isStatic: true,
        label: "TEST",
        angle: Math.PI / 4,
        render: {
          sprite: {
            texture: finball,
            yScale:width * 0.3/finx,
            xScale:width * 0.3/finy,
          },
        },
      });

      const borderBody = Bodies.rectangle(width * 0.5, height * 0.5, width * 0.3, width * 0.3, {
        isStatic: true, // 이 바디를 움직이지 않도록 설정
        angle: Math.PI / 4,
        render: {
          fillStyle:"white",
          strokeStyle: theme, // 테두리 색상
          lineWidth: 3, // 테두리 두께
        },
      });
      const little1 = Bodies.rectangle(width * 0.9, height * 0.6, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little2 = Bodies.rectangle(width * 0.5, height * 0.6, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little3 = Bodies.rectangle(width * 0.3, height * 0.6, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little4 = Bodies.rectangle(width * 0.7, height * 0.6, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little5 = Bodies.rectangle(width * 0.1, height * 0.6, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle1 = Bodies.rectangle(width * 0.2, height * 0.615, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle2 = Bodies.rectangle(width * 0.4, height * 0.615, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle3 = Bodies.rectangle(width * 0.6, height * 0.615, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle4 = Bodies.rectangle(width * 0.8, height * 0.615, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle5 = Bodies.rectangle(0, height * 0.615, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle6 = Bodies.rectangle(width, height * 0.615, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little6 = Bodies.rectangle(width * 0.9, height * 0.63, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little7 = Bodies.rectangle(width * 0.5, height * 0.63, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little8 = Bodies.rectangle(width * 0.3, height * 0.63, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little9 = Bodies.rectangle(width * 0.7, height * 0.63, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little10 = Bodies.rectangle(width * 0.1, height * 0.63, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle7 = Bodies.rectangle(width * 0.2, height * 0.645, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle8 = Bodies.rectangle(width * 0.4, height * 0.645, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle9 = Bodies.rectangle(width * 0.6, height * 0.645, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle10 = Bodies.rectangle(width * 0.8, height * 0.645, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle11 = Bodies.rectangle(0, height * 0.645, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const middle12 = Bodies.rectangle(width, height * 0.645, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little11 = Bodies.rectangle(width * 0.9, height * 0.66, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little12 = Bodies.rectangle(width * 0.5, height * 0.66, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little13 = Bodies.rectangle(width * 0.3, height * 0.66, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little14 = Bodies.rectangle(width * 0.7, height * 0.66, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const little15 = Bodies.rectangle(width * 0.1, height * 0.66, width * 0.08, width * 0.08, {
        isStatic: true,
        angle: Math.PI / 4,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const Svertices = [
        { x: 0, y: 0 },
        { x: width*0.1, y: 0 },
        { x: width*0.1, y: width*0.02 },
        { x: width*0.02, y: width*0.02 },
        { x: width*0.02, y: width*0.04 },
        { x: width*0.1, y: width*0.04 },
        { x: width*0.1, y: width*0.1 },
        { x: 0, y: width*0.1 },
        { x: 0, y: width*0.08 },
        { x: width*0.08, y: width*0.08 },
        { x: width*0.08, y: width*0.06 },
        { x: 0, y: width*0.06 },

      ];
      const sShape1 = Bodies.fromVertices(width*0.1, height*0.8, Svertices, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
          lineWidth: 2,
        },
      }, true);
      const sShape2 = Bodies.fromVertices(width*0.3, height*0.8, Svertices, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
          lineWidth: 2,
        },
      }, true);
      const Avertices = [
        { x: 0, y: 0 },
        { x: width*0.0577, y: width*0.1 },
        { x: width*0.0377, y: width*0.1 },
        { x: width*0.0277, y: width*0.08 },
        { x: -width*0.0277, y: width*0.08 },
        { x: -width*0.0377, y: width*0.1 },
        { x: -width*0.0577, y: width*0.1 },
      ];
      const aShape = Bodies.fromVertices(width*0.5, height*0.8, Avertices, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: theme,
          lineWidth: 2,
        },
      }, true);
      const Fvertices = [
        { x: 0, y: 0 },
        { x: width*0.1, y: 0 },
        { x: width*0.1, y: width*0.02 },
        { x: width*0.02, y: width*0.02 },
        { x: width*0.02, y: width*0.04 },
        { x: width*0.1, y: width*0.04 },
        { x: width*0.1, y: width*0.06 },
        { x: width*0.02, y: width*0.06 },
        { x: width*0.02, y: width*0.1 },
        { x: 0, y: width*0.1 },
      ];
      const fShape = Bodies.fromVertices(width*0.7, height*0.8, Fvertices, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
          lineWidth: 2,
        },
      }, true);
      const Yvertices = [
        { x: 0, y: 0 },
        { x: width*0.02, y: 0 },
        { x: width*0.05, y: width*0.04 },
        { x: width*0.08, y: 0 },
        { x: width*0.1, y: 0 },
        { x: width*0.06, y: width*0.05 },
        { x: width*0.06, y: width*0.1 },
        { x: width*0.04, y: width*0.1 },
        { x: width*0.04, y: width*0.05 },

      ];
      const yShape = Bodies.fromVertices(width*0.9, height*0.8, Yvertices, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
          lineWidth: 2,
        },
      }, true);
      const rot1 = Bodies.rectangle(height*0.0866, height*0.13,width *0.2, width *0.2, {
        isStatic: true,
        angle: Math.PI /3, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot2 = Bodies.rectangle(width*3/4, height*0.0888, width *0.2, width *0.2, {
        isStatic: true,
        angle: Math.PI /3, 
        render: {
          fillStyle:theme,
          strokeStyle: 'transparent',
        },
      });
      const rot3 = Bodies.rectangle(width * 0.15, height * 0.5, width  *0.2, width  *0.02, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot4 = Bodies.rectangle(width * 0.85, height * 0.5, width *0.2, width  *0.02, {
        isStatic: true,
        render: {
          fillStyle: theme, 
          strokeStyle: 'transparent',
        },
      });
      const rot5 = Bodies.rectangle(width * 0.35, height * 0.4, width  *0.25, width  *0.02, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot6 = Bodies.rectangle(width * 0.5, height * 0.71, width  *0.28, width  *0.02, {
        isStatic: true,
        collisionFilter: { group: -1 },
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot7 = Bodies.rectangle(width * 0.18, height * 0.71, width  *0.28, width  *0.02, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot8 = Bodies.rectangle(width * 0.82, height * 0.71, width  *0.28, width  *0.02, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const stick1 = Bodies.rectangle(width*0.3, height*0.95,width *0.3+height*0.02, width  *0.02, {
        isStatic: true,
        angle: -Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const stick2 = Bodies.rectangle(width*0.7, height*0.95,width *0.3+height*0.02, width  *0.02, {
        isStatic: true,
        angle: Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const stick3 = Bodies.rectangle(height*0.0866, height*0.13, width  *0.3 , width  *0.02, {
        isStatic: true,
        angle: Math.PI /3, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
    const clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    })();
    const Boundary = [
      wall4,rot1,rot2,rot3,rot4,rot5,rot6,rot7,rot8,stick1,stick2,stick3, wall1, wall2, wall3,
      block,wall5,dia1,dia2,dia3,dia4,wall6,wall7,wall8,wall9,dia5,dia6,dia7,dia8,borderBody,FinBallLogo,little2,little3,little4,
      little5,little1,middle1,middle2,middle3,middle4,middle5,middle6,little6,little7,little8,little9,little10,
      middle7,middle8,middle9,middle10,middle11,middle12,little11,little12,little13,little14,little15,sShape1,sShape2,aShape,fShape,yShape];
      Events.on(engine, 'afterUpdate', () => {
        for (let i = 0; i < balls.length; i++) {
          const ball = balls[i];
          const textElement = ballTexts[i];
          // 각 공의 위치에 따라 텍스트 위치 업데이트
          textElement.style.top = `${ball.position.y+20}px`;
          textElement.style.left = `${innerWidth/2-205+ball.position.x}px`;
          if (ball.position.y>height) {
            World.remove(engine.world, ball);
            const rootDiv = document.getElementById('canvas');
            rootDiv.removeChild(textElement);
            balls.splice(i, 1);
            ballTexts.splice(i, 1);
            i--;
          }
        }
      });
    World.add(engine.world, Boundary);
    setEngine(engine);
    Runner.run(engine)
    Render.run(render);
    setColor()
    }
    initialize()
  }, []);

  const removeGround = () => {
    setisButtonOpen("hidden")
    if (!isGroundRemoved) {
      for (let i=0;i<12;i++){
      World.remove(engine.world, engine.world.bodies[0]);}
      setIsGroundRemoved(true);
  
      const updatedBalls = [...balls];

      updatedBalls.forEach(ball => {
        Body.set(ball, { isStatic: false });
      });
  
      Engine.update(engine);
  
      // rot1을 함수 내부에서 정의
      const rot1 = Bodies.rectangle(height*0.0866, height*0.13,width *0.2, width *0.2, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot2 = Bodies.rectangle(width*3/4, height*0.0888, width *0.2, width *0.2, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot3 = Bodies.rectangle(width * 0.15, height * 0.5, width  *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot4 = Bodies.rectangle(width * 0.85, height * 0.5, width *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot5 = Bodies.rectangle(width * 0.35, height * 0.4, width  *0.25, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot6 = Bodies.rectangle(width * 0.5, height * 0.71, width  *0.28, width  *0.02, {
        isStatic: false,
        collisionFilter: { group: -1 },
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      var constraint1 = Constraint.create({
        pointA: { x: width * 0.5, y: height * 0.71 },
        bodyB: rot6,
        length: 0
    });
      const rot7 = Bodies.rectangle(width * 0.18, height * 0.71, width  *0.28, width  *0.02, {
        isStatic: false,
        collisionFilter: { group: -1 },
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      var constraint2 = Constraint.create({
        pointA: { x: width * 0.18, y: height * 0.71 },
        bodyB: rot7,
        length: 0
    });
      const rot8 = Bodies.rectangle(width * 0.82, height * 0.71, width  *0.28, width  *0.02, {
        isStatic: false,
        collisionFilter: { group: -1 },
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      var constraint3 = Constraint.create({
        pointA: { x: width * 0.82, y: height * 0.71 },
        bodyB: rot8,
        length: 0
    });
      const stick1 = Bodies.rectangle(width*0.3, height*0.95,width *0.3+height*0.02, width  *0.02, {
        isStatic: true,
        angle: -Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle:theme,
          strokeStyle: 'transparent',
        },
      });
      const stick2 = Bodies.rectangle(width*0.7, height*0.95,width *0.3+height*0.02, width  *0.02, {
        isStatic: true,
        angle: Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const stick3 = Bodies.rectangle(height*0.0866, height*0.13, width  *0.3 , width  *0.02, {
        isStatic: true,
        angle: Math.PI /4, 
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      // Engine 객체에 각도를 변경하는 함수를 등록
      let angle1 = 0;
      let angle2 = 0;
      let angle3 = 0;
      Events.on(engine, 'beforeUpdate', () => {
        angle1 += 0.03; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        Body.setAngle(rot1, angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot2, angle1); // rot1 요소의 각도를 변경
        Body.setAngle(stick3, angle1); // rot1 요소의 각도를 변경

      });
  
      World.add(engine.world, rot1);
      World.add(engine.world, rot2);
      World.add(engine.world, rot3);
      World.add(engine.world, rot4);
      World.add(engine.world, rot5);
      World.add(engine.world, stick3);
      World.add(engine.world, rot6);
      World.add(engine.world, rot7);
      World.add(engine.world, constraint1);
      World.add(engine.world, constraint2);
      World.add(engine.world, constraint3);
      World.add(engine.world, rot8);

      let cnt=0;
      let dir=[1,-1]
      Events.on(engine, 'beforeUpdate', () => {
        // angle2 += 0.1; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        angle2 += 0.04*dir[(Math.round(cnt/50))%2]; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        Body.setAngle(stick1, angle2); // rot1 요소의 각도를 변경
        Body.setAngle(stick2, -angle2); // rot1 요소의 각도를 변경
      });
      World.add(engine.world, stick1);
      World.add(engine.world, stick2);
      Events.on(engine, 'beforeUpdate', () => {
        cnt+=1
        // angle3 += 0.15*dir[(Math.round(cnt/25))%2];
        angle3 += 0.1;
        Body.setAngle(rot3, -angle3); // rot1 요소의 각도를 변경
        Body.setAngle(rot4, angle3); // rot1 요소의 각도를 변경
        Body.setAngle(rot5, angle3+1); // rot1 요소의 각도를 변경
      });
      World.add(engine.world, rot3);
      World.add(engine.world, rot4);
      World.add(engine.world, rot5);
      const updateScroll = () => {
        if (updatedBalls.length > 0) {
          let highestYBall = updatedBalls[0];
          for (let i = 1; i < updatedBalls.length; i++) {
            if (updatedBalls[i].position.y > highestYBall.position.y) {
              highestYBall = updatedBalls[i];
            }
          }
  
          if (!Pay.includes(highestYBall) && highestYBall.position.y >= height) {
            Pay.push(highestYBall);

            // 복사한 배열에서 해당 공 제거
            const indexToRemove = updatedBalls.findIndex(ball => ball.id === highestYBall.id);
            if (indexToRemove !== -1) {
              updatedBalls.splice(indexToRemove, 1);
        
              // ballTexts에서도 해당 공의 텍스트 엘리먼트 제거
              const del = ballTexts.findIndex(textElement => textElement.id === highestYBall.id);
              if (del !== -1) {
                const textElementToRemove = ballTexts[del];
                ballTexts.splice(del, 1);
                const rootDiv = document.getElementById('root')
                rootDiv.removeChild(textElementToRemove);
              }
        
              World.remove(engine.world, highestYBall);
        
              // 상태 업데이트
              setBalls([...updatedBalls]); // 새로운 배열을 만들어야 합니다.
              setBallTexts([...ballTexts]); // 새로운 배열을 만들어야 합니다.
            }
            setBallCount(Pay.length);
            setRedCount(Pay.filter(ball => ball.render.fillStyle === "red").length)
            setBlueCount(Pay.filter(ball => ball.render.fillStyle === "blue").length)
            setGreenCount(Pay.filter(ball => ball.render.fillStyle === "green").length)
            setYellowCount(Pay.filter(ball => ball.render.fillStyle === "yellow").length)
            setOrangeCount(Pay.filter(ball => ball.render.fillStyle === "orange").length)
            setPurpleCount(Pay.filter(ball => ball.render.fillStyle === "purple").length)
            //반중력효과
            // if (Pay.length==Math.round(Payment/2)&&once == false){
            //   setOnce(true)
            //   engine.gravity.y=-0.01
            //   setTimeout(() => {
            //     setGravity()
            //   }, 3000);
            //   console.log('half')
            // }
            if (Pay.length==Payment){
              setIsModalOpen(true)
              return;
            }
          }
  
          const targetScrollTop = highestYBall.position.y - window.innerHeight / 2;
          const currentScrollTop = window.pageYOffset;
          const scrollDiff = targetScrollTop - currentScrollTop;
  
          if (Math.abs(scrollDiff) > 1) {
            window.scrollTo(0, currentScrollTop + scrollDiff / 20);
          }
  
          requestAnimationFrame(updateScroll);
        }
      };
      updateScroll();
    }
  };
window.addEventListener('beforeunload', () => {
  // 페이지를 떠날 때 ballText 엘리먼트 삭제
  for (let i = 0; i < ballTexts.length; i++) {
    const textElementToRemove = ballTexts[i];
    const rootDiv = document.getElementById('canvas')
    rootDiv.removeChild(textElementToRemove);
  }
});
  return (
    <div id="canvas" style={{width:"360px",height:"1800px"}}>
      <div style={{ display: "flex",justifyContent: "center"}}>
      <button className={styles.btn} onClick={removeGround} style={{visibility:isButtonOpen}}>Finball!</button>
      </div>
      <div style={{ display: "flex",justifyContent: "flex-end"}}>
      <div
        style={{
          background: '#F4F4F4',
          padding: '5px 10px',
          borderRadius: "5%",
          opacity:0.5,
          fontSize:word,
          position:"fixed",
          border: "1px solid black"
          // ...ballCountPosition, // ballCountPosition의 위치를 적용
        }}
        >
        <div style={{color:"black"}}>지불금액: {ballCount}/{Payment}</div>
        <div style={{color:"red"}}>{userColor["red"]} : {redCount}</div>
        <div style={{color:"blue"}}>{userColor["blue"]} : {blueCount}</div>
        <div style={{color:"green"}}>{userColor["green"]} : {greenCount}</div>
        <div style={{color:"black",WebkitTextStroke: "0.2px yellow"}}>{userColor["yellow"]} : {yellowCount}</div>
        <div style={{color:"orange"}}>{userColor["orange"]} : {orangeCount}</div>
        <div style={{color:"purple"}}>{userColor["purple"]} : {purpleCount}</div>
      </div>
        </div>
          <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Custom Modal" // 모달의 레이블 설정
            style={{
              overlay: {
                background: 'transparent',
                zIndex:"5",
              },
              content: {
                width: '200px', // 모달의 너비
                height: '310px', // 모달의 높이
                position:"fixed",
                top: '50%', // 화면 상단에서 50% 위치로 이동
                left: '50%', // 화면 왼쪽에서 50% 위치로 이동
                transform: 'translate(-50%, -50%)', // 수직 및 수평으로 중앙에 위치시킴
                backgroundColor:"#F4F4F4",
                borderRadius:"5%"
              },
            }}
        >
          <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",zIndex:"5"}}>

        <h2 >게임결과</h2>
        <p style={{fontSize:word}}>다음 사람들은 돈을 지불하시오</p>
        <div style={{fontSize:word,color:"red"}}>{userColor["red"]}-{'>'}{redCount}</div>
        <div style={{fontSize:word,color:"blue"}}>{userColor["blue"]}-{'>'}{blueCount}</div>
        <div style={{fontSize:word,color:"green"}}>{userColor["green"]}-{'>'}{greenCount}</div>
        <div style={{color:"black",WebkitTextStroke: "0.2px yellow"}}>{userColor["yellow"]}-{'>'}{yellowCount}</div>
        <div style={{fontSize:word,color:"orange"}}>{userColor["orange"]}-{'>'}{orangeCount}</div>
        <div style={{fontSize:word,color:"purple"}}>{userColor["purple"]}-{'>'}{purpleCount}</div>
        <button onClick={closeModal} style={{width:"100px",aspectRatio:5,fontSize:word,marginTop:"10px",backgroundColor:"#A39AF5",color:"white"}}>Close</button>
          </div>
      </Modal>
    </div>
    
  );
}

export default App;
