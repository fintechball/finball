import React, { useEffect, useState } from "react";
import { Engine, Render, World, Bodies, Mouse,Body,Runner,MouseConstraint } from "matter-js";
import styles from "./Pinball.module.css";
import { useSelector,useDispatch } from "react-redux";
import redball from '../../assets/redball.png';
import greenball from '../../assets/greenball.png';
import yellowball from '../../assets/yellowball.png';
import blueball from '../../assets/blueball.png';
import purpleball from '../../assets/purpleball.png';
import whiteball from '../../assets/whiteball.png';

function GroupFinball(value,state) {
  const [balls, setBalls] = useState([]);
  console.log(value.state.member)
  // const ballunit=useSelector((state)=>state.groupfinball.ballunit)
  const balance = useSelector((state)=>state.groupfinball.balance)

  const colorlist={
    0:redball,
    1:greenball,
    2:blueball,
    3:yellowball,
    4:purpleball,
    5:whiteball,
  }
  // 부모 컨테이너의 크기를 가져오는 함수
  const getParentContainerSize = () => {
    const parentContainer = document.getElementById(value.value.parent); // 부모 컨테이너의 ID로 가져옴
    return {
      width: parentContainer.clientWidth,
      height: parentContainer.clientHeight,
    };
  };
  useEffect(() => {
    
    initialize();
  }, []);
  const initialize =async() => {
    const parentSize = getParentContainerSize();
    // Create a Matter.js engine
    const newEngine = Engine.create({});
    const runner = Runner.create({
      delta: 15,
      isFixed: false,
      enabled: true,
    });
    // 중력 설정
    newEngine.world.gravity.x = 0;
    newEngine.world.gravity.y = 0.6;
    // Create a renderer
    const newRender = Render.create({
      element: document.getElementById(value.value.parent), // 렌더러를 부모 컨테이너에 적용
      engine: newEngine,
      options: {
        width: parentSize.width, // 부모 컨테이너의 가로 크기로 설정
        height: parentSize.height, // 부모 컨테이너의 세로 크기로 설정
        wireframes: false,
        background: "white",
      },
    });
    // Create ground
    const ground = Bodies.rectangle(
      parentSize.width / 2,
      parentSize.height + (parentSize.width * 1) / 2,
      parentSize.width * 2,
      parentSize.width * 1,
      {
        isStatic: true,
        render: {
          // fillStyle: "transparent",
          fillStyle: "blue",
          // strokeStyle: "transparent",
          strokeStyle: "red",
        },
      }
    );
    const wall1 = Bodies.rectangle(
      parentSize.width + (parentSize.width * 1) / 2,
      parentSize.height / 2,
      parentSize.width * 1,
      parentSize.height,
      {
        isStatic: true,
        render: {
          // fillStyle: "#4C4499",
          // fillStyle: "transparent",
          fillStyle: "red",
          // strokeStyle: "transparent",
          strokeStyle: "red",
        },
      }
    );
    const wall2 = Bodies.rectangle(
      0 - (parentSize.width * 1) / 2,
      parentSize.height / 2,
      parentSize.width * 1,
      parentSize.height,
      {
        isStatic: true,
        render: {
          // fillStyle: "transparent",
          fillStyle: "red",
          // strokeStyle: "transparent",
          strokeStyle: "red",
        },
      }
    );
    const wall3 = Bodies.rectangle(
      0,
      0 - (parentSize.width * 1) / 2,
      parentSize.width * 2,
      parentSize.width * 1,
      {
        isStatic: true,
        render: {
          // fillStyle: "transparent",
          fillStyle: "red",
          // strokeStyle: "transparent",
          strokeStyle: "red",
        },
      }
    );
    // Create a mouse and add mouse interaction
    const mouse = Mouse.create(newRender.canvas);
    const mouseConstraint = MouseConstraint.create(newEngine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    // // Add mouse constraint to the world
    World.add(newEngine.world, mouseConstraint);
    // Create balls array
    for (let j=0;j<value.state.member.length;j++) {
    for (let i = 0; i < Math.round(value.state.member[j].balance/10000); i++) {
      const ball = Bodies.circle(
        Math.random() * parentSize.width,
        Math.random() * parentSize.height/5,
        Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 25,
        {
          density: 10,
          frictionAir: 0.06,
          restitution: 0.01,
          friction: 0.01,
          isStatic: false,
          isSensor:false,
          render: {
            fillStyle: "transparent",
            strokeStyle: "black",
            lineWidth: 3,
            // opacity: name !== members[j].name ? 1 : 0.5,
            sprite: {
              // texture: skinlist[members[j].skinId],
              texture: colorlist[j],
              xScale: Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23/29,
              yScale: Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23/29,
            },
          },
        }
      );
      balls.push(ball);
    }
  }
    const Boundary = [ground, wall1, wall2, wall3];
    World.add(newEngine.world, [...Boundary, ...balls]);

    Runner.run(runner, newEngine);
    Render.run(newRender);

};

  return (
    <div id="pinball-canvas">
      <div style={{ display: "flex",justifyContent: "flex-end"}}>
      <div className={styles.finball}>
        {balance}원
      </div>
      </div>
    </div>
  );
}

export default GroupFinball;
