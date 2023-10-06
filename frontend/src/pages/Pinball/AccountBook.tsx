import { useState, useEffect } from "react";
import AccountFinball from "../Pinball/AccountFinball";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SafeMoney from "./SafeMoney";
import cash from "../../assets/cash.png";
import styles from "./AccountBook.module.css";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { setAccountBooks } from "../../store/slices/accountBookSlice";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import AccountDetailComponent from "../Transfer/AccountDetailComponent";
import { setAccount } from "../../store/slices/accountSlice";
import { RootState } from "../../store/store";
import Toast, { Error, Success, Normal } from "../../components/Toast/Toast";
import trash from "../../assets/trash.png"
import { StarOutlineSharp } from "@mui/icons-material";

const BASE_HTTP_URL = "https://j9E106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";

function AccountBook() {
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
  // const color = ["red", "green", "yellow", "blue"];
  const color = ["#EF4D4D", "#6CB77E", "#004FFF", "#FFC000","#AF8BB7","#D1EFF0"];
  const dispatch = useDispatch();
  const now = new Date();
  const accountbook = useSelector((state: RootState) => state.accountbook);

  // const response=localStorage.getItem("persist:root")
  // const jsonObject: { auth: string } = JSON.parse(response);
  // const authData = JSON.parse(jsonObject.auth);
  // const accessToken = authData.accessToken;
  const auth = useSelector((state) => state.auth);
  const finBallAccount = useSelector((state) => state.finBallAccount);

  const [L, setL] = useState([]);
  const [selectedValue, setSelectedValue] = useState("null");

  function openModal() {
    setIsModalOpen(true);
  }
  // 모달 닫기 함수
  const closeModal = () => {
    if (name == "" || amount == "") {
      Error("카테고리와 금액을 확인해주세요");
    } else {
      setIsModalOpen(false); // 모달 닫기
      createAccountBook();
      setName("");
      setAmount("");
      setisAccountBook(true);
    }
  };

  const closeAddModal = () => {
    setIsCategoryModalOpen(false);
    setName("");
    setAmount("");
  };
  function openCategoryModal() {
    setIsCategoryModalOpen(true);
  }
  const closeCategoryModal = () => {
    if (name == "" || amount == "") {
      Error("카테고리와 금액을 확인해주세요");
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
    console.log(finBallAccount);
    dispatch(
      setAccount({
        account: finBallAccount.account,
        company: finBallAccount.company,
      })
    );
  }, []);

  useEffect(() => {
    findAccountBook();
  }, [accountbook]);
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
      url: `${BASE_HTTP_URL}/api/financial-book`,
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
        //이게 false여야 가계부 생성 => 삭제 버튼 만들어짐
        setisAccountBook(false);
        getHistory();
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };

  const findAccountBook = async () => {
    await axios({
      method: "get",
      url: `${BASE_HTTP_URL}/api/financial-book`,
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
      url: `${BASE_HTTP_URL}/api/financial-book/category`,
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
        // alert("1")
        setState(res.data.data);
        // alert("2")
        getHistory();
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  const deleteCategory = async () => {
    await axios({
      method: "delete",
      url: `${BASE_HTTP_URL}/api/financial-book/category`,
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
        getHistory();
      })
      .catch((err) => {
        if (err.response.status == 400) {
          Error(err.response.data.message);
        }
        console.log("삐빅", err);
      });
  };
  const updateCategory = async () => {
    await axios({
      method: "put",
      url: `${BASE_HTTP_URL}/api/financial-book/category`,
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
        // alert("3")
        console.log(res.data.data);
        setState(res.data.data);
        getHistory();
      })
      .catch((err) => {
        console.log("삐빅", err);
        if (err.response.status == 409) {
          Error("이미 카테고리로 지정이 되어 있습니다.");
        }
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
      url: `${BASE_HTTP_URL}/api/financial-book`,
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        setisAccountBook(false);
        //window.location.reload();
        getHistory();
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  const selectCategory = async () => {
    await axios({
      method: "post",
      url: `${BASE_HTTP_URL}/api/fin-ball/category`,
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
  return (
    <div>
      <Toast />
      {/* 가계부생성모달 => 이거 안쓰이고 있는 것 같아요*/}
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Modal" // 모달의 레이블 설정
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "170px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
            borderRadius: "20px",
            border:"1px solid transparent",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" /* 그림자 효과 추가 */
          },
        }}
      >

        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          style={{width:"280px",marginBottom:"20px"}}
          />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
          style={{width:"280px",marginBottom:"10px"}}
          />
          <div style={{display: "flex",alignItems: "center",justifyContent:"space-between"}}>
        <button style={{width: "45%",height:"40px",backgroundColor: "rgb(21, 122, 255)",color: "white",paddingTop:"5px",paddingBottom: "5px",marginTop:"10px"}} onClick={closeModal}>저장</button>
          </div>
      </Modal>
      {/* 카테고리생성모달 */}
      <Modal
        ariaHideApp={false}
        isOpen={isCategoryModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Custom Modal" // 모달의 레이블 설정
        style={{
          content: {
            width: "300px", // 모달의 너비
            height: "170px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
            borderRadius: "20px",
            border:"1px solid transparent",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" /* 그림자 효과 추가 */
          },
        }}
      >
        <input
          type="text"
          placeholder="카테고리 이름"
          value={name}
          onChange={handleNameChange}
          style={{width:"280px",marginBottom:"20px"}}
        />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
          style={{width:"280px",marginBottom:"10px"}}
        />
        <div style={{display: "flex",alignItems: "center",justifyContent:"space-between"}}>

        <button style={{width: "45%",height:"40px",backgroundColor: "rgb(21, 122, 255)",color: "white",paddingTop:"5px",paddingBottom: "5px",marginTop:"10px"}} onClick={closeCategoryModal}>저장</button>
        <button  style={{width: "45%",height:"40px",backgroundColor: " rgb(170, 143, 195)",color: "white",paddingTop:"5px",paddingBottom: "5px",marginTop:"10px"}} onClick={closeAddModal}>닫기</button>
        </div>
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
            height: "170px", // 모달의 높이
            zIndex: 30,
            position: "fixed",
            top: "50%", // 화면 상단에서 50% 위치로 이동
            left: "50%", // 화면 왼쪽에서 50% 위치로 이동
            transform: "translate(-50%, -50%)", // 수직 및 수평으로 중앙에 위치시킴
            borderRadius: "20px",
            border:"1px solid transparent",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" /* 그림자 효과 추가 */
          },
        }}
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          style={{width:"280px",marginBottom:"20px"}}
        />
        <input
          type="number"
          placeholder="금액"
          value={amount}
          onChange={handleAmountChange}
          style={{width:"280px",marginBottom:"10px"}}
        />
        <div style={{display: "flex",alignItems: "center",justifyContent:"space-between"}}>
        <button style={{width: "45%",height:"40px",backgroundColor: "rgb(21, 122, 255)",color: "white",paddingTop:"5px",paddingBottom: "5px",marginTop:"10px"}} onClick={closeUpdateModal}>저장</button>
        <button style={{width: "45%",height:"40px",backgroundColor: "rgb(248, 63, 63)",color: "white",paddingTop:"5px",paddingBottom: "5px",marginTop:"10px"}} onClick={deleteCategory}>삭제</button>
        </div>
      </Modal>
      {/* 가계부히스토리에서 카테고리 설정 모달 */}
      {/* <Modal
        ariaHideApp={false}
        isOpen={isSelectModalOpen}
        onRequestClose={closeSelectModal}
        contentLabel="카테고리 선택 모달"
        style={{
          content: {
            width: "300px",
            height: "170px",
            zIndex: 30,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            border:"1px solid transparent",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
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
      </Modal> */}
      {/* 송금모달 */}
      {/* <Modal
        ariaHideApp={false}
        isOpen={isSelectModalOpen}
        onRequestClose={closeSelectModal}
        contentLabel="카테고리 선택 모달"
        style={{
          content: {
            width: "300px",
            height: "170px",
            zIndex: 30,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", 
            borderRadius: "20px",
            border:"1px solid transparent",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" 
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
      </Modal> */}

      <div>
        <div className={styles.slide_button}>
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
        {selectedBtn === "btn3" && state.categoryList.length > 0 && (
          <div>
            {/* <button onClick={openModal}>category-</button> */}
          </div>
        )}
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
            <div className={styles.bank_container}>
              <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                우리 계좌
              </div>
              <div className={styles.balance_container}>
                <div className={styles.our_bank_balance}>
                  잔액 : {finBallAccount.account.balance.toLocaleString()} 원
                </div>
              </div>
              <div
                id="canvas1"
                style={{
                  position: "relative",
                  width: "360px",
                  height: "520px",
                }}
              >
                <AccountFinball value={{ parent: "canvas1" }} />
                <div style={{ position: "absolute", top: "0", right: "0" }}>
                  <SafeMoney balance={finBallAccount.account.balance} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div key="btn2">
          <AccountDetailComponent isFinBall={true} />
        </div>
        <div key="btn3">
          {selectedBtn === "btn3" && state.categoryList.length === 0 ? (
            <button
              onClick={openModal}
              style={{width: "90%",height:"40px",backgroundColor: "rgb(21, 122, 255)",color: "white",paddingTop:"5px",paddingBottom: "5px",marginTop:"10px"}}
            >
              + 가계부 생성하기
            </button>
          ) : (
            <div key="btn3">
              <div
                style={{
                  position: "relative",
                  width: "360px",
                  height:"610px"
                }}
              >

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginTop: "25px",
                  }}
                >
                  가계부
                </div>
                <div className={styles.buttonbox}>
                <button
                  className={styles.deleteAccountBookbtn}
                  style={{ visibility: isAccountBook ? "hidden" : "visible" }}
                  onClick={deleteAccountBook}
                >
                  <img src={trash} style={{width:"15px"}}/>
                </button>
                <button className={styles.addCategorybtn} onClick={openCategoryModal}>+ 카테고리 추가</button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop:"60px",
                  }}
                >
                  {/* ==== */}
                  {Array.isArray(state.categoryList) &&
                    state.categoryList.map((v, i) => (
                      <div
                        style={{
                          width: "75px",
                          height: "75px",
                          marginRight: "10px",
                          zIndex:3,
                        }}
                        key={i}
                        onClick={() => openUpdateModal(v)}
                      >
                        <CircularProgressbar
                          value={v.percent}
                          text={`${v.percent}%`}
                          strokeWidth="12"
                          styles={buildStyles({ pathColor: color[i % 6],textColor:"black"})}
                        />
                        <div style={{fontWeight:600}}>{v.name}</div>
                      </div>
                    ))}
                  <div
                    id="canvas3"
                    style={{
                      position: "absolute",
                      top: "90px",
                      width: "360px",
                      height: "520px",
                    }}
                  >
                    <AccountFinball value={{ parent: "canvas3" }} />
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
