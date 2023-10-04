import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const BASE_HTTP_URL = "https://j9e106.p.ssafy.io";
//const BASE_HTTP_URL = "http://localhost:8080";

function AcceptInvite() {

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const navigate = useNavigate();

    const uuid = useParams().uuid;

    //모임통장이름
    const [name, setName] = useState<string>("defaultName");
    //통장 계좌번호
    const [accountNo, setAccountNo] = useState<string>("defaultNo");
    //주인장 이름
    const [hostName, setHostName] = useState<string>("defaultHostName");
    //주인장 프로필 이미지
    const [hostImage, setHostImage] = useState<string>("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDECw_KuoLTTqy3D413flv_CUYn9p0Wjl2Og&usqp=CAU");

    const sendAccpetRequest = () => {

        const headers: Record<string, string> = {
            'Authorization': accessToken,
        }

        axios.post(`${BASE_HTTP_URL}/api/group/account/invite/agree`,
            {
                url: uuid
            },
            {
                headers: headers
            })
            .then((res) => {

                alert(res.data.data.ownerName + "님의 " + res.data.data.accountName + "통장에 가입하셨습니다.");
                navigate(`/groupaccount/${res.data.data.accountNo}`)
            })
            .catch((err) => {
                if (err.response.status == 409) {
                    alert("이미 가입된 통장입니다.");
                } else {
                    alert("가입에 실패하였습니다.");
                }

                navigate("/");
            })
    }

    const accept = () => {
        sendAccpetRequest();
    }

    const reject = () => {
        alert("모임 통장 가입을 취소하셨습니다.\n메인 페이지로 이동하겠습니다.");
        navigate("/");
    }

    useEffect(() => {
        const headers: Record<string, string> = {
            'Authorization': accessToken,
        }

        axios.get(`${BASE_HTTP_URL}/api/account/${uuid}`,
            {
                headers: headers
            })
            .then((res) => {
                console.log("그룹 계좌를 조회했습니다.");
                setName(res.data.data.name);
                setAccountNo(res.data.data.accountNo);
                console.log("test")
                console.log(res.data.data);
                //호스트 url
                for (const idx in res.data.data.member) {
                    if (res.data.data.member[idx].type == "HOST") {
                        setHostImage(res.data.data.member[idx].profileImage);
                        setHostName(res.data.data.member[idx].name);
                        break;
                    }
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div>
                <h2>{name}에서 초대가 도착했어요.</h2>
                <h4>계좌번호 : {accountNo}</h4>
                <img src={hostImage} /> <span>{hostName}</span>
                <div>
                    <button onClick={() => { accept() }}>수락</button>
                    <button onClick={() => { reject() }}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default AcceptInvite;
