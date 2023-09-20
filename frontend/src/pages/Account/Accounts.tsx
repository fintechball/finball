import * as React from 'react';
import { useState,useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Logo from "./Logo"
import  Button from "@mui/material/Button";
import styles from "./Accounts.module.css"
import { Height } from '@mui/icons-material';

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
        sh: boolean;
        ct: boolean;
        daegu: boolean;
        busan: boolean;
        gwangju: boolean;
        jeju: boolean;
        jeonbook: boolean;
        kn: boolean;
        newtown: boolean;
        k: boolean;
        sc: boolean;
        postbank: boolean;
      }
  // const [state, setState] = useState([
  //   {name:'kb',value:false},
  //   {name:'toss',value:false},
  //   {name:'shinhan',value:false},
  //   {name:'nh',value:false},
  //   {name:'kakao',value:false},
  //   {name:'woori',value:false},
  //   {name:'ibk',value:false},
  //   {name:'sh',value:false},
  //   {name:'ct',value:false},
  //   {name:'daegu',value:false},
  //   {name:'busan',value:false},
  //   {name:'gwangju',value:false},
  //   {name:'jeju',value:false},
  //   {name:'jeonbook',value:false},
  //   {name:'kn',value:false},
  //   {name:'newtown',value:false},
  //   {name:'k',value:false},
  //   {name:'sc',value:false},
  //   {name:'postbank',value:false},
  // ]);
  const [state, setState] = useState<StateType>({
    hana: false,
    kb: false,
    toss: false,
    shinhan: false,
    nh: false,
    kakao: false,
    woori: false,
    ibk: false,
    sh: false,
    ct: false,
    daegu: false,
    busan: false,
    gwangju: false,
    jeju: false,
    jeonbook: false,
    kn: false,
    newtown: false,
    k: false,
    sc: false,
    postbank: false,
  });
  const [cnt,setCnt]=useState(0)
  useEffect(()=>{
    let count=0;
    for (let i=0;i<20;i++){
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
      sh: false,
      ct: false,
      daegu: false,
      busan: false,
      gwangju: false,
      jeju: false,
      jeonbook: false,
      kn: false,
      newtown: false,
      k: false,
      sc: false,
      postbank: false,
    });
  };

  return (
      <FormControl component="fieldset" variant="standard">
        <div className={styles.head}>
            <div style={{fontSize:'3vh',fontWeight:'bold'}}>카드</div>
            <div style={{fontSize:'1vh',alignItems:'center'}} onClick={handlereset}>선택 해제</div>
            </div>
        <div style={{fontSize:'2vh',color:'grey',textAlign:'start'}}>신용·체크카드의 사용 내역을 한 눈에 확인하세요!</div>
      <FormGroup style={{height:"215vh"}}>
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
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.sh} onChange={handleChange} name="sh" />
          }
          label={<Logo value="sh"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.ct} onChange={handleChange} name="ct" />
          }
          label={<Logo value="ct"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.daegu} onChange={handleChange} name="daegu" />
          }
          label={<Logo value="daegu"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.busan} onChange={handleChange} name="busan" />
          }
          label={<Logo value="busan"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.gwangju} onChange={handleChange} name="gwangju" />
          }
          label={<Logo value="gwangju"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.jeju} onChange={handleChange} name="jeju" />
          }
          label={<Logo value="jeju"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.jeonbook} onChange={handleChange} name="jeonbook" />
          }
          label={<Logo value="jeonbook"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.kn} onChange={handleChange} name="kn" />
          }
          label={<Logo value="kn"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.newtown} onChange={handleChange} name="newtown" />
          }
          label={<Logo value="newtown"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.k} onChange={handleChange} name="k" />
          }
          label={<Logo value="k"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.sc} onChange={handleChange} name="sc" />
          }
          label={<Logo value="sc"/>}
          labelPlacement="start"
        />
        </div>
        <div className={styles.labelbox}>
        <FormControlLabel
          control={
            <Switch checked={state.postbank} onChange={handleChange} name="postbank" />
          }
          label={<Logo value="postbank"/>}
          labelPlacement="start"
        />
        </div>

      </FormGroup>
      <Button variant="contained" color="success" style={{position:"sticky",bottom:"62px",right:"15px"}} >{cnt}개 은행 선택</Button>
    </FormControl>
  );
}