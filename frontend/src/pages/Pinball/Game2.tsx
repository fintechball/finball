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

function Game2() {

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
  const [engine, setEngine] = useState(null); // 엔진 상태 추가
  let render;
  useEffect(() => {
    async function initialize() {
    const engine = Engine.create({
      timing:{
        frameRate:60,
      }});
    render = Render.create({
      element: document.getElementById('canvas'),
      engine: engine,
      options: {
        width: 360,
        height: 1800,
        wireframes: false,
        background: 'black',
      },
    });
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      engine.gravity.y = 0.20
      console.log(engine.gravity.y)
    } else {
      engine.gravity.y = 0.20
      console.log(engine.gravity.y)
    }
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

    const clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    });
    for (let i = 0; i < 40; i++) {
      const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], width/70, {
        restitution: 0.9,
        friction: 0.1,
        density: 8,
        isStatic: false,
        render: {
          fillStyle: "red",
          strokeStyle: 'white',
          lineWidth: 1,
        },
      });
      balls.push(ball);
      World.add(engine.world, ball);
      }
    const Boundary = [
    wall1, wall2, wall3,
      ground];
    World.add(engine.world, Boundary);
    setEngine(engine);
    Engine.run(engine)
    Render.run(render);
    }
    initialize()
  }, []);
  return (
    <div id="canvas" style={{width:"360px",height:"1800px"}}>
    </div>
    
  );
}

export default Game2;