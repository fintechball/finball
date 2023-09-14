import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import Counter from "../pages/Test/Counter";

import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import SignUpConfrim from "../pages/Auth/SignUpConfrim"
import SecurityKeypad from "../pages/Auth/SecurityKeypad"

import Pinball from "../pages/Pinball/Pinball";
import Game from "../pages/Pinball/Game";
import Card from "../pages/Pinball/Card";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pinball" element={<Pinball />} />
        <Route path="/card" element={<Card />} />
        <Route path="/game" element={<Game />} />
        <Route path="/signupconfrim" element={<SignUpConfrim />} />
        <Route path="/securitykeypad" element={<SecurityKeypad />} />
      </Routes>
    </>
  );
}

export default Router;
