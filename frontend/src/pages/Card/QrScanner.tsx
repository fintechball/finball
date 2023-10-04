import styles from "./QrScanner.module.css";
import { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

const QrScanner = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const finBallAccount = useSelector((state) => state.finBallAccount);

  const onScan = (data) => {
    if (data) {
      // console.log(data);
      var jsonObject = JSON.parse(data);
      doTransfer(jsonObject);
    }
  };

  const doTransfer = (opposite) => {
    axios
      .post(
        `${BASE_HTTP_URL}/api/user/transfer`,
        {
          minusBank: {
            accountNo: finBallAccount.account.no,
            companyId: finBallAccount.company.code,
            userName: auth.name,
            balance: null, //  finball 계좌는 서버에서 balance 넣어줘야됨
          },
          plusBank: {
            accountNo: opposite.accountNo,
            companyId: opposite.company.code,
            userName: opposite.name,
            balance: null, //  finball 계좌는 서버에서 balance 넣어줘야됨
          },
          value: opposite.value,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then(() => {
        navigate("/cardView");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleError = (err) => console.log(err);

  return (
    <div className={styles.scanner}>
      <QrReader
        constraints={{ facingMode: "user" }}
        onError={handleError}
        onScan={onScan}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default QrScanner;
