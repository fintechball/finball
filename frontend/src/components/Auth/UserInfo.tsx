import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userInfoSlice";

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
