import React, { useState, MouseEvent, useEffect,useCallback } from "react"
import styles from "./SecurityKeypad.module.css"
import Password from "./Certification"

const PASSWORD_MAX_LENGTH = 6 // 비밀번호 입력길이 제한 설정

const shuffle = (nums: number[]) => {
  // 배열 섞는 함수
  let num_length = nums.length
  while (num_length) {
    let random_index = Math.floor(num_length-- * Math.random())
    let temp = nums[random_index]
    nums[random_index] = nums[num_length]
    nums[num_length] = temp
  }
  return nums
}

const SecurityKeypad = () => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k)
  const [nums, setNums] = useState([...nums_init,'',' '])
  const [password, setPassword] = useState("")
  const handlePasswordChange = useCallback(
    (num) => {
      if (password.length === PASSWORD_MAX_LENGTH) {
        return
      }
      setPassword(password + num.toString())
    },
    [password],
    )
    useEffect(()=>{
      let nums_random = Array.from({ length: 10 }, (v, k) => k) // 이 배열을 변경해 입력문자 변경 가능
      setNums(shuffle([...nums_random,"",""]))
    },[])

  const erasePasswordOne = useCallback(
    (e: MouseEvent) => {
      setPassword(password.slice(0, password.length === 0 ? 0 : password.length - 1))
    },
    [password],
  )

  const erasePasswordAll = useCallback((e: MouseEvent) => {
    setPassword("")
  }, [])

  const shuffleNums = useCallback(
    (num: number) => (e: MouseEvent) => {
      // 0 ~ 9 섞어주기
      // let nums_random = Array.from({ length: 10 }, (v, k) => k) // 이 배열을 변경해 입력문자 변경 가능
      // setNums(shuffle([...nums_random,"",""]))
      handlePasswordChange(num)
    },
    [handlePasswordChange],
  )

  const onClickSubmitButton = (e: MouseEvent) => {
    // 비밀번호 제출
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!")
    } else {
      alert(password + "을 입력하셨습니다.")
    }
  }
  return (
    <>
      <Password value={password} />
      <div className={styles.inputer}>
  {[
    ...nums.map((n,i) => (
      <button
        value={n}
        onClick={shuffleNums(n)}
        key={i}
        className={styles.btn}
      >
        {n}
      </button>
    )),
  ]}
</div>

      <div>
      <button
      className='num-button'
      onClick={erasePasswordAll}
      key="eraseAll"
    >
      X
    </button>
  <button
    className='num-button'
    onClick={erasePasswordOne}
    key="eraseOne"
  >
    ←
  </button>
        <button type='submit' className='submit-button' onClick={onClickSubmitButton}>
          제출
        </button>
      </div>
    </>
  )
}

export default SecurityKeypad