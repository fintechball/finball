import * as React from 'react';

type LogoValue = "hana" | "kb" | "toss" | "shinhan" | "nh" | "kakao" | "woori" | "ibk"
|"sh"|"ct"|"daegu"|"busan"|"gwangju"|"jeju"|"jeonbook"|"kn"|"newtown"|"k"|"sc"|"postbank"|"finball"
;


const Logo = ({ value }) => {
  return (
    <div>
      <img src={value.logo} alt="" style={{ width: '55px',height:'55px', marginRight:'20px'}}/>
      
    </div>
  );
}

export default Logo;
