// import { useNavigate } from "react-router-dom";
import { persistor } from "../../store/store";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setLogged } from "../../store/slices/loggedSlice";
import styles from "./Logout.module.scss";

function Logout() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    location.reload();
    await persistor.purge();
    dispatch(setLogged(false));
  };

  return (
    <div>
      <button className={styles.logoutbutton} onClick={async () => Logout()}>
        <span>로그아웃</span>
      </button>
    </div>
  );
}

export default Logout;
