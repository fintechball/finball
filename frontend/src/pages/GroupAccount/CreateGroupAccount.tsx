import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";

function CreateGroupAccount() {

    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState<string>("");

    const [gameTypeList, setGameTypeList] = useState<string[]>([]);
    const [gameType, setGameType] = useState<string>("");
    const [name, setName] = useState<string>("");

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
                console.log("모임 계좌 생성 완료" + res.data.data); //계좌번호

                navigate("/"); //어디로 이동할지?
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getGameTypeList = (accessToken: string) => {

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

    useEffect(() => {
        const jsonString = localStorage.getItem("persist:root");

        const fetchData = () => {
            if (jsonString) {
                const jsonObject = JSON.parse(jsonString);
                const authData = JSON.parse(jsonObject.auth);
                const accessToken = authData.accessToken;

                if (accessToken) {
                    setAccessToken(accessToken);
                    getGameTypeList(accessToken);
                } else {
                    console.log("accessToken이 존재하지 않습니다.");
                }
            } else {
                console.log("localStorage가 존재하지 않습니다.");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>모임 계좌 생성</h1>
            <hr />
            <div>
                <div>모임통장 이름</div>
                <Input
                    placeholder="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="gameTypeSelectBox">
                    사용목적
                </label>
                <select id="gameTypeSelectBox" name="gameType" onChange={(event) => setGameType(event.target.value)}>
                    {gameTypeList.map((gameType, index) => (
                        <option key={index} value={gameType}>{gameType}</option>
                    ))}
                </select>
            </div>

            <Button type="primary" onClick={createGroupAccount}>
                계좌 생성하기
            </Button>
        </div>
    )
}


export default CreateGroupAccount;