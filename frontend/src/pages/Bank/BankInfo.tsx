import * as React from 'react';
import { useState,useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Logo from "./Logo"
import  Button from "@mui/material/Button";
import styles from "./BankInfo.module.css"
import axios from 'axios';

export default function BankInfo() {
    interface INfo{
      name:string;
      img:string;
      code:number;
      connected:boolean;
    }
  const [state, setState] = useState<INfo[]>([]);
  const [cnt,setCnt]=useState(0)
  const [loading,setLoading]=useState(true)

  const  findBank = async() => {
    await axios({
      method: "get",
      url: `https://j9e106.p.ssafy.io/company/bank`,
      headers: {
        Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2OTUzMDU0NzksImlzcyI6ImZpbkJhbGwiLCJVU0VSX05BTUUiOiJ0ZXN0dGVzdDEifQ.p6EwTYL0O5O3BTK1rZmuJZrIh5ZsIdhv1y5P_9u30l0'
      },
    })
      .then((res) => {
        setState(res.data.data.companyDtoList)
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  }
  useEffect(()=>{
    findBank()
  },[])
  useEffect(()=>{

    if (state.length>0){
      setLoading(false)
      let count=0;
      for (let i=0;i<21;i++){
          if (state[Object.keys(state)[i]].connected){
              count+=1
          }
      }
      setCnt(count)
    }

  },[state])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

      setState((prevState) => {
        // 새로운 배열을 생성하고 이전 상태를 복사
        const updatedState = prevState.map((item) => {
          // 원하는 항목을 찾아서 업데이트
          if (item.name === event.target.name) {
            return { ...item, connected:true }; // img 프로퍼티를 업데이트
          }
          // 변경할 필요가 없는 항목은 그대로 반환
          return item;
        });
    
        return updatedState; // 업데이트된 배열을 반환하여 상태를 업데이트
      });
    };
    const handlereset = () => {
      findBank()
    };
  return (
    <>
    {loading ? "Lodaing...":
      <FormControl component="fieldset" variant="standard">
        <div className={styles.head}>
            <div style={{fontSize:'3vh',fontWeight:'bold'}}> 은행</div>
            <div style={{fontSize:'1vh',alignItems:'center'}} onClick={handlereset}>선택 해제</div>
            </div>
        <div style={{fontSize:'2vh',color:'grey',textAlign:'start'}}>한 곳에서 계좌 잔액을 확인하세요!</div>
      <FormGroup style={{height:"210vh"}}>
      {state.map((v,i) => (
         <div className={styles.labelbox} key={i}>
         <FormControlLabel
           control={
             <Switch checked={v.connected} onChange={handleChange} name={v.name} />
           }
           label={<Logo value={v}/>}
           labelPlacement="start"
           />
       </div>
    ))}

      </FormGroup>
      <Button variant="contained" color="success" style={{position:"sticky",bottom:"62px",right:"15px"}} >{cnt}개 은행 선택</Button>
    </FormControl>
  }
  </>
  );
}