import React, { useEffect, useState } from "react";
import { Engine, Render, World, Bodies, Body,Runner } from "matter-js";
import styles from "./Pinball.module.css";
import dafalautball from "../../assets/defalutball.png";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";

import { setFinBallAccount } from "../../store/slices/finBallAccountSlice";
import { setFinball } from "../../store/slices/finballSlice";
const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Pinball(value) {
  const [account, setAccount] = useState<any>(null);
  const [engine, setEngine] = useState(null);
  const [render, setRender] = useState(null);
  const [balls, setBalls] = useState([]);
  const finball = useSelector((state) => state.finBallAccount);
  const ballunit=useSelector((state)=>state.finballSlice.ballunit)
  const ballcnt = useSelector((state)=>state.finballSlice.ballcnt)
  // const ballunit=useState(1000)
  // const ballcnt = useState(0)
  // const [ballunit,setBallunit]=useState(10**((finball.account.balance).toString().length-3))
  // const [ballcnt, setBallcnt] = useState((finball.account.balance-Number((finball.account.balance).toString()[0])*10**((finball.account.balance).toString().length-1))/ballunit);
  const finBallAccount = useSelector((state) => state.finBallAccount);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // 부모 컨테이너의 크기를 가져오는 함수
  const getParentContainerSize = () => {
    const parentContainer = document.getElementById(value.value.parent); // 부모 컨테이너의 ID로 가져옴
    return {
      width: parentContainer.clientWidth,
      height: parentContainer.clientHeight,
    };
  };
  const test={}
  console.log(test)
  useEffect(() => {
    getFinBAllAccount();
  }, []);

  const getFinBAllAccount = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/fin-ball`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        if (finBallAccount.account.no !== undefined) {
          console.log("차액");
          console.log(
            response.data.data.account.balance - finBallAccount.account.balance
          );
        }
          dispatch((dispatch) => {
            const balance = response.data.data.account.balance;
            const balanceString = balance.toString();
            
            if (balanceString.length >= 3) {
              const ballunit = 10 ** (balanceString.length - 3);
              const firstDigit = Number(balanceString[0]);
              const ballcnt = (balance - firstDigit * 10 ** (balanceString.length - 1)) / ballunit;
              
              dispatch(
                setFinball({
                  ballunit: ballunit,
                  ballcnt: ballcnt,
                })
                );
              } else {
                const ballunit = 1000;
                const ballcnt=0;
                dispatch(
                  setFinball({
                    ballunit: ballunit,
                    ballcnt: ballcnt,
                  }))
                }
              });
              
              dispatch(
                setFinBallAccount({
                  account: response.data.data.account,
                  company: response.data.data.company,
                })
                );
              // else{
              //   const ballunit = 1000;
              //   const ballcnt=0;
              //   dispatch(
              //     setFinball({
              //       ballunit: ballunit,
              //       ballcnt: ballcnt,
              //     }))
              // }
              })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(ballunit)
    console.log(ballcnt)
    if (render) {
      Render.stop(render);
      render.canvas.remove();
      setRender(null);
      Engine.clear(engine);
  }
        // const n=(finball.account.balance).toString().length

        // if (((finball.account.balance).toString()[1])*10**(n-2)-10**(n-1)/2>0){
        //   setBallcnt(((finball.account.balance).toString()[1])*10**(n-2)-10**(n-1)/ballunit)
        // }
        
        // else{
        //   setBallcnt(((finball.account.balance).toString()[1])*10**(n-2)/ballunit)
        // }
    const parentSize = getParentContainerSize();
    // Create a Matter.js engine
    const newEngine = Engine.create({});
    const runner = Runner.create({
      delta: 7.5,
      isFixed: false,
      enabled: true
  });
    setEngine(newEngine);

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
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      }
    );
    const wall1 = Bodies.rectangle(
      parentSize.width,
      parentSize.height,
      parentSize.width * 0.01,
      parentSize.height * 2,
      {
        isStatic: true,
        render: {
          // fillStyle: "#4C4499",
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      }
    );
    const wall2 = Bodies.rectangle(
      0,
      0,
      parentSize.width * 0.01,
      parentSize.height * 2,
      {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      }
    );
    const wall3 = Bodies.rectangle(
      0,
      0,
      parentSize.width * 2,
      parentSize.width * 0.01,
      {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      }
    );
    // Create balls array
    for (let i = 0; i < ballcnt; i++) {
      const ball = Bodies.circle(
        Math.random() * parentSize.width,
        Math.random() * parentSize.height/5,
        Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 25,
        {
          density: 15,
          frictionAir: 0.06,
          restitution: 0.01,
          friction: 0.01,
          isStatic: false,
          isSensor:false,
          render: {
            fillStyle: "#05CD01",
            strokeStyle: "white",
            lineWidth: 3,
            // opacity:0.5,
            sprite: {
              //''히먄 스프라이트 적용x
              texture: dafalautball,
              xScale: Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23/29,
              yScale: Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23/29,
            },
          },
        }
      );
      balls.push(ball);
    }
    
    const deleteBall = () => {
      setTimeout(()=>{
      const exitVelocity = 20;
      const sortedBalls = [...balls].sort((a, b) => b.position.y - a.position.y);
  
      // 각 공을 삭제하면서 새로운 배열에 추가
      const ball = [];
      const dir = [1, -1];
      for (let i = 1; i < 2; i++) {
        const removedBall = balls.pop();
        removedBall.isSensor = true;
        Body.setVelocity(removedBall, { x: exitVelocity * dir[i % 2], y: 0 });
        ball.push(removedBall);
      }
  
      function update() {
        // 각 공의 위치를 조정
        ball.forEach(b => {
          b.position.y += exitVelocity / 30; // 1초에 60프레임으로 가정
          // 화면 밖으로 벗어난 공을 삭제
          if (
            b.position.y >
              parentSize.height +
                Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23 ||
            b.position.x >
              parentSize.width +
                Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23 ||
            b.position.x <
              -Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23
          ) {
            // Matter.js World에서 삭제
            World.remove(newEngine.world, b);
            ball.splice(ball.indexOf(b), 1);
          }
        });
      }
      // Runner.run(runner, newEngine);
           Render.run(newRender);
      update();
    },2000)
    };
    const addBall=()=>{
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
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
              isSensor:false,
              render: {
                fillStyle: "#05CD01",
                strokeStyle: "white",
                lineWidth: 3,
                sprite: {
                  //''하면 스프라이트 적용x
                  texture: dafalautball,
                  xScale: Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23/30,
                  yScale: Math.sqrt(parentSize.width ** 2 + parentSize.height ** 2) / 23/30,
                },
              },
            }
          );
          balls.push(ball);
          World.add(newEngine.world, ball);
          // Runner.run(runner, newEngine);
           Render.run(newRender);
        }
      }, 2000);
    }
    const getFinBAllAccount = () => {
      axios
        .get(`${BASE_HTTP_URL}/api/fin-ball`, {
          headers: {
            Authorization: auth.accessToken,
          },
        })
        .then((response) => {
          if (finBallAccount.account.no !== undefined) {
            console.log("차액");
            console.log(
              response.data.data.account.balance - finBallAccount.account.balance
            );
          }
          if (Number(response.data.data.account.balance - finBallAccount.account.balance)>0){
            addBall();
          }
          if (Number(response.data.data.account.balance - finBallAccount.account.balance)<0){
            deleteBall()
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
    getFinBAllAccount()
    const Boundary = [ground, wall1, wall2, wall3];
    World.add(newEngine.world, [...Boundary, ...balls]);

    // Run the engine and renderer
    // Render.stop(newRender);
    Runner.run(runner, newEngine);
    Render.run(newRender);

  }, [finball.account.balance]);

  return (
    <div id="group-canvas">
      <div style={{ display: "flex",justifyContent: "flex-end"}}>
      <div className={styles.finball}>
        {finball.account.balance}원
      </div>
      </div>
    </div>
  );
}

export default Pinball;