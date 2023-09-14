import * as React from 'react';
import { useState,useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Logo from "./Logo"
import  Button from "@mui/material/Button";
import styles from "./Accounts.module.css"

export default function Accounts() {
    interface StateType {
        hana: boolean;
        kb: boolean;
        toss: boolean;
        shinhan: boolean;
        nh: boolean;
        kakao: boolean;
        woori: boolean;
        ibk: boolean;
      }
  const [state, setState] = useState<StateType>({
    hana: false,
    kb: false,
    toss: false,
    shinhan: false,
    nh: false,
    kakao: false,
    woori: false,
    ibk: false,
  });
  const [cnt,setCnt]=useState(0)
  useEffect(()=>{
    let count=0;
    for (let i=0;i<8;i++){
        if (state[Object.keys(state)[i]]){
            count+=1
        }
    }
    setCnt(count)
  },[state])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const handlereset = () => {
    setState({
        hana: false,
        kb: false,
        toss: false,
        shinhan: false,
        nh: false,
        kakao: false,
        woori: false,
        ibk: false,
    });
  };

  return (
      <FormControl component="fieldset" variant="standard">
        <div className={styles.head}>
            <div style={{fontSize:'3vh',fontWeight:'bold'}}>카드</div>
            <div style={{fontSize:'1vh',alignItems:'center'}} onClick={handlereset}>선택 해제</div>
            </div>
        <div style={{fontSize:'2vh',color:'grey',textAlign:'start'}}>신용·체크카드의 사용 내역을 한 눈에 확인하세요!</div>
      <FormGroup>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.hana} onChange={handleChange} name="hana" />
          }
          label={<Logo value="hana"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.kb} onChange={handleChange} name="kb" />
          }
          label={<Logo value="kb"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.toss} onChange={handleChange} name="toss" />
          }
          label={<Logo value="toss"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.shinhan} onChange={handleChange} name="shinhan" />
          }
          label={<Logo value="shinhan"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.nh} onChange={handleChange} name="nh" />
          }
          label={<Logo value="nh"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.kakao} onChange={handleChange} name="kakao" />
          }
          label={<Logo value="kakao"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.woori} onChange={handleChange} name="woori" />
          }
          label={<Logo value="woori"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.ibk} onChange={handleChange} name="ibk" />
          }
          label={<Logo value="ibk"/>}
          labelPlacement="start"
        />
        </div>

      </FormGroup>
      <Button variant="contained" color="success" >{cnt}개 은행 선택</Button>
    </FormControl>
  );
}