import { useState, useEffect } from "react";

import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import styles from "./MyInfo.module.scss";
// import profileimg from "../../assets/profiletemp.png"

function MyInfo() {
  const [isLogged, setIsLogged] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.accessToken) {
      setIsLogged(true);
    }
  }, [auth]);

  return (
    <>
      <div className={styles.rootcontainer}>
        {/* todo : 프로필사진 추가 */}
        {isLogged ? (
          <div className={styles.container}>
            <img src={auth.image} />
            <div className={styles.textbox}>
              <div>
                <span>안녕하세요,</span>
                <br />
                <span className={styles.name}>{auth.name}</span>
                <span>님!</span>
              </div>
              <div>
                <p>ID : {auth.userId}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2>
              로그인하면 더 많은 서비스를 <br /> 이용할 수 있어요.
            </h2>
          </>
        )}
      </div>
    </>
  );
}

export default MyInfo;
