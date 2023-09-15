import * as React from 'react';
import { useState,useEffect } from "react";
import finball from "../../assets/finball.png";
import Modal from 'react-modal';
import Checkbox from '@mui/material/Checkbox';

const CertificationNaver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = React.useState(true);
  function openModal() {
    setIsModalOpen(true);
  }
  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    location.reload();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div style={{width:'50vh',height:'100vh',border:'1px solid black'}}>
        <div style={{fontSize:'3vh',fontWeight:'bold',textAlign:'start',marginTop:'20vh',marginLeft:'5vh'}}>안전한 계좌 연결을 위해</div>
        <div style={{fontSize:'3vh',fontWeight:'bold',textAlign:'start',marginLeft:'5vh'}}>인증밥벙을 골라주새요</div>
        <div style={{marginTop:'4vh'}}>
        <button 
        style={{width:'40vh',height:'10vh',borderRadius:'3vh',marginBottom:'2vh',backgroundColor:'#3C78FF',color:'white',fontSize:'3.5vh',fontWeight:'bold'}}
        onClick={openModal}
        >토스 인증서</button>
        </div>
        <div>
        <button style={{width:'40vh',height:'10vh',borderRadius:'3vh',backgroundColor:'#1FDD00',color:'white',fontSize:'3.5vh',fontWeight:'bold'}}>네이버 인증서</button>
        </div>
        <div style={{fontSize:'1vh',color:'grey',marginTop:'3vh',textDecoration:'underline'}}>다른 인증서 사용하기</div>
        <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Custom Modal" // 모달의 레이블 설정
            style={{
              content: {
                width: '80%', // 모달의 너비
                height: '20%', // 모달의 높이
                zIndex:30,
                borderRadius:'3vh',
                backgroundColor:'#4C4499',
                color:'white',
                position:'fixed',
                left:'5%',
                top:'75%'
              },
            }}
        >
        <div>
          네이버 인증을 위해
        </div>
        <div>
          동의가 필요해요
        </div>
        <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      sx={{borderRadius:'30vh',}}
    /><div>
    [필수]개인정보 제3자 제공 동의(네이버)
    </div>
        <button onClick={closeModal} style={{width:'20%',color:'white',aspectRatio:5,fontSize:'2vh',position:'absolute',left:'40%',backgroundColor:'#7165E3'}}>Close</button>
      </Modal>
    </div>
  );
}

export default CertificationNaver;
