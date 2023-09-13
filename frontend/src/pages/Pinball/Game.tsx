import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse, Body,Events } from 'matter-js';
import './Game.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import finball from "../../assets/finball.png" 
import styles from './Game.module.css';
const width = window.innerWidth;
const height = window.innerWidth*5;
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
  const [isGroundRemoved, setIsGroundRemoved] = useState(false);
  const [ballCount, setBallCount] = useState(0);
  const [ballCountPosition] = useState({ top: '20px', right: '20px' });
  const Pay=[];
  const [redCount, setRedCount] = useState(0);
  const [blueCount, setBlueCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [yellowCount, setYellowCount] = useState(0);
  const [purpleCount, setPurpleCount] = useState(0);
  const [orangeCount, setOrangeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonOpen, setisButtonOpen] = useState('visible');
  const [finx,finy]=[102,103];
  const word=width*0.013+'px';
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
    console.log('asdfasdfasdf')
    setIsModalOpen(true);
    console.log(isModalOpen)
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
function start() {
  for (let i = 0; i < totalCnt; i++) {
    const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], width/70, {
      restitution: 0.7,
      friction: 0.001,
      density: 0.001,
      label:"red",
      isStatic: false,
      render: {
        fillStyle: balllist[i],
        strokeStyle: 'black',
        lineWidth: 3,
      },
    });
    balls.push(ball);
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
        frameRate:10,
      }});
    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerWidth * 5,
        wireframes: false,
        background: 'white',
      },
    });

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      engine.gravity.y = 0.12
    } else {
      engine.gravity.y = 0.30
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
      const wall8 = Bodies.rectangle(height*0.08660, height*0.975, width*0.02, height*0.055, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const wall9 = Bodies.rectangle(height*0.1134, height*0.975, width*0.02, height*0.055, {
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

      const borderBody = Bodies.rectangle(width * 0.5, height * 0.5, width * 0.3, width * 0.3 + 6, {
        isStatic: true, // 이 바디를 움직이지 않도록 설정
        angle: Math.PI / 4,
        render: {
          fillStyle:"transparent",
          strokeStyle: theme, // 테두리 색상
          lineWidth: 3, // 테두리 두께
        },
      });
      const little2 = Bodies.rectangle(width * 4 / 8, height *  0.45,  width *0.3,width *0.3, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little3 = Bodies.rectangle(width * 1 / 8, height *  0.45,  width *0.3,width *0.3, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little4 = Bodies.circle(width * 2.5 / 8, height *  0.45,  width / 20, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little5 = Bodies.circle(width * 5.5 / 8, height *  0.45,  width / 20, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot1 = Bodies.rectangle(height*0.0866, height*0.13,width *0.25, width *0.25, {
        isStatic: true,
        label:"TEST",
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const rot2 = Bodies.rectangle(width*3/4, height*0.0888, width *0.2, width *0.2, {
        isStatic: true,
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
      const rot5 = Bodies.rectangle(width * 0.5, height * 0.4, width  *0.2, width  *0.02, {
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
        angle: -Math.PI /6, 
        label:"TEST",
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
    const Boundary = [wall4,rot1,rot2,rot3,rot4,rot5,stick1,stick2, wall1, wall2, wall3,block,wall5,dia1,dia2,dia3,dia4,wall6,wall7,wall8,wall9,dia5,dia6,dia7,dia8,FinBallLogo,borderBody];
 
    World.add(engine.world, Boundary);
    setEngine(engine);
    Engine.run(engine)
    Render.run(render);
    await setColor()
    }
    initialize()
  }, []);

  const removeGround = () => {
    setisButtonOpen("hidden")
    if (!isGroundRemoved) {
      for (let i=0;i<8;i++){
      World.remove(engine.world, engine.world.bodies[0]);}
      setIsGroundRemoved(true);
  
      const updatedBalls = [...balls];

      updatedBalls.forEach(ball => {
        Body.set(ball, { isStatic: false });
      });
  
      Engine.update(engine, 1000 / 240);
  
      // rot1을 함수 내부에서 정의
      const rot1 = Bodies.rectangle(height*0.0866, height*0.13,width *0.25, width *0.25, {
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
      const rot5 = Bodies.rectangle(width * 0.5, height * 0.4, width  *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      const stick1 = Bodies.rectangle(width*0.3, height*0.95,width *0.3+height*0.02, width  *0.01, {
        isStatic: true,
        angle: -Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle:theme,
          strokeStyle: 'transparent',
        },
      });
      const stick2 = Bodies.rectangle(width*0.7, height*0.95,width *0.3+height*0.02, width  *0.01, {
        isStatic: true,
        angle: -Math.PI /6, 
        label:"TEST",
        render: {
          fillStyle: theme,
          strokeStyle: 'transparent',
        },
      });
      // Engine 객체에 각도를 변경하는 함수를 등록
      let angle1 = 0;
      let angle2 = 0;
      Events.on(engine, 'beforeUpdate', () => {
        angle1 += 0.018; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        Body.setAngle(rot1, angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot2, angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot3, -angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot4, angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot5, -angle1+1); // rot1 요소의 각도를 변경
      });
  
      World.add(engine.world, rot1);
      World.add(engine.world, rot2);
      World.add(engine.world, rot3);
      World.add(engine.world, rot4);
      World.add(engine.world, rot5);
      Events.on(engine, 'beforeUpdate', () => {
        angle2 += 0.014; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        Body.setAngle(stick1, -angle2); // rot1 요소의 각도를 변경
        Body.setAngle(stick2, angle2+1.57); // rot1 요소의 각도를 변경
      });
      World.add(engine.world, stick1);
      World.add(engine.world, stick2);
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
            }
            setBalls(updatedBalls);
            setBallCount(Pay.length);
            setRedCount(Pay.filter(ball => ball.render.fillStyle === "red").length)
            setBlueCount(Pay.filter(ball => ball.render.fillStyle === "blue").length)
            setGreenCount(Pay.filter(ball => ball.render.fillStyle === "green").length)
            setYellowCount(Pay.filter(ball => ball.render.fillStyle === "yellow").length)
            setOrangeCount(Pay.filter(ball => ball.render.fillStyle === "orange").length)
            setPurpleCount(Pay.filter(ball => ball.render.fillStyle === "purple").length)
            if (Pay.length==Payment){
              console.log(Pay.length,Payment)
              console.log(Pay)
              // openModal()
              setIsModalOpen(true)
              console.log(isModalOpen)
              return;
            }
          }
  
          const targetScrollTop = highestYBall.position.y - window.innerHeight / 2;
          const currentScrollTop = window.pageYOffset;
          const scrollDiff = targetScrollTop - currentScrollTop;
  
          if (Math.abs(scrollDiff) > 1) {
            window.scrollTo(0, currentScrollTop + scrollDiff / 50);
          }
  
          requestAnimationFrame(updateScroll);
        }
      };
      updateScroll();
    }
  };
  return (
    <div id="canvas">

      <button className={styles.btn} onClick={removeGround} style={{visibility:isButtonOpen}}>Finball!</button>
      <div
        style={{
          position: 'fixed',
          zIndex:3,
          background: 'grey',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize:word,
          ...ballCountPosition, // ballCountPosition의 위치를 적용
        }}
      >
        <div style={{color:"white"}}>지불금액: {ballCount}</div>
        <div style={{color:"red"}}>{userColor["red"]} : {redCount}</div>
        <div style={{color:"blue"}}>{userColor["blue"]} : {blueCount}</div>
        <div style={{color:"green"}}>{userColor["green"]} : {greenCount}</div>
        <div style={{color:"yellow"}}>{userColor["yellow"]} : {yellowCount}</div>
        <div style={{color:"orange"}}>{userColor["orange"]} : {orangeCount}</div>
        <div style={{color:"purple"}}>{userColor["purple"]} : {purpleCount}</div>
      </div>
          <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Custom Modal" // 모달의 레이블 설정
            style={{
              overlay: {
                background: 'grey',
              },
              content: {
                width: '50%', // 모달의 너비
                height: '50%', // 모달의 높이
                top: '25%', // 모달을 수직으로 가운데 정렬
                left: '25%', // 모달을 수평으로 가운데 정렬
                zIndex:30,
              },
            }}
        >
        <h2>게임결과</h2>
        <p style={{fontSize:word}}>다음 사람들은 돈을 지불하시오</p>
        <div style={{fontSize:word,color:"red"}}>{userColor["red"]} : {redCount}</div>
        <div style={{fontSize:word,color:"blue"}}>{userColor["blue"]} : {blueCount}</div>
        <div style={{fontSize:word,color:"green"}}>{userColor["green"]} : {greenCount}</div>
        <div style={{fontSize:word,color:"yellow"}}>{userColor["yellow"]} : {yellowCount}</div>
        <div style={{fontSize:word,color:"orange"}}>{userColor["orange"]} : {orangeCount}</div>
        <div style={{fontSize:word,color:"purple"}}>{userColor["purple"]} : {purpleCount}</div>
        <button onClick={closeModal} style={{width:'20%',aspectRatio:5,fontSize:word,position:'absolute',left:'40%'}}>Close</button>
      </Modal>
    </div>
    
  );
}

export default App;
