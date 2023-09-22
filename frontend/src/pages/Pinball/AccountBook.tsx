import { useState,useEffect } from "react";
import Pinball from "../Pinball/Pinball"
import { CircularProgressbar,buildStyles,CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { OutlinedInput } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import safe from '../../assets/safe.png'
import cash from '../../assets/cash.png'
import styles from './AccountBook.module.css';
// import styles from './Home.module.css';
function AccountBook() {
    const [percentage, setPercentage] = useState(30);
    const [balance, setBalance] = useState(33333333)
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
    const dummy=([
        {name:"kim",pay:100000,time:"12:12",date:"9-15"},
        {name:"seo",pay:43000,time:"15:12",date:"9-15"},
        {name:"jeong",pay:100,time:"17:12",date:"9-15"},
        {name:"ha",pay:14200,time:"21:12",date:"9-14"},
    ])
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
                <div style={{ position: "relative", width: "360px", height: "70vh" }}>
                    <div id="home-canvas" style={{ position: "absolute", top: 0, left: 25, width: "310px", height: "65%" }}>
                        <div style={{fontSize:'4vh',fontWeight:'bold'}}>우리 계좌</div>
                        <Pinball />
                        <TextField
                            placeholder="잔액"
                            type="number"
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                         display: "none",
                                                       },
                               "& input[type=number]": {
                                                         MozAppearance: "textfield",
                                                       },
                                backgroundColor: "#F4F4F4",
                                width:'30%',
                                height:'10%',
                                marginBottom:'3%',
                                marginRight:'5%',
                                padding:0,
                               }}
                        />

                            <button style={{width:'20%', height: '10%',color:'white',aspectRatio:5,fontSize:'2vh',backgroundColor:'#7165E3'}}>송금</button>
                        <img src={safe} style={{width:'15%',height:'15%',position:'absolute',left:'80%',top:'25%'}} />
                    </div>
                    </div>
            )}
                
            {selectedbtn["btn2"] && (
            <div>
                <div style={{fontSize:'1vh',fontWeight:"lighter",textAlign:'start'}}>핀볼 53291021163807</div>
                <div style={{fontSize:'4vh',fontWeight:'bold',textAlign:'start'}}>{balance}원</div>
                <button style={{ width: '30%', color: 'white', aspectRatio: 5, fontSize: '2vh', backgroundColor: '#4C4499', marginRight: '5%' }}>채우기</button>
                <button style={{ width: '30%', color: 'white', aspectRatio: 5, fontSize: '2vh', backgroundColor: '#7165E3' }}>보내기</button>
                <div style={{ position: "relative",width:'360px',height:'70vh' }}>
                <div style={{fontSize:'2vh',fontWeight:'bold',textAlign:'start',marginLeft:'10px'}}>전체</div>
                {dummy.reduce((acc: React.ReactNode[], item, i) => {
                    // 첫 번째 아이템이거나 이전 아이템과 날짜가 다를 경우 새로운 구역 생성
                    if (i === 0 || item.date !== dummy[i - 1].date) {
                    acc.push(
                        <div key={`date-${item.date}`} style={{ fontWeight: 'bold',fontSize:'1%',textAlign:'start',marginLeft:'10px' }}>
                        {item.date}
                        </div>
                    );
                    }
                    
                    // 현재 아이템 출력
                    acc.push(
                    <div key={`item-${i}`} style={{ display: 'flex', width: '340px', alignContent: 'center', justifyContent: 'center', marginLeft: '10px',marginBottom:'3px' ,justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex',alignItems: 'center'}}>
                        <img src={cash} style={{ width: "7vh",height:'7vh',marginRight:'10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '2vh', fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ fontSize: '0.5vh', opacity: 0.7 }}>{item.time}</div>
                        </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ textAlign: 'end',fontSize:'2vh',color:'#7165E3' }}>{item.pay}원</div>
                        <div style={{fontSize:'2vh'}}>{balance - item.pay}원</div>
                        </div>
                    </div>
                    );
                    
                    return acc;
                }, [])}
                <div id="home-canvas" style={{ position: "absolute", top: 0, left: 30,width: "310px", height: "65%"  , zIndex: -1, opacity: 0.1 }}>
                    <Pinball />
                </div>
                </div>
            </div>
            )}

            {selectedbtn["btn3"] && (
                <div style={{ position: "relative", width: "360px", height: "70vh" }}>
                {/* Canvas */}
                <div id="home-canvas" style={{ position: "absolute", top: 0, left: 30, width: "310px", height: "65%"  }}>
                <div style={{fontSize:'4vh',fontWeight:'bold'}}>가계부</div>
                <Pinball />
                </div>
    
                {/* Circular Progress Bars */}
                <div style={{ position: "absolute", top: "50px",left:"215px" , width: "22vh", height: "100%", display: "flex" }}>
                <div style={{ width: "6vh", height: "6vh",marginRight:"5px" }}>
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: "red",
                    })}
                    />
                    <div>식비</div>
                </div>
                
                <div style={{  width: "6vh", height: "6vh",marginRight:"5px" }}>
                    <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: "yellow",
                    })}
                    />
                    <div>게임</div>
                </div>
                
                <div style={{  width: "6vh", height: "6vh",marginRight:"5px" }}>
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
