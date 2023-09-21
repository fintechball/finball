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
import AccountBook from "../pages/Pinball/AccountBook";

import BankInfo from "../pages/Bank/BankInfo";
import CardInfo from "../pages/Bank/CardInfo";

import TestPage from "../pages/Test/TestPage";
import NavPage from "../pages/NavPage/NavPage";

import Chatbot from "../pages/ChatBot/ChatBot";
import Quiz from "../pages/Quiz/Quiz";
import Shop from "../pages/Shop/Shop";

import Transfering from "../pages/Transfer/Transfering";
import ReceivingMoney from "../pages/Transfer/Receive";

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
        <Route path="/certificationnaver" element={<CertificationNaver />} />
        <Route path="/accountbook" element={<AccountBook />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/navpage" element={<NavPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/transfering" element={<Transfering />} />
        <Route path="/receive" element={<ReceivingMoney />} />
        {/* 카드,은행조회 */}
        <Route path="/company/bank" element={<BankInfo />} />
        <Route path="/company/card" element={<CardInfo />} />
      </Routes>
    </>
  );
}

export default Router;
