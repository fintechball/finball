import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../../pages/Transfer/AccountList.module.css";
import { setAccount } from "../../store/slices/accountSlice";

function AccountShort({ accountList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToAccountDetail = (account) => {
    // 리덕스에 저장
    dispatch(
      setAccount({
        account: account.account,
        company: account.company,
      })
    );
    navigate("/accountDetail");
  };

  return (
    <>
      <p className={styles.part}>입출금</p>
      {[...accountList].map((account, index) => (
        <div key={index} className={styles.account}>
          <img src={account.company.logo} />
          <div>
            <p className={styles.text}>{account.account.name}</p>
            <p className={styles.balance}>{account.account.balance}원</p>
          </div>
          <button onClick={() => goToAccountDetail(account)}>송금</button>
        </div>
      ))}
    </>
  );
}

export default AccountShort;
