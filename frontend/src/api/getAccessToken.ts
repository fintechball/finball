
const jsonString = localStorage.getItem("persist:root");

const getAccessToken = () => {
    if (jsonString) {
        const jsonObject: { auth: string } = JSON.parse(jsonString);
        const authData = JSON.parse(jsonObject.auth);
        const accessToken = authData.accessToken;
        if (accessToken) {
            return accessToken;
        } else {
            console.log("accessToken이 존재하지 않습니다.");
        }
    } else {
        console.log("localStorage가 존재하지 않습니다.");
    }
}

export {getAccessToken};
