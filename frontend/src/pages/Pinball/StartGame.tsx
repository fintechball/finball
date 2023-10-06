import { useState, useEffect } from "react";
import styles from "./StartGame.module.scss";
import { useNavigate } from "react-router-dom";
import Toast, { Error, Success } from "../../components/Toast/Toast";
import Lottie from "lottie-react";
import pinball from "../../assets/pinball.json";

function StartGame() {
  const [red, setRed] = useState<String>("");
  const [blue, setBlue] = useState("");
  const [green, setGreen] = useState("");
  const [yellow, setYellow] = useState("");
  const [purple, setPurple] = useState("");
  const [white, setWhite] = useState("");
  const [cost, setCost] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name; // input 요소의 name 속성을 가져옵니다.
    const value = e.target.value; // input 요소의 값(value)을 가져옵니다.

    // name에 따라 해당하는 상태를 업데이트합니다.
    switch (name) {
      case "cost":
        setCost(value);
        break;
      case "red":
        setRed(value);
        break;
      case "blue":
        setBlue(value);
        break;
      case "green":
        setGreen(value);
        break;
      case "yellow":
        setYellow(value);
        break;
      case "purple":
        setPurple(value);
        break;
      case "white":
        setWhite(value);
        break;
      default:
        break;
    }
  };
  const goToGame = () => {
    if (
      cost == 0 ||
      (red == "" &&
        green == "" &&
        blue == "" &&
        yellow == "" &&
        purple == "" &&
        white == "")
    ) {
      Error("가격과 이름을 입력해주세요.");
    } else {
      const state = { cost, Name: { red, blue, green, yellow, purple, white } };
      console.log(state);
      navigate("/game2", { state });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textbox}>
        <h2>
          모임통장이 없어도 <br />
          핀볼 게임을 이용할 수 있어요!
        </h2>
        <div className={styles.anibox}>
          <Lottie
            animationData={pinball}
            loop={true}
            style={{ width: "150px" }}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div>정산 금액</div>
        <input
          className={styles.inputboxbalance}
          type="number"
          name="cost"
          placeholder="지불금액"
          value={cost}
          onChange={handleChange}
        />
        <div className={styles.memberbox}>
          <div className={styles.a}>
            <div>
              <div>멤버1</div>
              <input
                className={styles.inputbox}
                type="text"
                name="red"
                placeholder="red"
                value={red}
                onChange={handleChange}
              />
            </div>
            <div>
              <div>멤버2</div>
              <input
                className={styles.inputbox}
                type="text"
                name="blue"
                placeholder="blue"
                value={blue}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.b}>
          <div>
            <div>멤버3</div>

            <input
              className={styles.inputbox}
              type="text"
              name="green"
              placeholder="green"
              value={green}
              onChange={handleChange}
            />
          </div>
          <div>
            <div>멤버4</div>
            <input
              className={styles.inputbox}
              type="text"
              name="yellow"
              placeholder="yellow"
              value={yellow}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.c}>
          <div>
            <div>멤버5</div>
            <input
              className={styles.inputbox}
              type="text"
              name="purple"
              placeholder="purple"
              value={purple}
              onChange={handleChange}
            />
          </div>
          <div>
            <div>멤버6</div>
            <input
              className={styles.inputbox}
              type="text"
              name="white"
              placeholder="white"
              value={white}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.buttonbox}>
          <button onClick={goToGame} className={styles.sublightbutton}>
            게임하러가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartGame;
