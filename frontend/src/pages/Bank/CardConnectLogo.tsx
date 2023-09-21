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
    2:"KB카드",
    4:"삼성카드",
    8:"롯데카드",
    17:"우리카드",
    3:"신한카드",
    7:"현대카드",
    15:"BC카드",
    12:"NH카드",
    16:"하나카드"
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center", display: "flex", width: '40vh', height: '10vh' }}>
      <img src={value.cardImage} alt="" style={{ width: '7vh',height:'7vh' }}/>
      <div style={{ width: '30vh',position: 'absolute'}}>
        {value.cardName}
      </div>
    </div>
  );
}

export default Logo;
