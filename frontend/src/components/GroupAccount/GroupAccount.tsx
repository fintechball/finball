import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import redball from '../../assets/redball.png';
import greenball from "../../assets/greenball.png"
import yellowball from '../../assets/yellowball.png';
import blueball from '../../assets/blueball.png';
import purpleball from '../../assets/purpleball.png';
import whiteball from '../../assets/whiteball.png';
import styles from "./GroupAccount.module.scss"


const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function GroupAccount() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const colorlist={
    0:redball,
    1:greenball,
    2:blueball,
    3:yellowball,
    4:purpleball,
    5:whiteball,
  }

  const selectAccount = (accountNo) => {
    navigate("/groupAccount/" + accountNo);
  };

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/api/group/account/list`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {data?.groupAccountList ? (
        data.groupAccountList.map((account, index) => (
          <div className={styles.account} key={index}>
            <img src={colorlist[index % 6]} className={styles.ballImage}/>
            <div className={styles.accountbox}>
              <p className={styles.text}>{account.name} 통장</p>
              <p className={styles.balance}>{account.groupAccountNo
}</p>
            </div>
            <button className={`${styles.bluebutton} ${styles.accountbutton}`} onClick={() => selectAccount(account.groupAccountNo)}><span>보기</span></button>
          </div>
        ))
      ) : (
        <div className={styles.noncontainer}>
          <p>연결된 모임통장이 없습니다.</p>

        </div>
      )}
    </div>
  );
}

export default GroupAccount;
