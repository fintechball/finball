import styles from "../../pages/Transfer/AccountDetail.module.css";

function TradeHistory({ tradeHistoryDict }) {
  return (
    <>
      {tradeHistoryDict &&
        Object.keys(tradeHistoryDict).map((key) =>
          tradeHistoryDict[key].map((tradeHistory, index) => (
            <>
              {index === 0 ? (
                <p className={styles.bankAccount}>
                  {key.split("-")[1]}월 {key.split("-")[2]}일
                </p>
              ) : (
                <></>
              )}
              <div className={styles.part}>
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
            </>
          ))
        )}
    </>
  );
}

export default TradeHistory;
