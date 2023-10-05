import { useState, useEffect } from "react";

import styles from "./Header.module.scss";
import finballLogo from "../../assets/finballLogo.png";
// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import Logout from "../Auth/Logout";

// import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';


// 유저 정보 계속 업데이트
// import UserInfo from "../Auth/UserInfo";

// 클릭시 홈으로
function handleImageClick() {
  window.location.href = "/"; // "/" 경로로 이동
}

function Header() {
  const navigate = useNavigate();
  const title = "";

  const [isLogged, setIsLogged] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.accessToken) {
      setIsLogged(true);
    }
  }, [auth]);

  const items: MenuProps['items'] = [
    {
      label: <Logout />,
      key: '0',
      style: {
        fontFamily: "Pretendard Variable",
        fontSize: '14px',
        fontWeight: 'normal',
      },
    },
    {
      label: <button onClick={() => navigate('/navpage')}>전체 메뉴</button>,
      key: '1',
      style: {
        fontFamily: "Pretendard Variable",
        fontSize: '14px',
        fontWeight: 'normal',
      },
    },
  ];

  // const token = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <div>
      {/* <UserInfo /> */}
      {/* {token} */}
      <div className={styles.header}>
        <img src={finballLogo} alt="Finball Logo" onClick={handleImageClick} />
        {/* <p>{title}</p> */}
        {isLogged ? (
          <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img src={auth.image} alt="" className={styles.profileimg}/>
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
        ) : (
          <button
            className={styles.loginbutton}
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
