import { Link } from "react-router-dom";
import styles from "./GroupAccountModal.module.scss";
import redball from '../../assets/redball.png';
import greenball from "../../assets/greenball.png"
import yellowball from '../../assets/yellowball.png';
import blueball from '../../assets/blueball.png';
import purpleball from '../../assets/purpleball.png';
import whiteball from '../../assets/whiteball.png';

const GroupAccountModal = (props) => {
  const data = props.data;

  const colorlist={
    0:redball,
    1:greenball,
    2:blueball,
    3:yellowball,
    4:purpleball,
    5:whiteball,
  }

  console.log(data);
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.bankInfo}>
          <div className={styles.name}>{data.name} 통장</div>
          <div className={styles.smallbank}>
            <div className={styles.bankName}>핀볼</div>
            <div className={styles.accountNo}>{data.accountNo}</div>
          </div>
          <div className={styles.memberlength}><span>{data.member.length}명</span>이 함께하고 있어요.</div>
        </div>
        <div className={styles.accountBalance}>   
          <div className={styles.balance}>{data.balance.toLocaleString()}원</div>
        </div>
        <div className={styles.middlecontainer}>
          {data.member.map((member, index) => (
            <div key={index} className={styles.member}>
              <div className={styles.userContainer}>
                {/* <img src={member.profileImage} alt="" className={styles.profileImage}/> */}
                  <div className={styles.pibox}>
                  <img
                    src={member.profileImage}
                    className={styles.pi}
                  />
                  <img src={colorlist[index]} className={styles.ballImage} />
                  </div>
                <div className={styles.userInfo}>
                  <div className={styles.username}>{member.name}</div>
                  {data.gameEnd != true && (
                    <div className={styles.userBalance}>{member.balance.toLocaleString()}원</div>
                  )}
                  {/* 모임 거래내역에서 모달을 불렀다면.. value를 보여줌 */}
                  {data.gameEnd == true && (
                    <div className={styles.userBalance}> - {member.value.toLocaleString()}원</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
          <div className={styles.footer}>
            {data.gameEnd != true && (
              <Link to="/transferGroupAccount">
                <button className={`${styles.subbutton} ${styles.lightbutton}`}>이체하기</button>
              </Link>
            )}
            <button onClick={props.onClose} className={styles.graybutton}>닫기</button>
          </div>
      </div>
    </div>
  );
};

export default GroupAccountModal;
