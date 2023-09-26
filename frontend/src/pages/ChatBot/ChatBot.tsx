import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChatBot.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Chatbot() {
  const auth = useSelector((state) => state.auth);
  const [messageList, setMessageList] = useState(null);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    getMessageList();
  }, []);

  const getMessageList = () => {
    axios
      .get(`${BASE_HTTP_URL}/api/message`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        setMessageList(response.data.data.messageList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const help = () => {
    axios
      .post(
        `${BASE_HTTP_URL}/chat_bot/gpt`,
        { question: question },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((response) => {
        saveMessage(response.data.answer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Chatbot</h1>

      <input
        placeholder="질문을 입력하세요"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      ></input>
      <button onClick={help}>전송</button>
    </div>
  );
}

export default Chatbot;
