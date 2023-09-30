import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChatBot.module.scss";
import { RootState } from "../../store/store"
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { SendOutlined }  from "@ant-design/icons"
import { Input } from "antd"

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function Chatbot() {
  const auth = useSelector((state : RootState) => state.auth);
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
        scrollToBottom();
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
        scrollToBottom();
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
        scrollToBottom();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 자동 스크롤
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // // 엔터로 입력받기
  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     doLogin();
  //   }
  // };

  return (
    <div className={styles.container}>
      {/* <img className={styles.profileimg} src={auth.image} alt="" /> */}
      {/* <button onClick={() => setMessageList(null)}>다지워</button> */}
      <div className={styles.chatcontainer}>
          {messageList &&
            messageList.length !== 0 &&
            [...messageList].map((message, index) => (
              <div key={index} className={styles.messagebox}>
                {message.type === "질문" && (
                  <img className={styles.profileimg} src={auth.image} alt="" />
                )}
                <div className={styles[message.type]}>
                  {message.body}
                </div>
              </div>
            ))}
          {isLoading && (
            <div className={styles.loadingMessage}>
              <CircularProgress color="inherit" />
            </div>
          )}
      </div>
      
      <div className={styles.inputcontainer}>
            <Input
              placeholder="질문을 입력하세요"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            ></Input>
            <button onClick={help} disabled={!question}><SendOutlined /></button>
      </div>
    </div>
  );
}

export default Chatbot;
