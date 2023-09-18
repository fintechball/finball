import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import Counter from "../pages/Test/Counter";

import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import SignUpConfrim from "../pages/Auth/SignUpConfrim";
import SecurityKeypad from "../pages/Auth/SecurityKeypad";
import CertificationNaver from "../pages/Auth/CertificationNaver";

import Pinball from "../pages/Pinball/Pinball";
import Game from "../pages/Pinball/Game";
import Card from "../pages/Pinball/Card";
import ControlledCarousel from "../pages/Pinball/AccountBook";

import Accounts from "../pages/Account/Accounts";

import TestPage from "../pages/Test/TestPage";

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
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/certificationnaver" element={<CertificationNaver />} />
        <Route path="/test" element={<ControlledCarousel />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default Router;
