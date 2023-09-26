import { Outlet, Navigate } from "react-router-dom";
// import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setLogged } from "../store/slices/loggedSlice";

function PrivateRoute() {
  const dispatch = useDispatch();
  const jsonString = localStorage.getItem("persist:root");

  if (jsonString) {
    const jsonObject: { auth: string } = JSON.parse(jsonString);
    const authData = JSON.parse(jsonObject.auth);
    const accessToken = authData.accessToken;
    if (accessToken) {
      dispatch(setLogged(true));
      return <Outlet />;
    }
    alert("로그인이 필요한 기능입니다.");
    dispatch(setLogged(false));
    return <Navigate to="/login" />;
  }

  alert("로그인이 필요한 기능입니다.");
  dispatch(setLogged(false));
  return <Navigate to="/login" />;
}

export default PrivateRoute;
