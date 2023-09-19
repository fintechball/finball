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

import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";

import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  //   const currentUrl = useSelector((state: RootState) => state.router.currentUrl);
  const currentUrl = location.pathname;

  useEffect(() => {
    console.log(currentUrl);
  }, [currentUrl]);

  return (
    <div>
      <div className={styles.footer}>
        {currentUrl === "/" ? (
          <HomeRoundedIcon />
        ) : (
          <HomeOutlinedIcon
            onClick={() => {
              navigate("/");
            }}
          />
        )}
        {currentUrl === "/chatbot" ? (
          <ForumRoundedIcon />
        ) : (
          <QuestionAnswerOutlinedIcon
            onClick={() => {
              navigate("/chatbot");
            }}
          />
        )}
        {currentUrl === "/quiz" ? (
          <TipsAndUpdatesRoundedIcon />
        ) : (
          <TipsAndUpdatesOutlinedIcon
            onClick={() => {
              navigate("/quiz");
            }}
          />
        )}
        {currentUrl === "/shop" ? (
          <LocalMallRoundedIcon />
        ) : (
          <LocalMallOutlinedIcon
            onClick={() => {
              navigate("/shop");
            }}
          />
        )}
        <MenuRoundedIcon
          onClick={() => {
            navigate("/navpage");
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
