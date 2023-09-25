import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userInfoSlice";

// 로컬스토리지에 저장된 정보를 가져와서 userInfoSlice 에 저장
function UserInfo() {
  const dispatch = useDispatch();

  const jsonString = localStorage.getItem("persist:root");

  if (jsonString) {
    const jsonObject: { auth: string } = JSON.parse(jsonString);
    const authData = JSON.parse(jsonObject.auth);

    dispatch(
      setUser({
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        name: authData.name,
        userId: authData.userId,
      })
    );
  }
  return <></>;
}

export default UserInfo;
