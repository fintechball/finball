import * as React from 'react';
import styles from "./Agreement.module.css"


const Agreement = () => {
 

  return (
    <div>
        <div className={styles.head}>
          <div>
        상세정보 전송요구 및
          </div>
            <div>
        개인신용정보 수집·이용 
            </div>
        </div>
        <div className={styles.text}>
        핀볼은 「신용정보의 이용 및 보호에 관한 법률」, 「개인정보보호법법」 등 관련 법령에 따라 개인신용정보를 처리합니다.
        </div>
        <div className={styles.head}>
        거부할 권리와 불이익
        </div>
        <div className={styles.text}>
        개인신용정보 수집·이용에 동의하지 않을 수 있어요. 하지만 필수항목 수집·이용에 동의하지 않으면 본인신용정보 통합조회, 데이터분석 서비스를 이용할 수 없고 , 선택항목 수집·이용에 동의하지 않으면 선택항목에 대한 본인신용정보 통합조회, 데이터분석 서비스를 이용할 수 없어요.
        </div>
        <button className={styles.btn}>확인</button>
    </div>
  );
}

export default Agreement;
