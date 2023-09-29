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

    const [name, setName] = useState<string>("");

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

    const askAccept = (name: string) => {

        const accpet = confirm('"' + name + '"모임 통장에 가입하시겠습니까?')

        if (accpet) {
            sendAccpetRequest();
        } else {
            alert("모임 통장 가입을 취소하셨습니다.\n메인 페이지로 이동하겠습니다.");
            navigate("/")
        }
    }

    useEffect(() => {
        //토큰이 있는지 체크
        //없으면 로그인 페이지
        //있으면 uuid로 uuid로 계좌 조회해오기

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
                askAccept(res.data.data.name);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
}

export default AcceptInvite;
