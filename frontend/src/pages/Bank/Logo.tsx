import * as React from 'react';

type LogoValue = "hana" | "kb" | "toss" | "shinhan" | "nh" | "kakao" | "woori" | "ibk"
|"sh"|"ct"|"daegu"|"busan"|"gwangju"|"jeju"|"jeonbook"|"kn"|"newtown"|"k"|"sc"|"postbank"|"finball"
;

interface LogoProps {
  value: LogoValue;
  image:string;
}

const Logo: React.FC<LogoProps> = ({ value }) => {
  // console.log({value},image)
  const logo = {
    81: "하나은행",
    4: "국민은행",
    92: "토스",
    88: "신한은행",
    11: "농협",
    90: "카카오뱅크",
    20: "우리은행",
    3: "IBK",
    7: "수협",
    27: "한국씨티은행",
    31: "대구은행",
    32: "부산은행",
    34: "광주은행",
    35: "제주은행",
    37: "전북은행",
    39 : "경남은행",
    45: "새마을금고",
    89: "케이뱅크",
    23: "sc제일은행",
    71: "우체국은행",
    106 : "핀볼"
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center", display: "flex", width: '275px', height: '10vh',marginLeft:"0px" }}>
      <img src={value.img} alt="" style={{ width: '55px',height:'55px',marginLeft:"0px" }}/>
      <div style={{ width: '220px',position: 'absolute'}}>
        {logo[value.code]}
      </div>
    </div>
  );
}

export default Logo;
