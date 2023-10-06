import * as React from 'react';

const Logo: React.FC = ({ value }) => {

  return (
    <div>
      <img src={value.company.logo} alt="" style={{ width: '60px',height:'60px',marginRight:"5px" }}/>
      
    </div>
  );
}

export default Logo;
