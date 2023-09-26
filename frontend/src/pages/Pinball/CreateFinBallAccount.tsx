import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";
function CreateFinBallAccount() {

    const navigate = useNavigate();
    const [usageList, setUsageList] = useState<string[]>([]);
    const [moneySourceList, setMoneySourceList] = useState<string[]>([]);
    const [accessToken, setAccessToken] = useState<string>("");
    const [usage, setUsage] = useState("");
    const [moneySource, setMoneySource] = useState("");
    const [isTexted, setIsTexted] = useState(false);

    const validationCheck = () => {
        if (usage == "") {
            alert("사용 목적을 선택해주세요")
            return false;
        }
        if (moneySource == "") {
            alert("자금 출처를 선택해주세요")
            return false;
        }

        return true;
    }
    const createFinBallAccount = () => {
        const headers: Record<string, string> = {
            'Authorization': accessToken,
            'Content-Type': 'application/json'
        }

        if (!validationCheck()) {
            return;
        }

        axios.post(`${BASE_HTTP_URL}/api/account/fin-ball`,
            {
                usage: usage,
                moneySource: moneySource,
                isTexted: isTexted
            },
            {
                headers: headers
            })
            .then((res) => {
                alert("계좌 생성이 완료되었습니다.");
                console.log("계좌 생성 완료 " + res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const getUsageAndMoneySource = (accessToken: string) => {

        const headers = {
            'Authorization': accessToken
        }

        axios.get(`${BASE_HTTP_URL}/api/usage-and-moneysource`,
            {
                headers: headers
            })
            .then((res) => {
                console.log("list들 조회해왔습니다.")
                setUsageList(res.data.data.usageList);
                setMoneySourceList(res.data.data.moneySourceList);

                setUsage(usageList[0])
                setMoneySource(moneySourceList[0])
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
                    getUsageAndMoneySource(accessToken);
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
            <h1>계좌생성</h1>
            <hr />
            <p>안전한 거래를 위해 아래의 내용을 확인해주세요.</p>
            <label htmlFor="usageSelectBox">
                사용목적
            </label>
            <select id="usageSelectBox" name="usage" onChange={(event) => setUsage(event.target.value)}>
                {usageList.map((usage, index) => (
                    <option key={index} value={usage}>{usage}</option>
                ))}
            </select>
            <br />
            <label htmlFor="moneySourceSelectBox">
                자금출처
            </label>
            <select id="moneySourceSelectBox" name="moneySource" onChange={(event) => setMoneySource(event.target.value)}>
                {moneySourceList.map((moneySource, index) => (
                    <option key={index} value={moneySource}>{moneySource}</option>
                ))}
            </select>
            <br />
            <label htmlFor="isTexted">해외에 세금을 내고 있나요?</label>
            <input id="isTexted" type="checkbox" name="isTexted" onChange={(event) => setIsTexted(event.target.checked)}></input>

            <Button type="primary" onClick={createFinBallAccount}>
                계좌 생성하기
            </Button>
        </div>
    )
}

export default CreateFinBallAccount;