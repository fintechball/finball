import { useState,useEffect } from "react";
import Pinball from "../Pinball/Pinball"
import { CircularProgressbar,buildStyles,CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import safe from '../../assets/safe.png'
import cash from '../../assets/cash.png'
import styles from './AccountBook.module.css'
import axios from "axios";
import Modal from 'react-modal';

function AccountBook() {
    const [state, setState] = useState([]);
    const [name, setName] = useState(''); // 이름을 저장하는 state
    const [amount, setAmount] = useState(''); // 금액을 저장하는 state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccountBook, setisAccountBook] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [chooseCategoryid,setChooseCategoryid]=useState([]);
    const [loading,setLoading]=useState(false);
    const [ball,setBall]=useState(-1);
    const color=["red","green","yellow","blue"]
    const now=new Date();
    function openModal() {
        setIsModalOpen(true);
      }
      // 모달 닫기 함수
      const closeModal = () => {
        if (name =="" || amount ==""){

        }
        else{
          setIsModalOpen(false); // 모달 닫기
          createAccountBook()
          setName('')
          setAmount('')
          setisAccountBook(true)
        }
      };
      function openCategoryModal() {
        setIsCategoryModalOpen(true);
        }
      const closeCategoryModal = () => {
        if (name =="" || amount ==""){

        }
        else{
          setIsCategoryModalOpen(false); // 모달 닫기
          createCategory()
          setName('')
          setAmount('')
        }

      };
      function openUpdateModal(value) {
        setName(value.name)
        setAmount(value.value)
        setChooseCategoryid(value.id)
        setIsUpdateModalOpen(true);
        }
      const closeUpdateModal = () => {
        setIsUpdateModalOpen(false); // 모달 닫기
        updateCategory()
        setName('')
        setAmount('')
        setChooseCategoryid(-1);
      };
      const handleNameChange = (e) => {
        setName(e.target.value); // 이름 입력 값 업데이트
      };
    
      const handleAmountChange = (e) => {
        console.log(e.target.value)
        setAmount(Number(e.target.value)); // 금액 입력 값 업데이트
      };
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
    useEffect(()=>{
        findAccountBook()
    },[])
    useEffect(()=>{
        if (state.length > 0) {
          setLoading(true)
        }
        else{
          setLoading(false)
        }
    },[state])
    const createAccountBook = async () => {
        await axios({
          method: "post",
          url: `https://j9e106.p.ssafy.io/api/financial-book`,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          data:
          {	
            "category" : [
                {
                    "name" : name,
                    "value" : amount
                }
            ],
            "refreshDate" : Number(`${now.getDate()}`)
        }
        })
          .then((res) => {
            console.log(res)
            setState(res.data.data);
            window.location.reload()
          })
          .catch((err) => {
            console.log("삐빅", err);
          });
      };
    const findAccountBook = async () => {
        await axios({
          method: "get",
          url: `https://j9e106.p.ssafy.io/api/financial-book`,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
          .then((res) => {
            console.log(res.data.data)
            setState(res.data.data);
            setBall(Math.round(res.data.data.balance/1000))
          })
          .catch((err) => {
            console.log("삐빅", err);
          });
      };
      const createCategory = async () => {
        await axios({
          method: "post",
          url: `https://j9e106.p.ssafy.io/api/financial-book/category`,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          data:{
                "category" : [
                    {
                        "name" : name,
                        "value" : amount
                    },
                ]
          }
        })
          .then((res) => {
            setState(res.data.data);
          })
          .catch((err) => {
            console.log("삐빅", err);
          });
      };
      const deleteCategory = async () => {
        await axios({
          method: "delete",
          url: `https://j9e106.p.ssafy.io/api/financial-book/category`,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          data:{
                "categoryList" : [chooseCategoryid]
          }
        })
          .then((res) => {
            setState(res.data.data);
            setIsUpdateModalOpen(false);
            setName('')
            setAmount('')
            setChooseCategoryid(-1);
          })
          .catch((err) => {
            console.log("삐빅", err);
          });
      };
      const updateCategory = async () => {
        await axios({
          method: "put",
          url: `https://j9e106.p.ssafy.io/api/financial-book/category`,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          data:{
                "id" : chooseCategoryid,
                "name" : name,
                "value" : amount,
          }
        })
          .then((res) => {
            console.log(res.data.data)
            setState(res.data.data);
          })
          .catch((err) => {
            console.log("삐빅", err);
          });
      };
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
    const deleteAccountBook = async () => {
      await axios({
        method: "delete",
        url: `https://j9e106.p.ssafy.io/api/financial-book`,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        console.log(res)
        setisAccountBook(false)
        window.location.reload()
      })
      .catch((err) => {
        console.log("삐빅", err);
      });}
  return (
    <div>
        <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Custom Modal" // 모달의 레이블 설정
            style={{
            content: {
                width: '300px', // 모달의 너비
                height: '160px', // 모달의 높이
                zIndex:30,
                top:"300px",
                left:innerWidth/2-160
            },
            }}
        >
            <input type="text" placeholder="이름" value={name} onChange={handleNameChange}/>
            <input type="number" placeholder="금액" value={amount} onChange={handleAmountChange}/>
            <button onClick={closeModal}>저장</button>
        </Modal>
        <Modal
            ariaHideApp={false}
            isOpen={isCategoryModalOpen}
            onRequestClose={closeCategoryModal}
            contentLabel="Custom Modal" // 모달의 레이블 설정
            style={{
            content: {
                width: '300px', // 모달의 너비
                height: '160px', // 모달의 높이
                zIndex:30,
                top:"300px",
                left:innerWidth/2-160
            },
            }}
        >
            <input type="text" placeholder="이름" value={name} onChange={handleNameChange}/>
            <input type="number" placeholder="금액" value={amount} onChange={handleAmountChange}/>
            <button onClick={closeCategoryModal}>저장</button>
        </Modal>
        <Modal
            ariaHideApp={false}
            isOpen={isUpdateModalOpen}
            onRequestClose={closeUpdateModal}
            contentLabel="Custom Modal" // 모달의 레이블 설정
            style={{
            content: {
                width: '300px', // 모달의 너비
                height: '160px', // 모달의 높이
                zIndex:30,
                top:"300px",
                left:innerWidth/2-160
            },
            }}
        >
            <input type="text" placeholder="이름" value={name} onChange={handleNameChange}/>
            <input type="number" placeholder="금액" value={amount} onChange={handleAmountChange}/>
            <button onClick={closeUpdateModal}>저장</button>
            <button onClick={deleteCategory}>삭제</button>
        </Modal>
    <div>
        <button id ="btn1" style={{borderRadius:'100%',width:"10px",height:"10px",backgroundColor:selectedbtn['btn1']?'#7165E3':'#E3E3E3',padding:"0"}} onClick={handleClick}></button>
        <button id ="btn2" style={{borderRadius:'100%',width:"10px",height:"10px",backgroundColor:selectedbtn['btn2']?'#7165E3':'#E3E3E3',padding:"0"}} onClick={handleClick}></button>
        <button id ="btn3" style={{borderRadius:'100%',width:"10px",height:"10px",backgroundColor:selectedbtn['btn3']?'#7165E3':'#E3E3E3',padding:"0"}} onClick={handleClick}></button>
        <div>
        <button onClick={openCategoryModal}>category+</button>
        <button onClick={openModal}>category-</button>
        </div>
    </div>
              {selectedbtn["btn1"] && (
                <div style={{ position: "relative", width: "360px", height: "70vh"}}>
                        <div style={{fontSize:"50px",fontWeight:'bold'}}>우리 계좌</div>
                        <input type="number" placeholder="잔액" style={{width:"130px", height: "30px"}} />
                        <button style={{width:"90px", height: "30px",color:'white',fontSize:'10px',backgroundColor:'#7165E3'}}>송금</button>
                    <div id="canvas1" style={{  position: "absolute", top: "60px", width: "360px", height: "360px"}}>
                        <div style={{ display: "flex",justifyContent: "flex-end",transform:"translate(0,100%)"}}>
                        <img src={safe} style={{width:"50px",height:"50px"}} />
                        </div>
                        <Pinball  value={{parent:"canvas1"}}/>
                    </div>
                </div>
               )}
              {selectedbtn["btn2"] && (
            <div>
                <div style={{fontSize:'10px',fontWeight:"lighter",textAlign:'start',marginLeft:"30px"}}>핀볼 53291021163807</div>
                <div style={{fontSize:'30px',fontWeight:'bold',textAlign:'start',marginLeft:"30px"}}>{state.balance}원</div>
                <button style={{ width: '140px',height:"30px", color: 'white', aspectRatio: 5, fontSize: '15px', backgroundColor: '#4C4499', marginRight: '20px' }}>채우기</button>
                <button style={{ width: '140px',height:"30px", color: 'white', aspectRatio: 5, fontSize: '15px', backgroundColor: '#7165E3' }}>보내기</button>
                <div style={{ position: "relative",width:'360px',height:'70vh',marginTop:"10px" }}>
                <div style={{fontSize:"10px",fontWeight:'bold',textAlign:'start',marginLeft:'30px'}}>전체</div>
                {dummy.reduce((acc: React.ReactNode[], item, i) => {
                    // 첫 번째 아이템이거나 이전 아이템과 날짜가 다를 경우 새로운 구역 생성
                    if (i === 0 || item.date !== dummy[i - 1].date) {
                    acc.push(
                        <div key={`date-${item.date}`} style={{ fontWeight: 'bold',fontSize:'8px',textAlign:'start',marginLeft:'30px' }}>
                        {item.date}
                        </div>
                    );
                    }
                    
                    // 현재 아이템 출력
                    acc.push(
                    <div key={`item-${i}`} style={{ display: 'flex', width: '300px', alignContent: 'center', justifyContent: 'center', marginLeft: '30px',marginBottom:'3px' ,justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex',alignItems: 'center'}}>
                        <img src={cash} style={{ width: "30px",height:"30px",marginRight:'10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ fontSize: '1px', opacity: 0.7 }}>{item.time}</div>
                        </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ textAlign: 'end',fontSize:'15px',color:'#7165E3', fontWeight: 'bold' }}>{item.pay}원</div>
                        <div style={{fontSize:'5px'}}>{state.balance - item.pay}원</div>
                        </div>
                    </div>
                    );
                    
                    return acc;
                }, [])}
                <div id="canvas2" style={{ position: "absolute", top: 0,width: "360px", height: "360px", zIndex: -1, opacity: 0.1 }}>
                    <Pinball value={{parent:"canvas2"}}/>
                </div>
                </div>
            </div>
            )}
            {loading ? "loading......":
            state.value==0 &&selectedbtn["btn3"]?
            <button onClick={openModal} style={{width:"300px",height:"300px"}}>가계부생성</button>:
              selectedbtn["btn3"] && (
                <div style={{ position: "relative", width: "360px", height: "70vh" }}>
                {/* Canvas */}
                <div id="canvas3" style={{ position: "absolute", top: 0, width: "360px", height: "360px"}}>
                <button style={{visibility:"isAccountBook?hidden:visible"}} onClick={deleteAccountBook}>가계부삭제</button>

                <div style={{fontSize:'30px',fontWeight:'bold'}}>가계부</div>


                <div style={{ display: "flex",justifyContent: "flex-end",transform:"translate(0,100%)"}}>
                  
                {state.category.map((v, i) => (
                    <div style={{ width: "30px", height: "30px",marginRight:"5px" }} key={i} onClick={()=>openUpdateModal(v)}>
                    <CircularProgressbar  
                    value={v.percent}
                    text={`${v.percent}%`}
                    styles={buildStyles({
                        pathColor: color[i%4],
                    })}
                    />
                    <div>{v.name}</div>
                </div>
                 ))
                 }

                
                <Pinball value={{parent:"canvas3"}}/>
                </div>

            </div>
         </div>
  
            )}
    </div>
  );
}

export default AccountBook;
