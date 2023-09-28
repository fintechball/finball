import { useState, useEffect } from "react";
import Pinball from "../Pinball/Pinball";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import safe from "../../assets/safe.png";
import cash from "../../assets/cash.png";
import styles from "./AccountBook.module.css";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { setAccountBooks } from "../../store/slices/accountBookSlice";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import AccountDetailComponent from "../Transfer/AccountDetailComponent";
const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";

function AccountBook() {
  const [account, setAccount] = useState<any>({});
  const [tradeHistoryList, setTradeHistoryList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [state, setState] = useState<any>({});
  const [name, setName] = useState<any>(""); // 이름을 저장하는 state
  const [amount, setAmount] = useState<any>(""); // 금액을 저장하는 state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccountBook, setisAccountBook] = useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [chooseCategoryid, setChooseCategoryid] = useState<any>([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);
  const [selectTradeHistoryId, setSelectTradeHistoryId] = useState<any>([]);
  const [finball, setFinball] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [ball, setBall] = useState<number>(-1);
  const color = ["red", "green", "yellow", "blue"];
  const dispatch = useDispatch();
  const now = new Date();
  // const response=localStorage.getItem("persist:root")
  // const jsonObject: { auth: string } = JSON.parse(response);
  // const authData = JSON.parse(jsonObject.auth);
  // const accessToken = authData.accessToken;
  const auth = useSelector((state) => state.auth);
  const [L, setL] = useState([]);
  const [selectedValue, setSelectedValue] = useState("null");

  function openModal() {
    setIsModalOpen(true);
  }
  // 모달 닫기 함수
  const closeModal = () => {
    if (name == "" || amount == "") {
      alert("카테고리와 금액을 확인해주세요");
    } else {
      setIsModalOpen(false); // 모달 닫기
      createAccountBook();
      setName("");
      setAmount("");
      setisAccountBook(true);
    }
  };
  function openCategoryModal() {
    setIsCategoryModalOpen(true);
  }
  const closeCategoryModal = () => {
    if (name == "" || amount == "") {
      alert("카테고리와 금액을 확인해주세요");
    } else {
      setIsCategoryModalOpen(false); // 모달 닫기
      createCategory();
      setName("");
      setAmount("");
    }
  };
  function openUpdateModal(value) {
    setName(value.name);
    setAmount(value.value);
    setChooseCategoryid(value.id);
    setIsUpdateModalOpen(true);
  }
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false); // 모달 닫기
    updateCategory();
    setName("");
    setAmount("");
    setChooseCategoryid(-1);
  };
  function openSelectModal(value, k) {
    setIsSelectModalOpen(true);
    setSelectTradeHistoryId(k);
    setL(value.categoryList);
  }
  const closeSelectModal = (e) => {
    setIsSelectModalOpen(false); // 모달 닫기
    selectCategory();
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // 이름 입력 값 업데이트
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value)); // 금액 입력 값 업데이트
  };
  const [selectedBtn, setSelectedBtn] = useState("btn1");
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    axios({
      method: "get",
      url: `${BASE_HTTP_URL}/api/fin-ball/history`,
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setFinball(res.data.data);
        dispatch(
          setAccountBooks({
            account: res.data.data.account,
            tradeHistoryList: res.data.data.tradeHistoryList,
            categoryList: res.data.data.categoryList,
          })
        );
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
    findAccountBook();
  };
  useEffect(() => {
    // if (Object.keys(state).length > 0) {
    if (state.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state]);
  const createAccountBook = async () => {
    await axios({
      method: "post",
      url: `https://j9e106.p.ssafy.io/api/financial-book`,
      headers: {
        Authorization: auth.accessToken,
      },
      data: {
        categoryList: [
          {
            name: name,
            value: amount,
          },
        ],
        refreshDate: Number(`${now.getDate()}`),
      },
    })
      .then((res) => {
        setState(res.data.data);
        window.location.reload();
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
        Authorization: auth.accessToken,
      },
    })
      .then((res) => {
        setState(res.data.data);

        setBall(Math.round(res.data.data.balance / 1000));
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
        Authorization: auth.accessToken,
      },
      data: {
        categoryList: [
          {
            name: name,
            value: amount,
          },
        ],
      },
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
        Authorization: auth.accessToken,
      },
      data: {
        categoryList: [chooseCategoryid],
      },
    })
      .then((res) => {
        setState(res.data.data);
        setIsUpdateModalOpen(false);
        setName("");
        setAmount("");
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
        Authorization: auth.accessToken,
      },
      data: {
        id: chooseCategoryid,
        name: name,
        value: amount,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setState(res.data.data);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  const handleButtonClick = (btn) => {
    setSelectedBtn(btn);
  };
  const handleCarouselChange = (selectedIndex) => {
    // selectedIndex는 Carousel의 현재 선택된 슬라이드 인덱스입니다.
    // 이 인덱스를 기반으로 selectedBtn 값을 변경합니다.
    if (selectedIndex === 0) {
      setSelectedBtn("btn1");
    } else if (selectedIndex === 1) {
      setSelectedBtn("btn2");
    } else if (selectedIndex === 2) {
      setSelectedBtn("btn3");
    }
  };
  const deleteAccountBook = async () => {
    await axios({
      method: "delete",
      url: `https://j9e106.p.ssafy.io/api/financial-book`,
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        setisAccountBook(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  const selectCategory = async () => {
    await axios({
      method: "post",
      url: `https://j9e106.p.ssafy.io/api/fin-ball/category`,
      headers: {
        Authorization: auth.accessToken,
      },
      data: {
        tradeHistoryId: selectTradeHistoryId,
        categoryName: selectedValue,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  const renderPinball = () => {
    if (selectedBtn === "btn1") {
      return <Pinball value={{ parent: "canvas1" }} />;
    } else if (selectedBtn === "btn2") {
      return <Pinball value={{ parent: "canvas2" }} />;
    } else {
      return <Pinball value={{ parent: "canvas3" }} />;
    }
  };
  return (
    <div>
      {/* 가계부생성모달 */}
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Modal" // 모달의 레이블 설정
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "160px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
          },
        }}
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
        />
        <button onClick={closeModal}>저장</button>
      </Modal>
      {/* 카테고리생성모달 */}
      <Modal
        ariaHideApp={false}
        isOpen={isCategoryModalOpen}
        onRequestClose={closeCategoryModal}
        contentLabel="Custom Modal" // 모달의 레이블 설정
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "160px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
          },
        }}
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
        />
        <button onClick={closeCategoryModal}>저장</button>
      </Modal>
      {/* 카테고리 수정 및 삭제모달 */}
      <Modal
        ariaHideApp={false}
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Custom Modal" // 모달의 레이블 설정
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "160px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
          },
        }}
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
        />
        <button onClick={closeUpdateModal}>저장</button>
        <button onClick={deleteCategory}>삭제</button>
      </Modal>
      {/* 가계부히스토리에서 카테고리 설정 모달 */}
      <Modal
        ariaHideApp={false}
        isOpen={isSelectModalOpen}
        onRequestClose={closeSelectModal}
        contentLabel="카테고리 선택 모달"
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "160px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
          },
        }}
      >
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="null">고르시오</option>
          {L.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <button onClick={closeSelectModal}>저장</button>
      </Modal>
      {/* 송금모달 */}
      <Modal
        ariaHideApp={false}
        isOpen={isSelectModalOpen}
        onRequestClose={closeSelectModal}
        contentLabel="카테고리 선택 모달"
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "160px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
          },
        }}
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          placeholder="계좌번호"
          value={amount}
          onChange={handleAmountChange}
        />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
        />
        <button onClick={closeSelectModal}>저장</button>
      </Modal>

      <div>
        <div>
          <button
            style={{
              borderRadius: "100%",
              width: "10px",
              height: "10px",
              backgroundColor: selectedBtn == "btn1" ? "#7165E3" : "#E3E3E3",
              padding: "0",
              marginRight: "10px",
            }}
            onClick={() => handleButtonClick("btn1")}
          ></button>
          <button
            style={{
              borderRadius: "100%",
              width: "10px",
              height: "10px",
              backgroundColor: selectedBtn == "btn2" ? "#7165E3" : "#E3E3E3",
              padding: "0",
              marginRight: "10px",
            }}
            onClick={() => handleButtonClick("btn2")}
          ></button>
          <button
            style={{
              borderRadius: "100%",
              width: "10px",
              height: "10px",
              backgroundColor: selectedBtn == "btn3" ? "#7165E3" : "#E3E3E3",
              padding: "0",
            }}
            onClick={() => handleButtonClick("btn3")}
          ></button>
        </div>
        <div>
          <button onClick={openCategoryModal}>category+</button>
          <button onClick={openModal}>category-</button>
        </div>
      </div>
      <Carousel
        selectedItem={
          selectedBtn === "btn1" ? 0 : selectedBtn === "btn2" ? 1 : 2
        }
        showThumbs={false}
        infiniteLoop={false}
        showIndicators={false}
        swipeable={true}
        showArrows={false}
        showStatus={false}
        onChange={handleCarouselChange}
      >
        <div key="btn1">
          {selectedBtn === "btn1" && (
            <div>
              <div style={{ fontSize: "50px", fontWeight: "bold" }}>
                우리 계좌
              </div>
              <input
                type="number"
                placeholder="잔액"
                style={{ width: "130px", height: "30px" }}
              />
              <button
                style={{
                  width: "90px",
                  height: "30px",
                  color: "white",
                  fontSize: "10px",
                  backgroundColor: "#7165E3",
                }}
              >
                송금
              </button>
              <div
                id="canvas1"
                style={{
                  position: "relative",
                  width: "360px",
                  height: "360px",
                }}
              >
                <Pinball value={{ parent: "canvas1" }} />
                <div style={{ position: "absolute", top: "0", right: "0" }}>
                  <img src={safe} style={{ width: "50px", height: "50px" }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div key="btn2">
          {/* {selectedBtn === "btn2" && (
            <div>
                <div style={{fontSize:'10px',fontWeight:"lighter",textAlign:'start',marginLeft:"30px"}}>핀볼 {finball.account.no}</div>
                <div style={{fontSize:'30px',fontWeight:'bold',textAlign:'start',marginLeft:"30px"}}>{finball.account.balance}원</div>
                <button style={{ width: '140px',height:"30px", color: 'white', aspectRatio: 5, fontSize: '15px', backgroundColor: '#4C4499', marginRight: '20px' }}>채우기</button>
                <button style={{ width: '140px',height:"30px", color: 'white', aspectRatio: 5, fontSize: '15px', backgroundColor: '#7165E3' }}>보내기</button>
                <div style={{ position: "relative",width:'360px',height:'70vh',marginTop:"10px" }}>
                <div style={{fontSize:"10px",fontWeight:'bold',textAlign:'start',marginLeft:'30px'}}>전체</div>
                {finball.tradeHistoryList.reduce((acc: React.ReactNode[], item, i) => {
                    // 첫 번째 아이템이거나 이전 아이템과 날짜가 다를 경우 새로운 구역 생성
                    if (i === 0 || item.date !== finball.tradeHistoryList[i - 1].date) {
                    acc.push(
                        <div key={`date-${item.date}`} style={{ fontWeight: 'bold',fontSize:'8px',textAlign:'start',marginLeft:'30px' }}>
                        {item.date}
                        </div>
                    );
                    }
                    
                    // 현재 아이템 출력
                    acc.push(
                    <div onClick={()=>{item.type=="출금"?openSelectModal(finball,item.id):""}} key={item.id} style={{ display: 'flex', width: '300px', alignContent: 'center', justifyContent: 'center', marginLeft: '30px',marginBottom:'3px' ,justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex',alignItems: 'center'}}>
                        <img src={cash} style={{ width: "30px",height:"30px",marginRight:'10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{item.opposite.userName}</div>
                        <div style={{ fontSize: '1px', opacity: 0.7 }}>{item.time.slice(0,5)}</div>
                        </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ textAlign: 'end',fontSize:'15px',color:'#7165E3', fontWeight: 'bold' }}>{item.value}원</div>
                        <div style={{fontSize:'5px'}}>{item.balance}원</div>
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
            )} */}
          <AccountDetailComponent isFinBall={true} />
        </div>
        <div key="btn3">
          { selectedBtn === "btn3" && state.categoryList.length === 0 ? (
            <button
              onClick={openModal}
              style={{ width: "300px", height: "300px" }}
            >
              가계부생성
            </button>
          ) : (
            <div key="btn3">
              <div
                style={{ position: "relative", width: "360px", height: "70vh" }}
              >
                <button
                  style={{ visibility: isAccountBook ? "hidden" : "visible" }}
                  onClick={deleteAccountBook}
                >
                  가계부삭제
                </button>
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                  가계부
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    transform: "translate(0,100%)",
                  }}
                >
                  {Array.isArray(state.categoryList) &&
                    state.categoryList.map((v, i) => (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "5px",
                        }}
                        key={i}
                        onClick={() => openUpdateModal(v)}
                      >
                        <CircularProgressbar
                          value={v.percent}
                          text={`${v.percent}%`}
                          styles={buildStyles({ pathColor: color[i % 4] })}
                        />
                        <div>{v.name}</div>
                      </div>
                    ))}
                  <div
                    id="canvas3"
                    style={{
                      position: "absolute",
                      top: 0,
                      width: "360px",
                      height: "360px",
                      zIndex: -1,
                    }}
                  >
                    <Pinball value={{ parent: "canvas3" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Carousel>
    </div>
  );
}

export default AccountBook;
