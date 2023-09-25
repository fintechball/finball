import { useNavigate } from "react-router-dom";
import { persistor } from "../../store/store";
import { Button } from "antd";

function Logout() {
  const navigate = useNavigate();

  const Logout = async () => {
    location.reload();
    await persistor.purge();
    // navigate("/");
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
