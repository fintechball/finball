import styles from "../../pages/Transfer/AccountDetail.module.css";
import GroupAccountModal from "../../components/GroupAccount/GroupAccountModal";
import { useState } from "react";

function TradeHistory({ tradeHistoryDict }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameHistory, setGameHistory] = useState({});

  const closeModal = () => {
    setIsModalOpen(false);
    setGameHistory({});
  };

  return (
    <>
      {tradeHistoryDict &&
        Object.keys(tradeHistoryDict).map((key) =>
          tradeHistoryDict[key].map((tradeHistory, index) => (
            <div key={index}>
              {index === 0 ? (
                <p className={styles.bankAccount}>
                  {key.split("-")[1]}월 {key.split("-")[2]}일
                </p>
              ) : (
                <></>
              )}
              <div className={styles.part} onClick={() => {
                if (tradeHistory.gameHistory) {
                  console.log("조회" + tradeHistory.gameHistory.member);
                  setGameHistory(tradeHistory.gameHistory);
                  setIsModalOpen(true);
                }
              }}>
                <div>
                  <p className={styles.name}>
                    {tradeHistory.opposite.userName}
                  </p>
                  <p className={styles.time}>{tradeHistory.time}</p>
                </div>
                <div className={styles.money}>
                  {tradeHistory.type === "입금" ? (
                    <p className={styles.value}>{tradeHistory.value}원</p>
                  ) : (
                    <p className={styles.minusValue}>-{tradeHistory.value}원</p>
                  )}

                  <p className={styles.remain}>{tradeHistory.balance}원</p>
                </div>
              </div>
            </div >
          ))
        )
      }
      {isModalOpen && (
        < GroupAccountModal onClose={closeModal} data={gameHistory} />
      )}
    </>
  );
}

export default TradeHistory;
