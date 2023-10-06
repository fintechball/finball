

function Logo({ value }) {

  return (
    <div>
      <img src={value.card.image} alt="" style={{ width: '75px',height:'55px'}}/>
      {/* <div style={{ width: '200px',position: 'absolute',left:"80px",display:"flex",flexDirection:"column"}}>
        <div style={{textAlign:'start'}}>
        {value.card.name}
        </div>
        <div style={{textAlign:'start',fontSize:"2px",marginLeft:"2px",opacity:"0.5"}}>
        {value.companyName}
        {value.cardNumber}

        </div>
      </div> */}
    </div>
  );
}

export default Logo;
