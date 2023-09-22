import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function TransferAccount() {
  const token = useSelector((state) => state.token);
  //   const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_HTTP_URL}/user/account`, {
        headers: {
          // Authorization: token.accessToken,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <>
      <div>계좌 이체 어디로 보낼까용??</div>
    </>
  );
}

export default TransferAccount;
