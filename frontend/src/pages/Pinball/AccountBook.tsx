import { useState,useEffect } from "react";
import Pinball from "../Pinball/Pinball"
import { CircularProgressbar,buildStyles,CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { OutlinedInput } from "@material-ui/core";
import safe from '../../assets/safe.png'
// import styles from './Home.module.css';
function AccountBook() {
    const [percentage, setPercentage] = useState(30);
    const [selectedbtn,setSelectedbtn] = useState({
        btn1:true,
        btn2:false,
        btn3:false,
    })
    const defaultSelected={
        btn1:false,
        btn2:false,
        btn3:false,
    }
      const handleClick = (e) => {
        const S = e.target.id;
        if (selectedbtn[S] !== true) {
            setSelectedbtn(() => {
                const updatedSelectedbtn = {
                    ...defaultSelected,
                    [S]: true
                };
                return updatedSelectedbtn;
            });
        }
    };
      const Plus = () => {
        setPercentage((prevPercentage) => prevPercentage + 5); 
    };
      const Minus = () => {
        setPercentage((prevPercentage) => prevPercentage - 5); 
    };
    
  return (
    <div>
      <div>
        <button id ="btn1" style={{borderRadius:'100%',width:"5%",height:"5%",backgroundColor:selectedbtn['btn1']?'#7165E3':'#E3E3E3'}} onClick={handleClick}></button>
        <button id ="btn2" style={{borderRadius:'100%',backgroundColor:selectedbtn['btn2']?'#7165E3':'#E3E3E3'}} onClick={handleClick}></button>
        <button id ="btn3" style={{borderRadius:'100%',backgroundColor:selectedbtn['btn3']?'#7165E3':'#E3E3E3'}} onClick={handleClick}></button>
      </div>
        <button onClick={Plus}>+</button>
        <button onClick={Minus}>-</button>
        {selectedbtn["btn1"] && (
                <div id="home-canvas" style={{ width: "70vh", height: "70vh", position: "relative" }}>
                    <div style={{fontSize:'4vh',fontWeight:'bold'}}>우리 계좌</div>
                    <Pinball />
                    <OutlinedInput
                        placeholder="ID"
                        type="text"
                        style={{ backgroundColor: '#F4F4F4' }}
                        />
                        <button style={{width:'20%',color:'white',aspectRatio:5,fontSize:'2vh',backgroundColor:'#7165E3'}}>송금</button>
                    <img src={safe} style={{width:'15%',height:'15%',position:'absolute',left:'80%',top:'20%'}} />
                </div>
            )}


            {selectedbtn["btn2"] && (
                <div id="home-canvas" style={{ width: "70vh", height: "70vh" }}>
                    <Pinball />
                </div>
            )}

            {selectedbtn["btn3"] && (
                <div style={{ position: "relative", width: "70vh", height: "70vh" }}>
                {/* Canvas */}
                <div id="home-canvas" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                <div style={{fontSize:'4vh',fontWeight:'bold'}}>가계부</div>
                <Pinball />
                </div>
    
                {/* Circular Progress Bars */}
                <div style={{ position: "absolute", top: '10%', left: "55%", width: "100%", height: "100%", display: "flex" }}>
                <div style={{ width: "10vh", height: "10vh" }}>
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: "red",
                    })}
                    />
                    <div>식비</div>
                </div>
                
                <div style={{ width: "10vh", height: "10vh" }}>
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: "yellow",
                    })}
                    />
                    <div>게임</div>
                </div>
                
                <div style={{ width: "10vh", height: "10vh" }}>
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: "blue",
                    })}
                    />
                    <div>쇼핑</div>
                </div>
            </div>
         </div>
  
            )}
    </div>
  );
}

export default AccountBook;
