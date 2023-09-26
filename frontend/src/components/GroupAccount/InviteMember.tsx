import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";

function InviteMember() {

    const inputArr = [
        {
            type: "text",
            id: 1,
            value: ""
        }
    ];

    const name = useSelector((state: RootState) => state.inviteGroupAccount.name);
    const url = useSelector((state: RootState) => state.inviteGroupAccount.url);
    const [accessToken, setAccessToken] = useState<string>("");

    const [inputList, setInputList] = useState(inputArr);

    useEffect(() => {
        const jsonString = localStorage.getItem("persist:root");
        if (jsonString) {
            const jsonObject: { auth: string } = JSON.parse(jsonString);
            const authData = JSON.parse(jsonObject.auth);
            const accessToken = authData.accessToken;
            console.log(accessToken);

            if (accessToken) {
                setAccessToken(accessToken);
            } else {
                console.log("accessToken이 존재하지 않습니다.");
            }
        } else {
            console.log("localStorage가 존재하지 않습니다.");
        }
    }, []);

    const addMember = (i: number) => {

        const phoneNumber = inputList[i].value;
        console.log(phoneNumber);

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            Authorization: accessToken,
        };

        axios
            .post(
                `${BASE_HTTP_URL}/api/group/account/invite`,
                {
                    // 아직 redux 테스트 X
                    // name: name,
                    // url: url,
                    name: "핫식스더킹제로",
                    url: "738e14c7-28a3-4e9d-b43f-eac286510faa",
                    phoneNumber: phoneNumber
                },
                {
                    headers: headers,
                }
            )
            .then((res) => {
                console.log(res.data.message);
                alert(phoneNumber + "에게 초대 링크를 보냈습니다.");
            })
            .catch(() => {
                alert(phoneNumber + "에게 초대 링크를 보내지 못했습니다.");
            });
    }

    const addInput = () => {
        setInputList(list => {
            const lastId = list[list.length - 1].id;
            return [
                ...list,
                {
                    type: "text",
                    id: lastId + 1,
                    value: ""
                }
            ];
        });
    };

    const handleChange = (e) => {
        e.preventDefault();

        const index = e.target.id;
        setInputList(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;

            return newArr;
        });
    };

    return (
        <div>
            {inputList.map((item, i) => {
                return (
                    <div key={i}>
                        <Input
                            onChange={handleChange}
                            value={item.value}
                            id={i}
                            type="text"
                        />
                        <Button type="primary" onClick={() => {
                            // 버튼 클릭 시, 인덱스 전달
                            addMember(i);
                        }}>멤버추가</Button>
                    </div>
                );
            })}
            <br />

            {/* input 박스 추가 버튼 */}
            {inputList.length < 6 && (
                <button onClick={addInput}>+</button>
            )}
        </div>
    );
}

export default InviteMember;
