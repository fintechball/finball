import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import transfer from "../../assets/transfer.json"


function Transfering() {
    const receiverName="정영빈"
    const sendMoney=30000
    const [sended,setSended]=useState(false)
    function checkSended(){
        setSended(true)
    }
    useEffect(()=>{
        setTimeout(()=>{
            checkSended()
        },3000)
    })
    return (
        <>
        <Lottie animationData={transfer} loop={true} />
        <div>{receiverName}님께</div>
        {sended?
        <div>{sendMoney}원을 송금했어요</div>:
        <div>{sendMoney}원을 송금중이에요</div>
        
    }
        </>
    );
  }
  
  export default Transfering;