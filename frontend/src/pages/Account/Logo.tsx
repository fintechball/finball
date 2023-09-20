import * as React from 'react';
import finball from "../../assets/finball.png";

type LogoValue = "hana" | "kb" | "toss" | "shinhan" | "nh" | "kakao" | "woori" | "ibk"
|"sh"|"ct"|"daegu"|"busan"|"gwangju"|"jeju"|"jeonbook"|"kn"|"newtown"|"k"|"sc"|"postbank"
;

interface LogoProps {
  value: LogoValue;
}

const Logo: React.FC<LogoProps> = ({ value }) => {
  const logo = {
    hana: "하나은행",
    kb: "국민은행",
    toss: "토스",
    shinhan: "신한은행",
    nh: "농협",
    kakao: "카카오뱅크",
    woori: "우리은행",
    ibk: "IBK",
    sh: "수협",
    ct: "씨티은행",
    daegu: "대구은행",
    busan: "부산은행",
    gwangju: "광주은행",
    jeju: "제주은행",
    jeonbook: "전북은행",
    kn: "경남은행",
    newtown: "새마을금고",
    k: "케이뱅크",
    sc: "sc제일은행",
    postbank: "우체국은행",
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center", display: "flex", width: '40vh', height: '10vh' }}>
      <img src={finball} alt="" style={{ width: '7vh',height:'7vh' }}/>
      <div style={{ width: '30vh',position: 'absolute'}}>
        {logo[value]}
      </div>
    </div>
  );
}

export default Logo;
