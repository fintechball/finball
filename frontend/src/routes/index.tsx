import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute.tsx";

import Home from "../pages/Home/Home";

import Counter from "../pages/Test/Counter";

import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import SignUpCerti from "../pages/Auth/SignUpCerti";

import SignUpConfrim from "../pages/Auth/SignUpConfrim";
import SecurityKeypad from "../pages/Auth/SecurityKeypad";
import CertificationNaver from "../pages/Auth/CertificationNaver";

import Pinball from "../pages/Pinball/Pinball";
import Game from "../pages/Pinball/Game";
import Game2 from "../pages/Pinball/Game2";
import Card from "../pages/Pinball/Card";
import AccountBook from "../pages/Pinball/AccountBook";

import BankInfo from "../pages/Bank/BankInfo";
import BankConnect from "../pages/Bank/BankConnect";
import CardInfo from "../pages/Bank/CardInfo";
import CardConnect from "../pages/Bank/CardConnect";
import Agreement from "../pages/Bank/Agreement";

import TestPage from "../pages/Test/TestPage";
import NavPage from "../pages/NavPage/NavPage";

import Chatbot from "../pages/ChatBot/ChatBot";
import Quiz from "../pages/Quiz/Quiz";
import Shop from "../pages/Shop/Shop";
import InventoryAll from "../pages/Shop/InventoryAll";
import Inventory from "../pages/Shop/Inventory";

import Transfering from "../pages/Transfer/Transfering";
import ReceivingMoney from "../pages/Transfer/Receive";
import AccountList from "../pages/Transfer/AccountList";
import AccountDetail from "../pages/Transfer/AccountDetail";
import TransferAccount from "../pages/Transfer/TransferAccount";
import TransferValue from "../pages/Transfer/TransferValue";

import GroupAccount from "../pages/GroupAccount/GroupAccount";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupcerti" element={<SignUpCerti />} />

        <Route path="/pinball" element={<Pinball />} />
        {/* <Route path="/card" element={<Card />} /> */}
        <Route path="/game" element={<Game />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/signupconfrim" element={<SignUpConfrim />} />
        <Route path="/securitykeypad" element={<SecurityKeypad />} />
        <Route path="/certificationnaver" element={<CertificationNaver />} />
        <Route path="/accountbook" element={<AccountBook />} />

        <Route element={<PrivateRoute />}>
          <Route path="/testpage" element={<TestPage />} />

          <Route path="/navpage" element={<NavPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/shop" element={<Shop />} />
        </Route>
        <Route path="/inventoryAll" element={<InventoryAll />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/transfering" element={<Transfering />} />
        <Route path="/receive" element={<ReceivingMoney />} />
        {/* 카드,은행조회 */}
        <Route path="/company/bank" element={<BankInfo />} />
        <Route path="/bank/account" element={<BankConnect />} />
        <Route path="/company/card" element={<CardInfo />} />
        <Route path="/card" element={<CardConnect />} />
        <Route path="/agreement" element={<Agreement />} />
        {/* 계좌 이체 */}
        <Route path="/accountList" element={<AccountList />} />
        <Route path="/accountDetail" element={<AccountDetail />} />
        <Route path="/transferAccount" element={<TransferAccount />} />
        <Route path="/transferValue" element={<TransferValue />} />
        {/* 모임통장 */}
        <Route path="/groupaccount" element={<GroupAccount />} />
      </Routes>
    </>
  );
}

export default Router;
