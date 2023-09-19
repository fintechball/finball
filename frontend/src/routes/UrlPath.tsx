import { useEffect } from "react";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCurrentUrl } from "../store/slices/routerSlice";

function UrlPath() {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    dispatch(setCurrentUrl(pathName));
    console.log(pathName);
  }, []);
  return <></>;
}

export default UrlPath;
