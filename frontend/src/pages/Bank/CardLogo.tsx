import * as React from 'react';

const Logo: React.FC = ({ value }) => {
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
    <div>
      <img src={value.logo} alt="..." style={{ width: '40px',height:'40px', marginRight:'20px'}}/>

    </div>
  );
}

export default Logo;
