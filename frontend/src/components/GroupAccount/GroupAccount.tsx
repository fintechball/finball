import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function GroupAccount() {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const selectAccount = (accountNo) => {
    navigate("/groupAccount/" + accountNo);
  };

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/api/group/account/list`, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {data?.groupAccountList ? (
        data.groupAccountList.map((item, index) => (
          <div key={index}>
            <div onClick={() => selectAccount(item.groupAccountNo)}>
              {item.name} {item.groupAccountNo} {item.balance}
            </div>
          </div>
        ))
      ) : (
        <p>연결된 계좌가 없습니다.</p>
      )}
    </div>
  );
}

export default GroupAccount;
