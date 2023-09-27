import * as React from 'react';

type LogoValue = "hana" | "kb" | "toss" | "shinhan" | "nh" | "kakao" | "woori" | "ibk"
|"sh"|"ct"|"daegu"|"busan"|"gwangju"|"jeju"|"jeonbook"|"kn"|"newtown"|"k"|"sc"|"postbank"|"finball"
;


const Logo = ({ value }) => {
  return (
    <div style={{ textAlign: "center", alignItems: "center", display: "flex", width: '275px', height: '10vh',marginLeft:"0px" }}>
      <img src={value.logo} alt="" style={{ width: '55px',height:'55px',marginLeft:"0px" }}/>
      <div style={{ width: '220px',position: 'absolute'}}>
        {value.name}
      </div>
    </div>
  );
}

export default Logo;
