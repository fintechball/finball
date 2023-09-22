import React, { useState, useEffect, useRef } from 'react';
// import { StyledPassword } from './password'
import styles from './Certification.module.css'
import PasswordPresentor from './password-presentor';
import { Style } from '@mui/icons-material';

export default function Password({value}) {
  // 함수들은 Class 를 외부에서 생성하여 import를 하여 사용하였다.
  const passwordPresentor = new PasswordPresentor(); // 인스턴스 생성
  
  const inputRef = useRef([]); // value들을 담을 ref 배열
  
  // input value 
  const [state, setState] = useState({
    value1: value[0]? value[0]:'',
    value2: value[1]? value[1]:'',
    value3: value[2]? value[2]:'',
    value4: value[3]? value[3]:'',
    value5: value[4]? value[4]:'',
    value6: value[5]? value[5]:'',
  });
  useEffect(() => {
    // value prop이 변경될 때마다 컴포넌트 내부 상태를 업데이트합니다.
    setState({
      value1: value.charAt(0) || '',
      value2: value.charAt(1) || '',
      value3: value.charAt(2) || '',
      value4: value.charAt(3) || '',
      value5: value.charAt(4) || '',
      value6: value.charAt(5) || '',
    });
  }, [value]);
  // input onChange
  const handleInputChange = (e) => {
    if (e.type === 'click') {
      // 클릭 이벤트에서는 값을 변경하지 않도록 무시
      return;
    }
    passwordPresentor.handleInputChange(e, state, setState);
  };
  // value 입력 시, 다음 Index로 focus 이동
  const handleNextFocus = () => {
    passwordPresentor.handleNextFocus(inputRef);
  };
	
  // value 삭제
  const handleDeleteEvent = (e) => {
    passwordPresentor.handleDeleteEvent(e, inputRef, state, setState);
  };
  
  // 랜덤한 value 클릭 시, 비어있는 index에 focus 지정
  const emptyIndexFocus = () => {
    passwordPresentor.emptyIndexFocus(inputRef);
  };

  // value 값 존재 시에, 색상 변경
  const valueColorActive = (checkState) => {
    return checkState ? 'active' : '';
  };

  useEffect(() => {
    inputRef.current[0].focus(); // 마운트 > 첫 번째 value에 focus
    handleNextFocus(); // 각각의 value에 값을 입력 시, 다음 value 로 focus 이동
  }, [state]); // dependency 에 state 를 넣음으로써, state의 값이 변경될 때마다 리렌더링

  return (
    <div style={{width:"360px",marginBottom:"90px"}}>
      <div className={styles.certi}>
        <label className={styles.ball} style={{background:valueColorActive(state.value1) ? '#7165E3':'grey'}}>
          <input
            type="number"
            value={state.value1}
            className={styles.invisible}
            name="value1"
            pattern="\d*"
            inputMode="numeric"
            ref={(el) => (inputRef.current[0] = el)}
            onClick={emptyIndexFocus}
            onChange={handleInputChange}
            onKeyDown={handleDeleteEvent}
          />
        </label>
        <label className={styles.ball} style={{background:valueColorActive(state.value2) ? '#7165E3':'grey'}}>
          <input
            type="number"
            value={state.value2}
            className={styles.invisible}
            name="value2"
            pattern="\d*"
            inputMode="numeric"
            ref={(el) => (inputRef.current[1] = el)}
            onClick={emptyIndexFocus}
            onChange={handleInputChange}
            onKeyDown={handleDeleteEvent}
          />
        </label>
        <label className={styles.ball} style={{background:valueColorActive(state.value3) ? '#7165E3':'grey'}}>
          <input
            type="number"
            value={state.value3}
            className={styles.invisible}
            name="value3"
            pattern="\d*"
            inputMode="numeric"
            ref={(el) => (inputRef.current[2] = el)}
            onClick={emptyIndexFocus}
            onChange={handleInputChange}
            onKeyDown={handleDeleteEvent}
          />
        </label>
        <label className={styles.ball} style={{background:valueColorActive(state.value4) ? '#7165E3':'grey'}}>
          <input
            type="number"
            value={state.value4}
            className={styles.invisible}
            name="value4"
            pattern="\d*"
            inputMode="numeric"
            ref={(el) => (inputRef.current[3] = el)}
            onClick={emptyIndexFocus}
            onChange={handleInputChange}
            onKeyDown={handleDeleteEvent}
          />
        </label>
        <label className={styles.ball} style={{background:valueColorActive(state.value5) ? '#7165E3':'grey'}}>
          <input
            type="number"
            value={state.value5}
            className={styles.invisible}
            name="value5"
            pattern="\d*"
            inputMode="numeric"
            ref={(el) => (inputRef.current[4] = el)}
            onClick={emptyIndexFocus}
            onChange={handleInputChange}
            onKeyDown={handleDeleteEvent}
          />
        </label>
        <label className={styles.ball} style={{background:valueColorActive(state.value6) ? '#7165E3':'grey'}}>
          <input
            type="number"
            value={state.value6}
            className={styles.invisible}
            name="value6"
            pattern="\d*"
            inputMode="numeric"
            ref={(el) => (inputRef.current[5] = el)}
            onClick={emptyIndexFocus}
            onChange={handleInputChange}
            onKeyDown={handleDeleteEvent}
          />
        </label>
      </div>
    </div>
  )
}