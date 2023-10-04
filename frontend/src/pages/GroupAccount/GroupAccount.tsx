import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./GroupAccount.module.scss";
import GroupFinball from "../Pinball/GroupFinball";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import GroupAccountModal from "../../components/GroupAccount/GroupAccountModal";
import { setAccount } from "../../store/slices/accountSlice";
import { useParams } from "react-router-dom";
import { setGroupFinball } from "../../store/slices/groupfinballSlice"
function formatMoney(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const GroupAccount = () => {
  const [value, setValue] = useState({ parent: "groupfinball-canvas" });
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  // 계좌번호
  const accountNo = useParams().no;
  const companyCode = 106;

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://j9e106.p.ssafy.io/api/group/account/" + accountNo,
      // url: "http://localhost:8080/api/group/account" + accountNo,
      headers: {
        Authorization: accessToken,
      },
    }).then((res) => {
      const balance = res.data.data.balance;
      setResponse(res.data.data);
      setValue({ parent: "pinball-canvas" });
      // setData(res.data.data);
      console.log(res.data.data, 'here');
      const state = {
        account: {
          no: accountNo,
          name: res.data.data.name,
          balance: res.data.data.balance,
        },
        company: { code: companyCode },
      };
      dispatch(setAccount(state));
      dispatch(setGroupFinball({
        members:res.data.data.member,
        balance:res.data.data.balance,
        accountno:res.data.data.accountNo,
        history:res.data.data.tradeHistory
        ,
      }))
    });
  }, []);

  useEffect(() => {
    if (response) {
      setData(response); // response가 존재할 때만 복사
    }
  }, [response]);
  console.log(data);
  useEffect(() => {
    if (data) {
      setBalance(formatMoney(data.balance)); // data가 변경될 때만 실행
    }
  }, [data]);

  return (
    <div className={styles.container}>
      {data ? (
        <div>
          <div className={styles.head}>
            <div className={styles.contents}>
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
            </div>
            <div className={styles.members}>
              <div className={styles.container}>
                <span onClick={openModal}>모달</span>
              </div>
              {data.member.map((member, index) => (
                <div key={index} className={styles.member}>
                  <span>{member.name}</span>
                  <span>{member.balance.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          {isModalOpen && (
            <GroupAccountModal onClose={closeModal} data={data} />
          )}
          <div id="pinball-canvas" className={styles.finballBox}>
            <GroupFinball value={value} state={data} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GroupAccount;
