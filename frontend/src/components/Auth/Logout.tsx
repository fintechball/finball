// import { useNavigate } from "react-router-dom";
import { persistor } from "../../store/store";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setLogged } from "../../store/slices/loggedSlice";

function Logout() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    location.reload();
    await persistor.purge();
    dispatch(setLogged(false));
  };

  return (
    <div>
      <Button type="primary" onClick={async () => Logout()}>
        logout
      </Button>
    </div>
  );
}

export default Logout;
