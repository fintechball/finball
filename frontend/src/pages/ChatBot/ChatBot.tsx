import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChatBot.module.css";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Chatbot() {
  const auth = useSelector((state) => state.auth);
  const [messageList, setMessageList] = useState(null);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    saveMessage(question, "질문");
    setIsLoading(true);
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
        saveMessage(response.data.answer, "답변");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    setQuestion("");
  };

  const saveMessage = (message, type) => {
    axios
      .post(
        `${BASE_HTTP_URL}/api/message`,
        {
          answer: message,
          type: type,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then(() => {
        getMessageList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Chatbot</h1>

      {messageList &&
        messageList.length !== 0 &&
        [...messageList].map((message, index) => (
          <div className={styles[message.type]} key={index}>
            {message.body}
          </div>
        ))}
      {isLoading && (
        <div className={styles.loadingMessage}>
          <CircularProgress color="inherit" />
        </div>
      )}

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
