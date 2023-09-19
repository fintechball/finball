import styles from "./Footer.module.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { useState } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  // const [isHome, setIsHome] = useState(false);
  // const [isChat, setIsChat] = useState(false);
  // const [isQuiz, setIsQuiz] = useState(false);
  // const [isHome, setIsHome] = useState(false);

  return (
    <div>
      <div className={styles.footer}>
        <HomeOutlinedIcon />
        <QuestionAnswerOutlinedIcon />
        <TipsAndUpdatesOutlinedIcon />
        <LocalMallOutlinedIcon />
        <MenuRoundedIcon />
      </div>
    </div>
  );
}

export default Footer;
