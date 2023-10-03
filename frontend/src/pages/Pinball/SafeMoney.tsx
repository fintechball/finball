import { useState, useEffect } from "react";
import Modal from "react-modal";
import safe from "../../assets/safe.png";
import styles from "./SafeMoney.module.css";

function SafeMoney(props: any) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(props.balance/50000);

    useEffect(() => {
        console.log(props.balance);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const getMoney = () => {
        let elements = [];
        let moneyRow = [];
    
        for (let index = 0; index < count; index++) {
            moneyRow.push(
                <div className={styles.Money} key={index}>
                    {/* Money 컴포넌트 내용 */}
                </div>
            );
    
            // 한 줄에 5개의 Money 컴포넌트를 표시하면 moneyRow를 elements에 추가하고 초기화합니다.
            if ((index + 1) % 5 === 0) {
                elements.push(
                    <div className={styles.MoneyRow} key={`row-${index / 5}`}>
                        {moneyRow}
                    </div>
                );
                moneyRow = [];
            }
        }
    
        // 마지막으로 남은 Money 컴포넌트들을 추가합니다.
        if (moneyRow.length > 0) {
            elements.push(
                <div className={styles.MoneyRow} key={`row-${count / 5}`}>
                    {moneyRow}
                </div>
            );
        }
    
        return elements;
    };

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Custom Modal" // 모달의 레이블 설정
                style={{
                    content: {
                      width: "300px", // 모달의 너비
                      height: "400px", // 모달의 높이
                      zIndex: 30,
                      position: "fixed",
                      top: "50%", // 화면 상단에서 50% 위치로 이동
                      left: "50%", // 화면 왼쪽에서 50% 위치로 이동
                      transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
                    },
                  }}
            >
                <div>
                    <h2>금고</h2>
                    <div className={styles.MoneyContainer}>
                        {getMoney()}
                    </div>
                </div>
            </Modal>
            <button onClick={openModal} >
                <img src={safe} style={{ width: "50px", height: "50px" }} />
            </button>
        </>
    )
}

export default SafeMoney;