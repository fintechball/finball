import { createPortal } from "react-dom";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const Dialog = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow: hidden;
  z-index: 999;
  text-align: center;
`;

interface Props {
  setOnLoginModal: any;
  setIsLoggedIn: any;
}

function LoginModal() {
  const ID = document.getElementById("modal") as HTMLElement;
  const closeHandler = () => {
    // setOnLoginModal(false);
  };

  return (
    <>
      {createPortal(<Backdrop onClick={closeHandler} />, ID)}
      {createPortal(
        <Dialog open>
          asdasdasdasdasd
        </Dialog>,
        ID
      )}
    </>
  );
}

export default LoginModal;
