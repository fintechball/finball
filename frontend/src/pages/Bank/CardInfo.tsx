import * as React from 'react';
import { useState,useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CardLogo from "./CardLogo"
import  Button from "@mui/material/Button";
import styles from "./BankInfo.module.css"
import axios from 'axios';
import { Link } from "react-router-dom";

export default function CardInfo() {
    interface INfo{
      name:string;
      code:number;
      img:string;
      connected:boolean;
    }
  const [state, setState] = useState<INfo[]>([]);
  const [cnt,setCnt]=useState(0)
  const [loading,setLoading]=useState(true)
  const [choose,setChoose]=useState([])

  const  findCard = async() => {
    await axios({
      method: "get",
      url: `https://j9e106.p.ssafy.io/company/card`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),      },
    })
      .then((res) => {
        setState(res.data.data.companyDtoList)
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  }
  useEffect(()=>{
    findCard()
  },[])
  useEffect(()=>{

    if (state.length>0){
      setLoading(false)
      let count=0;
      let L=[];
      for (let i=0;i<state.length;i++){
          if (state[Object.keys(state)[i]].connected){
              count+=1
              L=[...L,String(state[Object.keys(state)[i]].code)]
          }
      }
      setCnt(count)
      setChoose(L)
    }

  },[state])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

      setState((prevState) => {
        // 새로운 배열을 생성하고 이전 상태를 복사
        const updatedState = prevState.map((item) => {
          // 원하는 항목을 찾아서 업데이트
          if (item.name === event.target.name) {
            return { ...item, connected:!item.connected  }; // img 프로퍼티를 업데이트
          }
          // 변경할 필요가 없는 항목은 그대로 반환
          return item;
        });
    
        return updatedState; // 업데이트된 배열을 반환하여 상태를 업데이트
      });
    };
    const handlereset = () => {
        findCard()
    };
  return (
    <>
    {loading ? "Lodaing...":
      <FormControl component="fieldset" variant="standard">
        <div className={styles.head}>
            <div style={{fontSize:'3vh',fontWeight:'bold'}}> 카드</div>
            <div style={{fontSize:'1vh',alignItems:'center'}} onClick={handlereset}>선택 해제</div>
            </div>
        <div style={{fontSize:'2vh',color:'grey',textAlign:'start'}}>신용·체크카드의 사용 내역을 한 눈에 확인하세요!</div>
      <FormGroup style={{height:"100vh"}}>
      {state.map((v,i) => (
         <div className={styles.labelbox} key={i}>
         <FormControlLabel
           control={
             <Switch checked={v.connected} onChange={handleChange} name={v.name} />
           }
           label={<CardLogo value={v}/>}
           labelPlacement="start"
           />
       </div>
    ))}

      </FormGroup>
      <Link to='/card'
        state= {{ cardCompanyCodeList: choose }}
      style={{ color: 'white', position: "sticky", bottom: "62px", backgroundColor: '#7165E3', height: "40px", borderRadius: "10px", display: "flex", alignItems: "center",justifyItems:"center" }}>
        <label style={{ backgroundColor: "#7165E3", margin: "0", paddingLeft: "130px", display: "inline-block"}}>
          {cnt}개 카드사 선택
        </label>
      </Link>
      {/* <Button variant="contained" color="success" style={{position:"sticky",bottom:"62px",right:"15px"}} >{cnt}개 카드사 선택</Button> */}
    </FormControl>
  }
  </>
  );
}