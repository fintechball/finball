import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferValue() {
  const location = useLocation();
  const accountObject = location.state;
  const token = useSelector((state) => state.token);
  const [value, setValue] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(accountObject);
  }, [accountObject]);

  return (
    <>
      <div>금액 설정하는 페이지 ㅎㅅㅎ</div>
      <div>내 {accountObject.currentAccount.name}에서</div>
      <div>잔액 {accountObject.currentAccount.balance}원</div>

      <div>{accountObject.currentAccount.name}으로</div>
      <div>
        {accountObject.currentAccount.company.cpName}
        {accountObject.currentAccount.accountNo}
      </div>
      <input onChange={(event) => setValue(event.target.value)}></input>
    </>
  );
}

export default TransferValue;
