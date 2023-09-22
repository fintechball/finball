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
import { useLocation } from 'react-router-dom';
export default function BankConnect() {
    interface INfo{
      name:string;
      img:string;
      code:string;
      connected:boolean;
    }
  const location = useLocation();
  const List = location.state?.bankCodeList;
  const [state, setState] = useState<INfo[]>([]);
  const [cnt,setCnt]=useState(0)
  const [loading,setLoading]=useState(true)

  const  findAccount = async() => {
    await axios({
      method: "post",
      url: `https://j9e106.p.ssafy.io/bank/account`,
      headers: {
       Authorization: localStorage.getItem("accessToken"),
              },
      data:
        {
            "bankCodeList" : List
        }
    })
      .then((res) => {
        setState(res.data.data.bankAccountDtoList)
        setLoading(false)
        console.log(res.data.data.bankAccountDtoList);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  }
  useEffect(()=>{
    findAccount()
  },[])
  useEffect(()=>{

    if (state.length>0){
      setLoading(false)
      let count=0;
      for (let i=0;i<state.length;i++){
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
        findAccount()
    };
  return (
    <>
    {loading ? "Lodaing...":state.length == 0 ?<div>계좌가 없어요</div>
    :
      <FormControl component="fieldset" variant="standard" style={{width:"100%"}}>
        <div className={styles.head}>
            <div style={{fontSize:'3vh',fontWeight:'bold'}}> 은행</div>
            <div style={{fontSize:'1vh',alignItems:'center'}} onClick={handlereset}>선택 해제</div>
            </div>
        <div style={{fontSize:'2vh',color:'grey',textAlign:'start'}}>연결할 계좌를 선택해주세요</div>
      <FormGroup style={{height:"210vh"}}>
      {state.map((v,i) => (
         <div className={styles.labelbox} key={i}>
         <FormControlLabel
           control={
             <Switch checked={v.connected} onChange={handleChange} name={v.name} />
           }
        //    label={<Logo value={v}/>}
           labelPlacement="start"
           />
       </div>
    ))}

      </FormGroup>
      <Button variant="contained" color="success" style={{position:"sticky",bottom:"62px",right:"15px"}} >{cnt}개 연결하기</Button>
    </FormControl>
  }
  </>
  );
}