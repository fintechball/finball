import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setLogged } from "../store/slices/loggedSlice";
import { useEffect } from "react";


function PrivateRoute() {
  const dispatch = useDispatch();
  const auth = useSelector((state : RootState) => state.auth);
  const accessToken = auth.accessToken;

  useEffect(() => {
      if (accessToken) {
        dispatch(setLogged(true));
      } else {
        alert("로그인이 필요한 기능입니다.");
        dispatch(setLogged(false));
      }
  }, [dispatch]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;