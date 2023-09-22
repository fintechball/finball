import * as React from 'react';

const Logo: React.FC = ({ value }) => {

  return (
    <div style={{ textAlign: "center", alignItems: "center", display: "flex", width: '280px', height: '10vh' }}>
      <img src={value.cardImage} alt="" style={{ width: '55px',height:'55px',marginLeft:"0px" }}/>
      <div style={{ width: '200px',position: 'absolute',left:"60px"}}>
        {value.cardName}
      </div>
    </div>
  );
}

export default Logo;
