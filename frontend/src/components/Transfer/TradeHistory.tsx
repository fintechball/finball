import axios from "axios";
import styles from "../../pages/Transfer/AccountDetail.module.css";
import GroupAccountModal from "../../components/GroupAccount/GroupAccountModal";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setAccountBooks } from "../../store/slices/accountBookSlice";

//const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
const BASE_HTTP_URL = "http://localhost:8080";

function TradeHistory({ tradeHistoryDict, isFinBall }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameHistory, setGameHistory] = useState({});

  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const accountbook = useSelector((state: RootState) => state.accountbook);
  const tradeHistoryState = useSelector((state: RootState) => state.tradeHistory);

  const closeModal = () => {
    setIsModalOpen(false);
    setGameHistory({});
  };

  const changeCategory = (target, tradeHistory) => {

    const headers: Record<string, string> = {
      'Authorization': accessToken,
      'Content-Type': 'application/json'
    }

    axios.post(`${BASE_HTTP_URL}/api/fin-ball/category`,
      {
        tradeHistoryId: tradeHistory.id,
        categoryId: target.value
      },
      {
        headers: headers
      })
      .then((res) => {
        alert("가계부에 반영하였습니다.");
        dispatch(
          setAccountBooks({
            account: res.data.data.account,
            tradeHistoryList: res.data.data.tradeHistoryList,
            categoryList: res.data.data.categoryList,
          }))
      })
      .catch((err) => {
        alert("가계부 작성이 실패했습니다.");
        console.log(err);
      })
  }

  return (
    <>
      {tradeHistoryDict &&
        //수정수정 
        //수정
        Object.keys(tradeHistoryDict).map((key) =>

          tradeHistoryDict[key].map((tradeHistory, index) => (
            <div key={tradeHistory.id}>
              {index === 0 ? (
                <p className={styles.bankAccount}>
                  {key.split("-")[1]}월 {key.split("-")[2]}일
                </p>
              ) : (
                <></>
              )}
              <div className={styles.part} onClick={() => {
                // 사람별로 얼마 지불했는지 보는 모달
                if (isFinBall == false && tradeHistory.gameHistory) {
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

                  {tradeHistory.type === "출금" && isFinBall == true && accountbook.categoryList.length > 0 &&
                    (
                      <select className={styles.remain} name="category" value={accountbook.tradeHistoryList[tradeHistory.index] && accountbook.tradeHistoryList[tradeHistory.index].category && accountbook.tradeHistoryList[tradeHistory.index].category.id ? accountbook.tradeHistoryList[tradeHistory.index].category.id : -1} onChange={(event) => {
                        changeCategory(event.target, tradeHistory)
                      }}>
                        <option value="-1">선택하지 않음</option>
                        {accountbook.categoryList.map((category: any) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}

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
