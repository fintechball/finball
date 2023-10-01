import React, { useEffect, useState } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Mouse,
  Body,
  Runner,
  MouseConstraint,
} from "matter-js";
import styles from "./Pinball.module.css";
import defalautball from "../../assets/defalutball.png";
import chrome from "../../assets/chrome1.png";
import dogi from "../../assets/dogi1.png";
import docker from "../../assets/docker1.png";
import poke from "../../assets/poke1.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setFinBallAccount } from "../../store/slices/finBallAccountSlice";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";
const skinlist = {
  크롬: chrome,
  기본: defalautball,
  도지코인: dogi,
  도커: docker,
  포켓몬볼: poke,
};
function PinballJeongHui(value) {
  const [balls, setBalls] = useState([]);
  const finball = useSelector((state) => state.finBallAccount);
  const [ballInfo, setBallInfo] = useState(null);
  const ballskin = useSelector((state) => state.skin.skin);
  const finBallAccount = useSelector((state) => state.finBallAccount);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

  const calculateBallCount = (value) => {
    const vaultUnit = 500000;

    const vaultCount = Math.floor(value / vaultUnit);

    const amount = value - vaultCount * vaultUnit;

    // console.log("최소 금액 : ", vaultCount * vaultUnit);
    // console.log("계산할 금액 : ", value - vaultCount * vaultUnit);

    const ballCount = Math.floor((Math.ceil(amount / 10000) * 10000) / 10000);

    // console.log("공의 갯수 : ", ballCount);
    setBallInfo({
      ballunit: 10000,
      ballcnt: ballCount,
      minbalance: vaultCount * vaultUnit,
    });

    return {
      ballunit: 10000,
      ballcnt: ballCount,
      minbalance: vaultCount * vaultUnit,
    };
  };

  const getFinBAllAccount = (newEngine, newRender) => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        if (
          finBallAccount.account.no !== undefined &&
          response.data.data.account.balance -
            finBallAccount.account.balance !==
            0
        ) {
          const diff =
            response.data.data.account.balance - finBallAccount.account.balance;
          console.log("차액 : ", diff);
          if (diff > 0) {
            console.log("공을 늘리자");
            const past = calculateBallCount(finBallAccount.account.balance);
            const curr = calculateBallCount(response.data.data.account.balance);

            console.log("더해야 할 공 갯수 : ", curr.ballcnt - past.ballcnt);

            addBall(curr.ballcnt - past.ballcnt, newEngine, newRender);
          } else if (diff < 0) {
            console.log("공을 줄이자");
            const past = calculateBallCount(finBallAccount.account.balance);
            const curr = calculateBallCount(response.data.data.account.balance);

            console.log("줄여야 할 공 갯수 : ", past.ballcnt - curr.ballcnt);

            deleteBall(past.ballcnt - curr.ballcnt, newEngine, newRender);
          }
        }
        dispatch(
          setFinBallAccount({
            account: response.data.data.account,
            company: response.data.data.company,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialize = async () => {
    console.log("initialize");
    const parentSize = getParentContainerSize();
    // Create a Matter.js engine
    const newEngine = Engine.create({});
    const runner = Runner.create({
      delta: 10,
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

    const info = calculateBallCount(finBallAccount.account.balance);

    console.log("ball 갯수!!!!! : ", info.ballcnt);
    for (let i = 0; i < info.ballcnt; i++) {
      const ball = Bodies.circle(
        Math.random() * parentSize.width,
        (Math.random() * parentSize.height) / 5,
        Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 25,
        {
          density: 15,
          frictionAir: 0.06,
          restitution: 0.01,
          friction: 0.01,
          isStatic: false,
          isSensor: false,
          render: {
            fillStyle: "#05CD01",
            strokeStyle: "white",
            lineWidth: 3,
            // opacity:0.5,
            sprite: {
              texture: skinlist[ballskin.name],
              xScale:
                Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) /
                23 /
                29,
              yScale:
                Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) /
                23 /
                29,
            },
          },
        }
      );
      balls.push(ball);
    }

    const Boundary = [ground, wall1, wall2, wall3];
    World.add(newEngine.world, [...Boundary, ...balls]);
    Runner.run(runner, newEngine);
    Render.run(newRender);

    getFinBAllAccount(newEngine, newRender);
    // dispatch(setIsReady(true));
  };

  const addBall = (ballcnt, newEngine, newRender) => {
    const parentSize = getParentContainerSize();
    setTimeout(() => {
      for (let i = 0; i < ballcnt; i++) {
        const ball = Bodies.circle(
          Math.random() * parentSize.width,
          parentSize.height / 10,
          Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23,
          {
            density: 0.0005,
            frictionAir: 0.06,
            restitution: 0.3,
            friction: 0.01,
            isStatic: false,
            isSensor: false,
            render: {
              fillStyle: "#05CD01",
              strokeStyle: "white",
              lineWidth: 3,
              sprite: {
                //''하면 스프라이트 적용x
                texture: skinlist[ballskin.name],
                xScale:
                  Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) /
                  23 /
                  30,
                yScale:
                  Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) /
                  23 /
                  30,
              },
            },
          }
        );
        balls.push(ball);
        console.log(newEngine);
        World.add(newEngine.world, ball);
        Render.run(newRender);
      }
    }, 2000);
  };

  const deleteBall = (num, newEngine, newRender) => {
    const parentSize = getParentContainerSize();
    setTimeout(() => {
      const exitVelocity = 20;
      const sortedBalls = [...balls].sort(
        (a, b) => b.position.y - a.position.y
      );

      // 각 공을 삭제하면서 새로운 배열에 추가
      const ball = [];
      const dir = [1, -1];
      for (let i = 0; i < num; i++) {
        const removedBall = balls.pop();
        removedBall.isSensor = true;
        Body.setVelocity(removedBall, {
          x: exitVelocity * dir[i % 2],
          y: 0,
        });
        ball.push(removedBall);
      }

      function update() {
        // 각 공의 위치를 조정
        ball.forEach((b) => {
          b.position.y += exitVelocity / 30; // 1초에 60프레임으로 가정
          // 화면 밖으로 벗어난 공을 삭제
          if (
            b.position.y >
              parentSize.height +
                Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) /
                  23 ||
            b.position.x >
              parentSize.width +
                Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) /
                  23 ||
            b.position.x <
              -Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23
          ) {
            // Matter.js World에서 삭제
            World.remove(newEngine.world, b);
            ball.splice(ball.indexOf(b), 1);
          }
        });
      }
      Render.run(newRender);
      update();
    }, 2000);
  };

  return (
    <div id="pinball-canvas">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className={styles.finball}>{finball.account.balance}원</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          alignContent: "flex-end",
        }}
      >
        {ballInfo !== null && (
          <div className={styles.minbal}>{ballInfo.minbalance}원</div>
        )}
      </div>
    </div>
  );
}

export default PinballJeongHui;
