import axios from "axios";
import styles from "../../pages/Transfer/AccountDetail.module.css";
import GroupAccountModal from "../../components/GroupAccount/GroupAccountModal";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setAccountBooks } from "../../store/slices/accountBookSlice";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";

function TradeHistory({ tradeHistoryDict, isFinBall }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameHistory, setGameHistory] = useState({});

  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const accountbook = useSelector((state: RootState) => state.accountbook);

  const [category, setCategory] = useState([]);

  const closeModal = () => {
    setIsModalOpen(false);
    setGameHistory({});
  };

  const changeCategory = (target, tradeHistory) => {

    alert("수정요청 => " + tradeHistory.id + "를," + target.value);

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
        console.log("카테고리 수정 완료");
        console.log(res.data.data);

        dispatch(
          setAccountBooks({
            account: res.data.data.account,
            tradeHistoryList: res.data.data.tradeHistoryList,
            categoryList: res.data.data.categoryList,
          }))
        console.log({ category });

        setCategory(res.data.data.tradeHistoryList)
      })
      .catch((err) => {

        //출금에서만 가능한 기능입니다

        alert("가계부 작성이 실패했습니다.");
        console.log(err);
      })

  }

  return (
    <>
      {tradeHistoryDict &&
        Object.keys(tradeHistoryDict).map((key, index) =>
          tradeHistoryDict[key].map((tradeHistory, index) => (
            // 수정작업
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
                      <select className={styles.remain} name="category" value={accountbook.tradeHistoryList[index] && accountbook.tradeHistoryList[index].category && accountbook.tradeHistoryList[index].category.id ? accountbook.tradeHistoryList[index].category.id : -1} onChange={(event) => {
                        console.log(accountbook.tradeHistoryList[index]);
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
