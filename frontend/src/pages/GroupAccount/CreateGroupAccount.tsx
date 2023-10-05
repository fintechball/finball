import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFinBallAccount } from "../../store/slices/finBallAccountSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./CreateGroupAccount.module.scss"
import { Dropdown, Menu, Space, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";


const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";

function CreateGroupAccount() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    const [gameTypeList, setGameTypeList] = useState<string[]>([]);
    const [gameType, setGameType] = useState<string>("");
    const [name, setName] = useState<string>("");


    const gameTypeMenu = (
        <Menu onClick={(e) => setGameType(e.key)}>
          {gameTypeList.map((gameType) => (
            <Menu.Item key={gameType}>{gameType}</Menu.Item>
          ))}
        </Menu>
      );

    const createGroupAccount = () => {
        const headers: Record<string, string> = {
            'Authorization': accessToken,
            'Content-Type': 'application/json'
        }

        axios.post(`${BASE_HTTP_URL}/api/group/account`,
            {
                name: name,
                gameType: gameType
            },
            {
                headers: headers
            })
            .then((res) => {
                console.log("모임 통장 생성 완료" + res.data.data); //accountNo
                navigate("/groupaccount/" + res.data.data); //그룹 계좌로 바로 이동
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getGameTypeList = () => {

        const headers: Record<string, string> = {
            'Authorization': accessToken,
        }

        axios.get(`${BASE_HTTP_URL}/api/gameType`,
            {
                headers: headers
            })
            .then((res) => {
                console.log("게임 타입 list 조회해왔습니다.");

                setGameTypeList(res.data.data.gameTypeList);
                setGameType(gameTypeList[0]);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const finBallAccountCheck = () => {
        const headers: Record<string, string> = {
            'Authorization': accessToken,
        }

        axios.get(`${BASE_HTTP_URL}/api/fin-ball`,
            {
                headers: headers
            })
            .then((res) => {
                dispatch(
                    setFinBallAccount({
                        account: res.data.data.account,
                        company: res.data.data.company,
                    })
                );
            })
            .catch(() => {
                const agree = confirm("핀볼 계좌가 없습니다.\n핀볼 계좌 페이지로 이동하겠습니까?")
                if (agree) {
                    navigate("/create/finball/auth")
                } else {
                    navigate("/");
                }
            })
    }

    useEffect(() => {
        finBallAccountCheck();
        getGameTypeList();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.textbox}>
            <h2>친구들과 함께 하는 <br />모임 통장을 개설해보세요!</h2>

            </div>
            <hr />
            <div className={styles.namebox}>
                <div>모임통장 이름</div>
                <Input
                    placeholder="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className={styles.typebox}>
                <div>이체 타입</div>
                {/* <select id="gameTypeSelectBox" name="gameType" onChange={(event) => setGameType(event.target.value)}>
                    {gameTypeList.map((gameType, index) => (
                        <option key={index} value={gameType}>{gameType}</option>
                    ))}
                </select> */}
                <Dropdown overlay={gameTypeMenu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {gameType || "이체 타입을 선택해 주세요."} <DownOutlined />
        </a>
      </Dropdown>
            </div>

            <button className={styles.button} onClick={createGroupAccount}>
                계좌 생성하기
            </button>
        </div>
    )
}


export default CreateGroupAccount;