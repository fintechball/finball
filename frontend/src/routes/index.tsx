import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import Counter from "../pages/Test/Counter";

import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

import Pinball from "../pages/Pinball/Pinball";
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
      </Routes>
    </>
  );
}

export default Router;
